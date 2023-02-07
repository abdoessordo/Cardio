import React from "react";

import "../welcome/welcome.css";
import img from "../../assets/4.jpg";

import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="wrapper home">
      <div className="container">
        <div className="grid-cols-2">
          <div className="grid-item-1">
            <h1 className="main-heading">
              Cardiac Evaluation Before <span> Non-cardiac Surgery</span>
            </h1>
            <p className="info-text">w Intro (une fois ndkhul antfahmu eliha).</p>

            <div className="btn_wrapper">
              <Link to="/survey">
                <button className="btn view_more_btn">Démarrer</button>
              </Link>

              {/* <button className="btn documentation_btn">documentation</button> */}
            </div>
          </div>
          <div className="grid-item-2">
            <div className="team_img_wrapper">
              <img src={img} alt="team-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
