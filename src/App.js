import "./App.css";
import Home from "./Component/Home";
import Products from "./Component/Products";
import Product from "./Component/product.jsx";
import Cart from "./Component/Cart";
import Checkout from "./Component/Checkout";
import About from "./Component/About";
import Contact from "./Component/Contact";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter here
// import LoginSignup from "./Pages/AuthPage/FullAuth.js";
import ProtectedRoute from "./Component/Auth.js";
import AuthenticatedLayout from "./Component/AuthLayout.js";
import Login from "./Component/Login.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
