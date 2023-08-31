import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import Metadata from "../Layout/Metadata";

const Home = () => {
  const products = {
    name: "Blue Tshirt",
    images: [
      {
        url: "https://i.ibb.co/DRST11n/1.webp",
      },
    ],
    price: "₹10000",
    _id: "YashGuard",
  };
  return (
    <Fragment>
      <Metadata title="ECOMMERCE" />
      <section className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </section>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container row justify-content-center" id="container">
        <Product {...products} />
        <Product {...products} />
        <Product {...products} />
        <Product {...products} />
        <Product {...products} />
        <Product {...products} />
        <Product {...products} />
        <Product {...products} />
      </div>
    </Fragment>
  );
};

export default Home;
