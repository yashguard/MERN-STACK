import React, { Fragment } from "react";
import Metadata from "../Layout/Metadata";
import "./Search.css"

const Search = () => {
  return (
    <div>
      <Fragment>
        <Metadata title="Search A Product -- ECOMMERCE" />
        <form className="searchBox" >
          <input
            type="text"
            placeholder="Search a Product ..."
            // onChange={(e) => setKeyword(e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
      </Fragment>
    </div>
  );
};

export default Search;
