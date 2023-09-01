import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import axios from "axios";
import "./Home.css";
import Product from "./Product";
import Metadata from "../Layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { ALLPRODUCTSUCCESS } from "../../Redux/Actions";

const Home = () => {
  let dispatchProducts = useDispatch();
  let reduxProducts = useSelector((store) => store.products);
  const getProducts = async () => {
    await axios
      .get("http://localhost:8010/products")
      .then((res) => {
        addProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProducts = async (products) => {
    dispatchProducts(ALLPRODUCTSUCCESS(products));
  };

  useEffect(() => {
    getProducts();
  }, []);
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

      <div
        className="container row justify-content-center"
        id="container"
      ></div>
    </Fragment>
  );
};

export default Home;
