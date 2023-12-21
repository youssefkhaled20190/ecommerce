/* eslint-disable no-unused-vars */
import "./App.css";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import { Routes , Route , Router} from "react-router-dom";
import Products from "./Component/Products";
import Product from "./Component/product";
import Cart from "./Component/Cart";
function App() {
  return (
    <>
 
  <Navbar />
      <Routes >
        <Route exact path="/" Component={Home} />
        <Route exact path="/Products" Component={Products} />
        <Route exact path="/Products/:id" Component={Product} />
        <Route exact path="/Cart" component={<Cart/>} />
      </Routes >
 
    </>
  );
}

export default App;
