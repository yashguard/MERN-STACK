import { useEffect } from "react";
import "./Media.css";
import "./App.css";
import WebFont from "webfontloader";
import Header from "./Components/Layout/Header/Header.jsx";
import Footer from "./Components/Layout/Footer/Footer";
import Home from "./Components/Home/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Loader from "./Components/Layout/Loader/Loader";

function App() {
  useEffect(() => {
    WebFont.load({
      google: { families: ["Roboto", "Droid Sans", "Chilanka"] },
    });
  }, []);
  return (
    <>
      <Loader />
    </>
  );
}

export default App;
