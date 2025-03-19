import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import App from "./App"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup";


import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<App />} /> 
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


