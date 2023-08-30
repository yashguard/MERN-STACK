import { useEffect } from "react";
import "./App.css";
import Header from "./Components/Layout/Header.jsx";
import WebFont from "webfontloader";

function App() {
  useEffect(() => {
    WebFont.load({
      google: { families: ["Roboto", "Droid Sans", "Chilanka"] },
    });
  }, []);
  return (
    <>
      <Header />
    </>
  );
}

export default App;
