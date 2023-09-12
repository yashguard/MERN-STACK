import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ERRORNULL,
  PRODUCTDETAILSFAIL,
  PRODUCTDETAILSREQUEST,
  PRODUCTDETAILSSUCCESS,
} from "../../Redux/Actions";
import axios from "axios";
import { useParams } from "react-router-dom";
import Metadata from "../Layout/Metadata";
import Loader from "../Layout/Loader/Loader";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewCard from "./ReviewCard";
import "./ProductDetails.css";

const ProductDetails = () => {
  let dispatchProduct = useDispatch();
  let { product, loading, error } = useSelector((state) => state);
  let params = useParams();
  let [quantity, setQuantity] = useState(1);

  const getProductDetails = async () => {
    dispatchProduct(PRODUCTDETAILSREQUEST());
    await axios
      .get(`http://localhost:8010/products/product/${params.id}`)
      .then((res) => {
        getProduct(res.data.getProduct);
      })
      .catch((err) => {
        catchErrors(err.message);
      });
  };

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const getProduct = (product) => {
    dispatchProduct(PRODUCTDETAILSSUCCESS(product));
  };

  const catchErrors = (err) => {
    dispatchProduct(PRODUCTDETAILSFAIL(err));
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
    dispatchProduct(ERRORNULL());
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${product.name} -- ECOMMERCE`} />
          <div className="container">
            <div className="ProductDetails row align-items-center justify-content-center">
              <div className="productImages col-xs-8 col-sm-8 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                <div className="productImage">
                  <Slider {...settings}>
                    {product.images &&
                      product.images.map((item, i) => (
                        <div key={i}>
                          <img
                            className="CarouselImage"
                            key={i}
                            src={item.url}
                            alt={`${i + 1} Slide`}
                          />
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
              <div className="productContents col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
                <div className="details row justify-content-between">
                  <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                  </div>
                  <div className="detailsBlock-2 row align-items-center">
                    <ReactStars {...options} />
                    <span className="detailsBlock-2-span">
                      {" "}
                      ({product.numOfReviews} Reviews)
                    </span>
                  </div>
                  <div className="detailsBlock-3">
                    <h1>{`₹${product.price}`}</h1>
                    <div className="detailsBlock-3-1 row align-items-center">
                      <div className="detailsBlock-3-1-1">
                        <button onClick={decreaseQuantity}>-</button>
                        <input readOnly type="number" value={quantity} />
                        <button onClick={increaseQuantity}>+</button>
                      </div>
                      <button className="addToCart">Add to Cart</button>
                    </div>

                    <p>
                      Status:
                      <b
                        className={
                          product.stock < 1 ? "redColor" : "greenColor"
                        }
                      >
                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                      </b>
                    </p>
                  </div>
                  <div className="detailsBlock-4 row justify-content-between align-items-center">
                    <span>
                      Description : <p>{product.description}</p>
                    </span>
                    <button className="submitReview">Submit Review</button>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="reviewsHeading">REVIEWS</h3>
            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </div>
        </Fragment>
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default ProductDetails;
