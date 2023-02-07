import React from "react";

import "../welcome/welcome.css";
import img from "../../assets/4.jpg";

import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section class="wrapper">
      <div class="container">
        <div class="grid-cols-2">
          <div class="grid-item-1">
            <h1 class="main-heading">
              Cardiac Evaluation Before <span> Non-cardiac Surgery</span>
            </h1>
            <p class="info-text">w Intro (une fois ndkhul antfahmu eliha).</p>

            <div class="btn_wrapper">
              <Link to="/survey">
                <button class="btn view_more_btn">Démarrer</button>
              </Link>

              {/* <button class="btn documentation_btn">documentation</button> */}
            </div>
          </div>
          <div class="grid-item-2">
            <div class="team_img_wrapper">
              <img src={img} alt="team-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
