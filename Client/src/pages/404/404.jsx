import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import { ArrowBackIcon } from "../../components/Icons/Icons.jsx";
//import Layout from "../../components/Layout/Layout.jsx";
import "./404.css"; // Importar el CSS de forma clásica

const Error404 = () => {
  return (
      <div className="error-container">
        <div className="container">
          <div className="row-content bold">
            <Link to="/">
              <ArrowBackIcon className="left" /> VOLVER AL INICIO
            </Link>
          </div>
        </div>

        <div className="container">
          <h1>PAGINA NO ENCONTRADA</h1>
        </div>
      </div>
  );
};

export default Error404;
