import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import { ArrowBackIcon } from "../../components/Icons/Icons.jsx";
//import Layout from "../../components/Layout/Layout.jsx";
import "./500.css"; // Importar el CSS de forma clásica

const Error500 = () => {
  return (
    <div className="error-container">
      <div className="row-content bold">
        <Link to="/">
          <ArrowBackIcon className="left" /> VOLVER AL INICIO
        </Link>
      </div>
      <div>
        <h1>PAGINA NO ENCONTRADA</h1>
      </div>
    </div>
  );
};

export default Error500;
