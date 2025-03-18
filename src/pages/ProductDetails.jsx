import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = "https://dummyjson.com/products";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API);
        const formattedData = response.data.products.map((product) => ({
          key: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          brand: product.brand,
          category: product.category,
          image:
            product.images.length > 0 ? product.images[0] : product.thumbnail,
        }));
        setProducts(formattedData);
      } catch (error) {
        setError("Failed to fetch Products !");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCompare = (product) => {
    let compareList = JSON.parse(localStorage.getItem("compareProducts")) || [];
    if (!compareList.some((p) => p.key === product.key)) {
      compareList.push(product);
    }
    localStorage.setItem("compareProducts", JSON.stringify(compareList));
    navigate("/compare-products");
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Image(thumbnail)",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Product" className="w-16 h-16" />
      ),
    },
    {
      title: "Compare",
      dataIndex: "compare",
      key: "compare",
      render: (_, record) => (
        <button
          type="button"
          onClick={() => handleCompare(record)}
          className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
        >
          Compare Product
        </button>
      ),
    },
  ];

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-5 text-red-500 font-semibold">
        Product Details
      </h1>

      {loading && <p className="text-center text-xl">Loading...</p>}
      {error && <p className="text-center text-xl text-red-500">{error}</p>}

      {!loading && !error && (
        <Table
          dataSource={products}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};
