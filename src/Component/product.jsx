import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import {  useDispatch } from "react-redux";
import { AddItem } from "../redux/actions";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product)=>{
    dispatch(AddItem(product));
  }

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      const Response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await Response.json());
      setLoading(false);
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Loading = () => {
    return (
    <>
    <div className="col-md-6">
        <Skeleton height={400}/>
    </div>
    <div className="col-md-6" style={{lineHeight:2}}>
    <Skeleton height={50} width={300}/>
    <Skeleton height={75}/>
    <Skeleton height={25} width={150}/>
    <Skeleton height={50}/>
    <Skeleton height={150}/>
    <Skeleton height={50}width={100}/>
    <Skeleton height={50} width={100} style={{marginLeft:6}}/>
    </div>
    </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            height={400}
            width={400}
          />
        </div>
        <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">
                        {product.category}
                    </h4>
                    <h1 className="display-5">{product.title}</h1>
                    <p className="lead fw-bolder">
                        Reating {product.rating && product.rating.rate}
                        <i className="fa fa-star"></i>
                    </p>
                    <h3 className="display-6 fw-bold my-4">
                        ${product.price}
                    </h3>
                    <p className="lead">{product.description}</p>
                    <button className="btn btn-outline-dark px-4 py-2" onClick={()=>addProduct(product)}>
                        Add To Cart
                    </button>
                    <NavLink to="/Cart" className="btn btn-outline-dark ms-2 px-4 py-2">
                        Go To Cart
                    </NavLink>
                </div>
      </>
    );
  };

  return (
    <div>
      <div className="container  py-5 ">
        <div className="row  py-5 ">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
    </div>
  );
};
export default Product;
