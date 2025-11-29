import Link from "next/link";
import { Product } from "../Product";


export default function page() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Welcome to the Product Store Admin</h1>

      <Link
        href="/createpage"
        className="w-fit block mx-auto my-6 hover:underline"
      >
        Create Product
      </Link>
      <Product />
    </div>
  );
}
