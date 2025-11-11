
import { useState } from 'react';

export const Products = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");


  // Array to store all submitted products
  const [products, setProducts] = useState<
    { name: string; price: string; imageLink: string }[]
  >([]);

  
    // Create a new product object
    const newProduct = { name, price, imageLink };

    // Append it to existing products
    setProducts((prevProducts) => [...prevProducts, newProduct]);

    // Console log like before
    console.log("Product Added:", newProduct);

    alert(`Product Created!\nName: ${name}\nPrice: ${price}\nImage: ${imageLink}`);
  return (
    <div>
      {/* product container */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-start w-[90%] mx-auto">
        {products.map((product, index) => (
          <div
          key={index}
          className="border border-red-600 rounded-md flex flex-col  shadow-sm"
          >

            {product.imageLink && (
              <img
              src={product.imageLink}
              alt={product.name}
              className="w-full min-w-[200px] aspect-3/2"
              />
            )}
            
            <div className='flex flex-col pl-2 w-full items-start'>

            <div className="text-lg font-semibold ">{product.name}</div>
            <div className="text-md ">${product.price}</div>

            <div className='flex justify-between pl-0 px-5 py-3 w-full'>
              <button className='border border-blue-600 bg-blue-300 rounded-sm px-2'>edit</button>
              <button className='border border-red-600 bg-red-300 rounded-sm px-2'>delete</button>
            
            </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

