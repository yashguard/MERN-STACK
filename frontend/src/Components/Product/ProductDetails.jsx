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
import "./ProductDetails.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = () => {
  let dispatchProducts = useDispatch();
  let { product, loading, error } = useSelector((state) => state);
  let params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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

  const getProductDetails = async () => {
    dispatchProducts(PRODUCTDETAILSREQUEST());
    await axios
      .get(`http://localhost:8010/products/product/${params.id}`)
      .then((res) => {
        getProduct(res.data.getProduct);
      })
      .catch((err) => {
        catchError(err.message);
      });
  };

  const getProduct = (product) => {
    dispatchProducts(PRODUCTDETAILSSUCCESS(product));
  };

  const catchError = (err) => {
    dispatchProducts(PRODUCTDETAILSFAIL(err));
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
    getProductDetails();
  }, []);

  function Arrows(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          color: "black",
        }}
        onClick={onClick}
      />
    );
  }

  let settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    // nextArrow: <Arrows />,
    // prevArrow: <Arrows />,
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${product.name} -- ECOMMERCE`} />
          <div className="container">
            <div className="ProductDetails row align-items-center">
              <div className="productImages col-xxl-4">
                <div className="productImage">
                  <Slider {...settings}>
                    {product.images &&
                      product.images.map((item, i) => (
                        <div>
                          <img
                            className="CarouselImage"
                            key={i}
                            src={item.url}
                            alt={`${i} Slide`}
                          />
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
              <div className="productContents col-xxl-8">
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
                          product.Stock < 1 ? "redColor" : "greenColor"
                        }
                      >
                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
