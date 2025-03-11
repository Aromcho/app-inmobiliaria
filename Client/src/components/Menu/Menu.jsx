import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Row, Col, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FiltersContext } from "../../context/FiltersContext";
import { IoMdSettings } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { IoIosNotifications } from "react-icons/io";
import "./Menu.css";


export const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

  
  const { filters, updateFilters } = useContext(FiltersContext);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    updateFilters({ searchQuery: query });

    if (query.length > 2) {
      try {
        const response = await axios.get("/api/property/autocomplete", {
          params: { query },
        });
        setAutocompleteSuggestions(response.data);
      } catch (error) {
        console.error("Error en el autocompletado:", error);
      }
    } else {
      setAutocompleteSuggestions([]);
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <Navbar expand="lg" bg="white" fixed="top" className="menu-container">
      <div className="nav-flex-container">
        <Navbar.Brand as={Link} to="/">
          <img
            className="logo-img"
            src="/images/logo-mi-hogar.png"
            alt="mi hogar"
          />
        </Navbar.Brand>
        {!isHomePage && (
          <div className="input-nav-icon-wrapper">
            <FaSearch className="input-icon-placeholder" />
            <Form.Control
              type="text"
              className="input-search input-with-icon"
              value={filters.searchQuery}
              placeholder="Buscar..."
              onChange={handleSearchChange}
            />
            {autocompleteSuggestions.length > 0 && (
              <div className="autocomplete-suggestions">
                <ul>
                  {autocompleteSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.value}
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      {suggestion.value}{" "}
                      {suggestion.secundvalue && ` - ${suggestion.secundvalue}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto menu-config">
            <Link to="/venta" className="action-button">Venta</Link>
            <Link to="/alquiler" className="action-button">Alquiler</Link>
            <Link to="/alquiler-temporal" className="action-button">Alquiler temporal</Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Menu;
