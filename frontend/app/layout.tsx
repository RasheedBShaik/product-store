// app/layout.tsx
import "./globals.css";
import { ProductProvider } from "./context/Productcontext";

export const metadata = {
  title: "Product Store",
  description: "Create and manage products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProductProvider>{children}</ProductProvider>
      </body>
    </html>
  );
}
