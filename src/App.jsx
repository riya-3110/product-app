import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProductDetails } from "./pages/ProductDetails";
import { Sidebar } from "./components/Sidebar";
import { CompareProducts } from "./pages/CompareProducts";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-5 ml-60 h-[calc(100vh-4rem)] overflow-auto">
          <Routes>
            <Route path="/" element={<ProductDetails />} />
            <Route path="/compare-products" element={<CompareProducts />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
