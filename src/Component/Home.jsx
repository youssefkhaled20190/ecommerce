import React from "react";
import Products from './Products';

const Home = () => {
  const style = {
    m1: {
      color: "white",
      margin: "6px",
      padding: "6px",
    },
    m2: {
      color: "#b0b0b0b2",
      margin: "18px",
    },
  };
  return (
    <div className="hero">
      <div className="card bg-dark  text-white border-0 ">
        <img
          src="./assets/top-view-christmas-shopping-composition.jpg"
          className="card-img"
          alt="Background"
          height="550px"
        />
        <div className="card-img-overlay d-flex flex-coulmn justify-content-center">
          <div style={{display:"flex" , flexDirection:"column" , marginLeft:"801px" , marginTop:"217px"}}>
            <h5 className="card-title display-4 fw-bolder mb-0" style={style.m1}>
              NEW SEASON ARRIVALS
            </h5>
            <p className="card-text lead fs-2" style={style.m2}>
              CHECK OUT ALL THE TRENDS
            </p>
          </div>
        </div>
      </div>
      <Products/>
    </div>
  );
};

export default Home;
