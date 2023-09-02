import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ERROR_NULL,
} from "./ActionType";

export const ALLPRODUCTREQUEST = () => {
  return { type: ALL_PRODUCT_REQUEST };
};

export const ALLPRODUCTSUCCESS = (products, productsCount) => {
  return { type: ALL_PRODUCT_SUCCESS, products, productsCount };
};

export const ALLPRODUCTFAIL = (error) => {
  return { type: ALL_PRODUCT_FAIL, error };
};

export const PRODUCTDETAILSREQUEST = () => {
  return { type: PRODUCT_DETAILS_REQUEST };
};

export const PRODUCTDETAILSSUCCESS = (product) => {
  return { type: PRODUCT_DETAILS_SUCCESS, product };
};

export const PRODUCTDETAILSFAIL = (error) => {
  return { type: PRODUCT_DETAILS_FAIL, error };
};

export const ERRORNULL = () => {
  return { type: ERROR_NULL };
};
