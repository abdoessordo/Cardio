import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Survey from "./pages/survey/survey";
import Welcome from "./pages/welcome/welcome";

// Google Analytics
import ReactGA from "react-ga";

import {Analytics} from "@vercel/analytics/react"
 
const trackingId = "G-3FLJRD5MP5";
ReactGA.initialize(trackingId);

export default class App extends React.Component {
  render() {
    return (
      <>
        <Analytics mode="production" />
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Welcome />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="*" element={<Welcome />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
