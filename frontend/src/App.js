import { useEffect } from "react";
import "./Media.css";
import "./App.css";
import WebFont from "webfontloader";
import Header from "./Components/Layout/Header/Header.jsx";
import Footer from "./Components/Layout/Footer/Footer";
import Home from "./Components/Home/Home.jsx";
import ProductDetails from "./Components/Product/ProductDetails.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    WebFont.load({
      google: { families: ["Roboto", "Droid Sans", "Chilanka"] },
    });
  }, [])
  return (
    <>
      <Header />
      <Routes>
        <Route extact path="/" Component={Home} />
        <Route extact path="/product/:id" Component={ProductDetails} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
