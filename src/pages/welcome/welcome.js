import React, { useState } from "react";

import "../welcome/welcome.css";
import img from "../../assets/Intro.jpg";
import logo1 from "../../assets/Logo CHU Cardio.jpg";
import logo2 from "../../assets/Logo CHU med VI.png";

import { Link } from "react-router-dom";

const Welcome = () => {
  const [externs, setExterns] = useState(false);
  const [department, setDepartement] = useState(false);

  return (
    <div className="container-parent">
      <div className="header-nav">
        <img src={logo1} alt="CHU Cardio" className="logo" />
        <h6 className="title">Cardiac evaluation before non-cardiac surgery</h6>
        <img src={logo2} alt="CHU med VI" className="logo" />
      </div>
      <section className="wrapper home">
        <div className="container">
          <div className="grid-cols-2">
            <div className="grid-item-1">
              <p className="info-text">
                Cardiology opinion is a site designed to accompany the
                cardiologist during his cardiac evaluation before non-cardiac
                surgery, and which is based on the latest recommendations of
                <b> l’European Society of Cardiology ‘’ESC’’ 2022.</b>
                <br />
                <br /> The site has been created as part of an internship
                project by a group of{" "}
                <button
                  className="externs"
                  onClick={() => setExterns(!externs)}
                >
                  externs
                </button>{" "}
                supervised by the Cardiology{" "}
                <button
                  className="externs"
                  onClick={() => setDepartement(!department)}
                >
                  department
                </button>{" "}
                of the <b>CHU Mohammed VI Tangier-Tetouan-AlHoceima.</b>
              </p>

              <div className="btn_wrapper">
                <Link to="/survey">
                  <button className="btn view_more_btn">Start</button>
                </Link>
              </div>
            </div>
            <div className="grid-item-2">
              <div className="names-wrapper">
                {externs && (
                  <div className="names-1">
                    <h6 className="names-title">1-Externes :</h6>
                    <ul>
                      <li>Boughlala Rajae</li>
                      <li>Bouhjira Israe</li>
                      <li>Bourimane Nouhaila</li>
                      <li>Bourouhou Nouha</li>
                      <li>Bouzid Maryam</li>
                      <li>Chaarir Kaoutar</li>
                    </ul>
                  </div>
                )}
                {department && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
