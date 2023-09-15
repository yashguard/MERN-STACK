import React, { Fragment, useEffect } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";

const Products = () => {
  const nav = useNavigate();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("search");
  let dispatchProducts = useDispatch();
  let { products, loading, error } = useSelector((state) => state);

  const filterApi = async (keyword) => {
    await axios
      .get(`http://localhost:8010/products/?keyword=${keyword}`)
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
    if (keyword) {
      filterApi(keyword);
    } else {
      normalApi();
    }
  };

  const addSearchProducts = async (search) => {
    if (search === "") {
      normalApi();
      return nav(`/products`);
    }
    nav(`/products?search=${search}`);
    filterApi(search);
  };

  const addProducts = (data) => {
    dispatchProducts(ALLPRODUCTSUCCESS(data.products, data.countProduct));
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

          {/* <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
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
          )} */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
