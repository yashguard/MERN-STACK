import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ERROR_NULL,
} from "./ActionType";

const initialState = { products: [] };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        product: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.products,
        productsCount: action.productsCount,
      };
    case ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ERROR_NULL:
      return {
        ...state,
        error: null,
      };

    default:
      return {...state};
  }
};
