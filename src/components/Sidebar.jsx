import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="fixed left-0 top-16 w-60 bg-gray-200 p-4 text-md font-semibold flex flex-col space-y-4 border-r border-gray-800 h-screen">
      {location.pathname === "/compare-products" ? (
        <>
          <h2 className="text-xl text-red-600">Compare Products</h2>
          <ul className="flex flex-col space-y-3">
            <li>
              <Link>Title</Link>
            </li>
            <li>
              <Link>Brand</Link>
            </li>
            <li>
              <Link>Category</Link>
            </li>
            <li>
              <Link>Price</Link>
            </li>
            <li>
              <Link>Discount</Link>
            </li>
            <li>
              <Link>Image</Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h2 className="text-xl text-red-600">Product Details</h2>
          <ul className="flex flex-col space-y-3">
            <li>
              <Link>Title</Link>
            </li>
            <li>
              <Link>Description</Link>
            </li>
            <li>
              <Link>Price</Link>
            </li>
            <li>
              <Link>Discount Percentage</Link>
            </li>
            <li>
              <Link>Brand</Link>
            </li>
            <li>
              <Link>Category</Link>
            </li>
            <li>
              <Link>Image(thumbnail)</Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};
