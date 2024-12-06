import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../imgs/eShop (2).png"
const Navbar = () => {

  const state =  useSelector((state)=>state.handleCart)


  // const logoutHandeler = ()=>{
  //   setToken("");
  //   localStorage.clear()
  // }
  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4" to="/#">
            <img src={logo} alt="logo" height={200} width={200} style={{margin:"-80px"}}/>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Products">
                  Products
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to='/about' className="nav-link" >
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="buttons">
              <NavLink to="/Cart" className="btn btn-outline-primary ms-2">
                <i className="fa fa-shopping-cart me-1"></i>Cart ({state.length}
                ){" "}
              </NavLink>

              <button
                className="btn btn-outline-dark ms-2 "
                onClick={""}
              >
                <i className="fa fa-sign-out"></i>
                logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
