import React from "react";

import "../welcome/welcome.css";
import img from "../../assets/Intro.jpg";

import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <h6 className="title">Cardiac evaluation before non-cardiac surgery</h6>
      <section className="wrapper home">
        <div className="container">
          <div className="grid-cols-2">
            <div className="grid-item-1">
              <h1 className="main-heading">
                <span> Introduction :</span>
              </h1>
              <p className="info-text">
                Cardiology opinion is a site designed to accompany the
                cardiologist during his cardiac evaluation before non-cardiac
                surgery, and which is based on the latest recommendations of
                <b> l’European Society of Cardiology ‘’ESC’’ 2022.</b>
                <br /> The site has been created as part of an internship
                project by a group of externs supervised by the Cardiology
                department of the{" "}
                <b>CHU Mohammed VI Tangier-Tetouan-AlHoceima.</b>
              </p>

              <div className="names-wrapper">
                <div className="names-1">
                  <h6 className="names-title">1-Externes :</h6>
                  <ul>
                    <li>Boughlala Rajae</li>
                    <li>Bouhjira Israe</li>
                    <li>Bourimane Nouhaila</li>
                    <li>Bourouhou Nouha</li>
                    <li>Ouzid Maryam</li>
                    <li>Chaarir Kaoutar</li>
                  </ul>
                </div>
                <div className="names-2">
                  <h6 className="names-title">2-Tuteurs :</h6>
                  <ul>
                    <li>
                      <b>Chef de service :</b> <br />
                      Professeur Raissouni Zainab
                    </li>
                    <li>
                      <b>Professeur assistant :</b> <br />
                      Professeur El Boussaadani Badr
                    </li>
                    <li>
                      <b>Résident en cardiologie :</b> <br />
                      Dr Berhil Taha
                    </li>
                  </ul>
                </div>
              </div>

              <div className="btn_wrapper">
                <Link to="/survey">
                  <button className="btn view_more_btn">Start</button>
                </Link>
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
    </>
  );
};

export default Welcome;
