import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ALLPRODUCTFAIL,
  ALLPRODUCTREQUEST,
  ALLPRODUCTSUCCESS,
  ERRORNULL,
} from "../../Redux/Actions";
import axios from "axios";
import Loader from "../Layout/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Metadata from "../Layout/Metadata";
import Product from "../Home/Product";
import "./Product.css";
import { FaSearch, FaCartArrowDown, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const URL = new URLSearchParams(location.search);
  const search = URL.get("search");
  const page = URL.get("page");
  let dispatchProducts = useDispatch();
  let { products, loading, error, countProduct, displayProducts } = useSelector(
    (state) => state
  );
  
  const filterApi = async (q1, q2) => {
    await axios
      .get(`http://localhost:8010/products?keyword=${q1}&page=${q2}`)
      .then((res) => {
        addProducts(res.data);
      })
      .catch((err) => {
        catchErrors(err.message);
      });
  };

  const normalApi = async () => {
    await axios
      .get(`http://localhost:8010/products`)
      .then((res) => {
        addProducts(res.data);
      })
      .catch((err) => {
        catchErrors(err.message);
      });
  };

  const getProducts = async () => {
    dispatchProducts(ALLPRODUCTREQUEST());
    if (search) {
      filterApi();
    } else {
      normalApi();
    }
  };

  const addSearchProducts = async (search) => {
    if (search === "") {
      await axios
        .get(`http://localhost:8010/products`)
        .then((res) => {
          addProducts(res.data);
        })
        .catch((err) => {
          catchErrors(err.message);
        });
      return URL.append("search", "");
    }
    URL.append("search", "search.toString()");
    await axios
      .get(`http://localhost:8010/products?keyword=${search}`)
      .then((res) => {
        addProducts(res.data);
      })
      .catch((err) => {
        catchErrors(err.message);
      });
  };

  const addProducts = (data) => {
    const datas = {
      products: data.products,
      countProduct: data.countProduct,
      displayProducts: data.displayProducts,
    };
    dispatchProducts(ALLPRODUCTSUCCESS(datas));
  };

  const catchErrors = (err) => {
    dispatchProducts(ALLPRODUCTFAIL(err));
  };

  const setCurrentPageNo = async (e) => {
    setCurrentPage(e);
    await axios
      .get(`http://localhost:8010/products?page=${e}`)
      .then((res) => {
        addProducts(res.data);
      })
      .catch((err) => {
        catchErrors(err.message);
      });
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
          <Metadata title="PRODUCTS -- ECOMMERCE" />
          <div className="container" id="container">
            <div className="row justify-content-between align-items-center">
              <div className="search row align-items-center col-xxl-2">
                <input
                  type="text"
                  onChange={(e) => addSearchProducts(e.target.value)}
                />
                <FaSearch />
              </div>
              <div className="head col-xxl-9">
                <h2 className="heading">Products</h2>
              </div>
              <div className="icons col-xxl-1 row justify-content-between align-items-center">
                <Link to="/search">
                  <FaSearch />
                </Link>
                <Link to="/cart">
                  <FaCartArrowDown />
                </Link>
                <Link to="/profile">
                  <FaUser />
                </Link>
              </div>
            </div>

            {products.length > 0 &&
              products.map((product) => (
                <Product key={product._id} {...product} />
              ))}
          </div>

          <ToastContainer />

          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={displayProducts}
              totalItemsCount={Number(countProduct)}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
