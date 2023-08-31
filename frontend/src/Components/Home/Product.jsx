import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = (props) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 2.5,
    isHalf: true,
  };
  let { name, images, price, _id } = props;
  return (
    <>
      <Link className="col-xxl-3" to={_id}>
        <div className="productCard">
          <div className="productImage">
            <img src={images[0].url} alt={name} />
          </div>
          <div className="productDetails">
            <p>{name}</p>
            <div className="ratings row justify-content-between align-items-center">
              <ReactStars {...options} /> <span>256 reviews</span>
            </div>
            <span>{price}</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
