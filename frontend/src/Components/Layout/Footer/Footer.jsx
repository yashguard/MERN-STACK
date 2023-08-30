import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer" className="row align-items-center">
      <div className="leftFooter row align-items-center col-xxl-3">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src="../Image/playstore.png" alt="playstore" />
        <img src="../Image/Appstore.png" alt="Appstore" />
      </div>

      <div className="midFooter text-center col-xxl-6">
        <img src="../Image/logo.png" alt="logo" />
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; MeAbhiSingh</p>
      </div>

      <div className="rightFooter row align-items-center col-xxl-3">
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
