import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducers";

const reducers = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
});

const middleWares = [thunk];

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleWares))
);
