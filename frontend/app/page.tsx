"use client";

import { useState } from "react";
import Link from "next/link";

export default function adminlogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // TypeScript-safe form submit event
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent form reload

    if (username === "Admin" && password === "Password"){
      window.open("https://product-store-zgez.onrender.com/", "_blank");
    } 
    else if (username === "admin" && password === "password"){
      window.open("https://product-store-zgez.onrender.com/", "_blank");

    }
    else if (username === "Name" && password === "Password"){
      window.open("https://product-store-zgez.onrender.com/", "_blank");
    } 
    else if (username === "name" && password === "password"){
      window.open("https://product-store-zgez.onrender.com/", "_blank");
    } 
    else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col max-w-[1200px] w-full h-screen mx-auto">
      <div className="flex flex-col gap-4 pt-25 pb-15">
        <div className="pl-[25%]">
          <Link href="/" className="hover:underline rounded p-2 w-fit">
            Back
          </Link>
        </div>

        <div className="text-center text-2xl md:text-3xl font-semibold">
          Welcome Admin
        </div>
      </div>

      <form
        onSubmit={handleLogin} // attach form submit handler
        className="flex flex-col items-center w-xs md:w-lg mx-auto justify-center gap-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="border w-full p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="relative w-full max-w-xs md:max-w-lg">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border p-2 rounded w-full pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded hover:cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}
