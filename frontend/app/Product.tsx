"use client";
import { useState, useEffect } from "react";

type ProductType = {
  _id: string;
  name: string;
  price: string;
  image?: string;
};

export const Product = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<ProductType>>({});

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setProducts(data.data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (field: keyof ProductType, value: string) =>
    setEditValues({ ...editValues, [field]: value });

  const startEdit = (index: number) => {
    const product = products[index];
    setEditingIndex(index);
    setEditValues({ ...product });
  };

  const cancelEdit = () => setEditingIndex(null);

  const saveEdit = async (index: number) => {
  const product = products[index];
  if (!editValues) return alert("No changes made.");

  // Only include fields that are different from the original product
  const updates: Partial<ProductType> = {};
  (["name", "price", "image"] as const).forEach((key) => {
    if (editValues[key] !== undefined && editValues[key] !== product[key]) {
      updates[key] = editValues[key];
    }
  });

  if (Object.keys(updates).length === 0) return alert("No changes made.");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${product._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates), // only send changed fields
    });
    if (!res.ok) throw new Error("Failed to update product");
    const updated = await res.json();

    // Update locally
    const updatedProducts = [...products];
    updatedProducts[index] = { ...product, ...updates }; // merge updated fields
    setProducts(updatedProducts);
    setEditingIndex(null);
  } catch (err) {
    console.error(err);
    alert("Error updating product");
  }
};


  const deleteProduct = async (index: number) => {
    const product = products[index];
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${product._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((_, i) => i !== index));
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  if (loading) return <p className="mt-5">Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="w-[90%] mx-auto my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No products added yet.</p>
        ) : (
          products.map((product, index) => (
            <div key={product?._id} className="border border-gray-400 rounded-md shadow-sm bg-gray-100 flex flex-col">
              {editingIndex === index ? (
                <div className="p-4 flex flex-col gap-3">
                  {(["name", "price", "image"] as const).map((field) => (
                    <input
                      key={field}
                      value={editValues[field] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="border p-2 rounded"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  ))}
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => saveEdit(index)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {product?.image && (
                    <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-t-md" />
                  )}
                  <div className="flex items-start flex-col p-3">
                    <div className="text-lg font-semibold">{product?.name}</div>
                    <div className="text-md mb-2">${product?.price}</div>
                    <div className="flex justify-between w-full">
                      <button
                        onClick={() => startEdit(index)}
                        className="border border-blue-600 bg-blue-300 rounded-sm px-2 hover:bg-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(index)}
                        className="border border-red-600 bg-red-300 rounded-sm px-2 hover:bg-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
