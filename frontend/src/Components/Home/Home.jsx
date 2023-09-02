import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import axios from "axios";
import "./Home.css";
import Product from "./Product";
import Metadata from "../Layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import {
  ALLPRODUCTFAIL,
  ALLPRODUCTREQUEST,
  ALLPRODUCTSUCCESS,
  ERRORNULL,
} from "../../Redux/Actions";
import Loader from "../Layout/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  let dispatchProducts = useDispatch();
  let { products, loading, error } = useSelector((state) => state);

  const getProducts = async () => {
    dispatchProducts(ALLPRODUCTREQUEST());
    await axios
      .get("http://localhost:8010/products")
      .then((res) => {
        addProducts(res.data.products);
      })
      .catch((err) => {
        catchErrors(err.message);
      });
  };

  const addProducts = (products) => {
    dispatchProducts(ALLPRODUCTSUCCESS(products));
  };

  const catchErrors = (err) => {
    dispatchProducts(ALLPRODUCTFAIL(err));
  };

  if (error) {
    toast.error(error, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }); 
    // Clearing Errors
    dispatchProducts(ERRORNULL());
  } 
  
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products.length > 0 &&
              products.map((product) => (
                <Product key={product._id} {...product} />
              ))}
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
