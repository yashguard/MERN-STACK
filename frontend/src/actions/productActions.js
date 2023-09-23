import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ERROR_NULL,
} from "../constants/productConstants";

export const getProducts =
  (search = "", page = 1, price) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      const { data } = await axios.get(
        `http://localhost:8010/products?keyword=${search}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`
      );

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        error: error.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:8010/products/product/${id}`
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      product: data.getProduct,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      error: error.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: ERROR_NULL });
};
