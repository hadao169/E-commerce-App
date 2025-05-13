"use client";
import React, { useState } from "react";

const Searchbar = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle actual search logic here
    console.log("Search for:", query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Search for your items"
      />
      <button
        type="submit"
        className="absolute top-1.25 right-2 flex items-center rounded bg-orange-500 py-1 px-3 text-sm text-white shadow-sm hover:opacity-70 transition-all cursor-pointer">
        Search
      </button>
    </form>
  );
};

export default Searchbar;
