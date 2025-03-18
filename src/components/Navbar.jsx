import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 py-4 bg-gray-800 border-b border-neutral-500 text-white px-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product-logo</h1>
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/compare-products">Compare-Product</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
