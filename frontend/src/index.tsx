import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  /*  <React.StrictMode> */ //to prevent double api calls
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}>
        {
          //@ts-ignore doesn't have an easy fix
          <Route index element={<App />} />
        }
        <Route path="auth">
          <Route index element={<AuthPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  /*   </React.StrictMode> */
);
