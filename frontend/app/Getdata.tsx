"use client";
import React, { useEffect, useState } from "react";

export const Getdata = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);


        const data = await res.json();
        setProducts(data.data); // <-- use the array inside your backend response


        // If backend returns { products: [...] }
        // setProducts(data.products);
        setProducts(Array.isArray(data) ? data : []); 

        setError(null);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {/* <h1>Products</h1> */}
      <ul>
        {products.length === 0 ? (
          <li>No products found.</li>
        ) : (
          products.map((product, index) => (
            <li key={index}>
              {product.name} - ${product.price}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
