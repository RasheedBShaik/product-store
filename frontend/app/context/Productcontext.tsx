"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Product = { name: string; price: string; image: string };

type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (index: number) => void;
  editProduct: (index: number, updated: Product) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const deleteProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const editProduct = (index: number, updated: Product) => {
    setProducts((prev) =>
      prev.map((p, i) => (i === index ? updated : p))
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, editProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProductContext must be used within ProductProvider");
  return context;
};
