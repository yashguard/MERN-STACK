import React, { Fragment, useState } from "react";
import Metadata from "../Layout/Metadata";
import "./Search.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const nav = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      nav(`/products?search=${keyword}`);
    } else {
      nav(`/products`);
    }
  };
  return (
    <div>
      <Fragment>
        <Metadata title="Search A Product -- ECOMMERCE" />
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search a Product ..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
      </Fragment>
    </div>
  );
};

export default Search;
