import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = (props) => {
  let { name, images, price, _id, ratings, numOfReviews } = props;
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: ratings,
    isHalf: true,
  };
  return (
    <>
      <Link
        className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3"
        to={`/product/${_id}`}
      >
        <div className="productCard">
          <div className="productImage">
            <img src={images[0].url} alt={name} />
          </div>
          <div className="productDetails">
            <p>{name}</p>
            <div className="ratings row justify-content-between align-items-center">
              <ReactStars {...options} /> <span>{numOfReviews} reviews</span>
            </div>
            <span>₹{price}</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
