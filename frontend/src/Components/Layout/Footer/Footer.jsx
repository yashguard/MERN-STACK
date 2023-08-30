import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer" className="row align-items-center">
      <div className="leftFooter row flex-column align-items-center col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
        <h4 className="text-center">DOWNLOAD OUR APP</h4>
        <p className="text-center">Download App for Android and IOS mobile phone</p>
        <img src="../Image/playstore.png" alt="playstore" />
        <img src="../Image/Appstore.png" alt="Appstore" />
      </div>

      <div className="midFooter text-center col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
        <img src="../Image/logo.png" alt="logo" />
        <p>High quality is our first priority</p>
        <p>Copyrights 2023 &copy; YashGuard</p>
      </div>

      <div className="rightFooter flex-column row align-items-center col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
        <h4>Follow Us</h4>
        <a
          href="https://www.instagram.com/guard_yash/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://www.youtube.com/channel/UCZReSPiq2g_Ye8ZaY6qwbNQ"
          target="_blank"
          rel="noreferrer"
        >
          Youtube
        </a>
        <a
          href="https://www.facebook.com/yash.guard.1"
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>
      </div>
    </footer>
  );
};

export default Footer;
