/* eslint-disable no-unused-vars */
import "./App.css";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import { Routes , Route , Router} from "react-router-dom";
import Products from "./Component/Products";
import Product from "./Component/product";
import Cart from "./Component/Cart";
import Login from "./Component/Login";
import Checkout from "./Component/Checkout";
import About from "./Component/About";
import Contact from "./Component/Contact";

import { useState } from "react";
function App() {

  const [token , setToken] = useState(localStorage.getItem("userToken")?? null)
  return (
    <>
      {token ? (
        <>
          <Navbar token={token}  setToken={setToken}/>
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/Products" Component={Products} />
            <Route exact path="/Products/:id" Component={Product} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<Checkout/>} />
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/contact" element={<Contact/>} />



            
          </Routes>
        </>
      ) : (
        <Login token={token} setToken={setToken} />
      )}
    </>
  );
}

export default App;
