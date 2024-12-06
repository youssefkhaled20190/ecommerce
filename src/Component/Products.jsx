/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { NavLink } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";

const Products = () => {
  // const [data, setData] = useState([]);
  
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // let ComponentMounted = true;
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(products);


  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("Product");
      console.log("Fetched products:", response.data); // Log fetched data
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const Loaddata = () => {
    return (
    <>
    <div className="col-md-3">
        <Skeleton height={350}/>
    </div>
    <div className="col-md-3">
        <Skeleton height={350}/>
    </div>
    <div className="col-md-3">
        <Skeleton height={350}/>
    </div>
    </>
    );
  };

  const filterProduct = (catId)=>{

    const UpdatedList = products.filter((x)=>x.categoryId === catId);
    setFilter(UpdatedList);

  }

  const Showdata = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pd-5">
          <div className="btn btn-outline-dark me-2" onClick={()=>setFilter(products)}>All</div>
          <div className="btn btn-outline-dark me-2" onClick={()=>filterProduct(2)}>Men's Clothing</div>
          <div className="btn btn-outline-dark me-2" onClick={()=>filterProduct(3)}>Women's Clothing</div>
          <div className="btn btn-outline-dark me-2" onClick={()=>filterProduct(1)}>Accessories</div>
        </div>

        {filter.map((products) => {
          return (
            <div className="col-md-3 mb-4">
              <div className="card h-100 text-center p-4" key={products.id}>
                <img src={`https://localhost:7121/files/Images/${products.imageName}`} class="card-img-top" alt={products.productTittle} height="250px" />
                <div className="card-body">
                  <h5 className="card-title mb-0">{products.productTittle.substring(0,12)} ...</h5>
                  <p className="card-text lead fw-bold">
                   ${products.productPrice}
                  </p>
                  <NavLink to={`/products/${products.id}`} className="btn btn-outline-primary">
                   Buy Now
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-5 fw-bolder text-center">Latest Product</h1>
            <hr></hr>
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loaddata /> : <Showdata />}
        </div>
      </div>
    </div>
  );
};

export default Products;
