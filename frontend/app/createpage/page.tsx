"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProductContext } from "../context/Productcontext";



export default function CreatePage() {
  const { addProduct } = useProductContext();
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!name || !price || !image) {
    alert("Please fill all fields");
    return;
  }

  const newProduct = { name, price, image };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
  const errorText = await res.text();
  throw new Error(`Failed to create product: ${res.status} ${errorText}`);
}

    const savedProduct = await res.json();
    
    alert(`✅ Product Created!\nName: ${savedProduct.data.name}\nPrice: ${savedProduct.data.price}`);
    
    // Optionally, add to context
    addProduct(savedProduct);

    setName("");
    setPrice("");
    setImage("");

    // router.push("/api/products");
  } catch (err) {
    console.error(err);
    alert("❌ Error creating product");
  }
};


  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold">Create Product</h1>

      <form
        onSubmit={handleSubmit}
        className="border bg-gray-100 rounded-lg p-4 mt-6 mx-auto flex flex-col gap-4 w-[80%] max-w-md"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image Link"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      <Link href="/" className="block mt-6 w-fit mx-auto hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
