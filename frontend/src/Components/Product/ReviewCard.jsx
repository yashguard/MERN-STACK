import React from "react";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="reviewCard row align-items-center">
      <img src="../Image/Profile.png" alt="User" />
      <span>{review.name}</span>
      <ReactStars {...options} />
      <p className="reviewCardComment">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
