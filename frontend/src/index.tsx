import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  /*  <React.StrictMode> */ //to prevent double api calls
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>
  /*   </React.StrictMode> */
);
