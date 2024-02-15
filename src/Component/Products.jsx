/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // let ComponentMounted = true;



  useEffect(() => {
    const FetchData = async() => {
      try {
        setLoading(true);
        const response =  await axios
          .get("https://fakestoreapi.com/products")
          .then((res) => {
            setData(res.data);
            setFilter(res.data)
            setLoading(false)
          });
      } catch (error) {
        console.error("Error in FETCHING DATA", error);
      }
    };
    FetchData();
  }, []);






  // useEffect(() => {
  //   const getAllProducts = async () => {
  //     setLoading(true);
  //     const Response = await fetch("https://fakestoreapi.com/products");
  //     if (ComponentMounted) {
  //       setData(await Response.clone().json());
  //       setFilter(await Response.json());
  //       setLoading(false);
  //       console.log(filter);
  //     }
  //     return () => {
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       ComponentMounted = false;
  //     };
  //   };
  //   getAllProducts();
  // }, []);

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

  const filterProduct = (cat)=>{

    const UpdatedList = data.filter((x)=>x.category === cat);
    setFilter(UpdatedList);

  }

  const Showdata = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pd-5">
          <div className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</div>
          <div className="btn btn-outline-dark me-2" onClick={()=>filterProduct("men's clothing")}>Men's Clothing</div>
          <div className="btn btn-outline-dark me-2" onClick={()=>filterProduct("women's clothing")}>Women's Clothing</div>
          <div className="btn btn-outline-dark me-2" onClick={()=>filterProduct("jewelery")}>jewelery</div>
          <div className="btn btn-outline-dark me-2" onClick={()=>filterProduct("electronics")}>Electronics</div>
        </div>

        {filter.map((product) => {
          return (
            <div className="col-md-3 mb-4">
              <div className="card h-100 text-center p-4" key={product.id}>
                <img src={product.image} class="card-img-top" alt={product.title} height="250px" />
                <div className="card-body">
                  <h5 className="card-title mb-0">{product.title.substring(0,12)} ...</h5>
                  <p className="card-text lead fw-bold">
                   ${product.price}
                  </p>
                  <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
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
