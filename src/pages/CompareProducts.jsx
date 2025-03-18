import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";

export const CompareProducts = () => {
  const [compareProducts, setCompareProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setAllProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleOpenModal = () => {
    fetchProducts();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("compareProducts")) || [];
    setCompareProducts(storedProducts.slice(0, 4));
  }, []);

  const handleRemove = (id) => {
    const updatedProducts = compareProducts.filter(
      (product) => product.id !== id
    );
    setCompareProducts(updatedProducts);
    localStorage.setItem("compareProducts", JSON.stringify(updatedProducts));
  };

  const handleCompare = (product) => {
    if (compareProducts.length >= 4) {
      alert("You can only compare up to 4 products.");
      return;
    }

    if (compareProducts.some((p) => p.id === product.id)) {
      alert("This product is already in the comparison list.");
      return;
    }

    const updatedCompareProducts = [...compareProducts, product];
    setCompareProducts(updatedCompareProducts);
    localStorage.setItem(
      "compareProducts",
      JSON.stringify(updatedCompareProducts)
    );
    setIsModalOpen(false);
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
      dataIndex: "images",
      key: "images",
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
        Compare Products
      </h1>

      <button
        className="mb-5 bg-green-600 text-white px-4 py-2 rounded-md"
        onClick={handleOpenModal}
      >
        Add More
      </button>

      {compareProducts.length === 0 ? (
        <p className="text-center text-xl">
          No products selected for comparison.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Feature</th>
                {compareProducts.map((product) => (
                  <th key={product.id} className="p-3 border text-center">
                    {product.title}
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                    >
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border">Brand</td>
                {compareProducts.map((product) => (
                  <td key={product.id} className="p-3 border text-center">
                    {product.brand}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border">Category</td>
                {compareProducts.map((product) => (
                  <td key={product.id} className="p-3 border text-center">
                    {product.category}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border">Price</td>
                {compareProducts.map((product) => (
                  <td key={product.id} className="p-3 border text-center">
                    ${product.price}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border">Discount</td>
                {compareProducts.map((product) => (
                  <td key={product.id} className="p-3 border text-center">
                    {product.discountPercentage}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border">Image</td>
                {compareProducts.map((product) => (
                  <td key={product.id} className="p-3 border text-center">
                    <img
                      src={product.image}
                      alt="Product"
                      className="w-16 h-16"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <Modal
        title="Add More Products"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={800}
      >
        <Table
          dataSource={allProducts}
          columns={columns}
          pagination={{ pageSize: 4 }}
          rowKey="id"
        />
      </Modal>
    </div>
  );
};
