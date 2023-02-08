import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Survey from "./pages/survey/survey";
import Welcome from "./pages/welcome/welcome";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route index path="/home" element={<Welcome />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="*" element={<Welcome />} />
        </Routes>
      </BrowserRouter> 
    );
  }
}
