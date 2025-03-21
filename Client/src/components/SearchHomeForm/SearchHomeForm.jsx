import React, { useContext, useState } from 'react';
import { Form, Button, Row, Col, Container, Collapse } from 'react-bootstrap';
import Select from 'react-select';
import { FaSearch, FaHome, FaBed, FaCity, FaSlidersH } from 'react-icons/fa';
import MultiRangeSlider from '../MultiRangeSlider/MultiRangeSlider.jsx';
import { FiltersContext } from '../../context/FiltersContext';
import FilterButtons from '../FilterButtons/FilterButtons.jsx';
import FilterCollapseWeb from '../FilterCollapseWeb/FilterCollapseWeb.jsx';
import './SearchHomeForm.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchHomeForm = ({ handleSubmit }) => {
  const { filters, updateFilters } = useContext(FiltersContext); 
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false); // Estado para mostrar/ocultar filtros avanzados
  const location = useLocation();

  const handleFormChange = (field, value) => {
    updateFilters({ [field]: value });
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    updateFilters({ searchQuery: query });

    if (query.length > 2) {
      try {
        const response = await axios.get('/api/property/autocomplete', {
          params: { query }
        });
        setAutocompleteSuggestions(response.data);
      } catch (error) {
        console.error('Error en el autocompletado:', error);
      }
    } else {
      setAutocompleteSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    handleFormChange('searchQuery', suggestion.value);
    setAutocompleteSuggestions([]);
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const propertyTypeOptions = [
    { value: 'Casa', label: 'Casa' },
    { value: 'Departamento', label: 'Departamento' },
    { value: 'PH', label: 'PH' },
    { value: 'Terreno', label: 'Terrenos' },
    { value: 'Oficina', label: 'Oficinas' },
    { value: 'Cochera', label: 'Cocheras' },
    { value: 'Locale', label: 'Locales' },
  ];

  return (
    <Container className="search-form">
      <FilterButtons />
      <Form onSubmit={handleSubmit} className="serach-form-container">
        

        {/* Campo de Búsqueda */}
        <Row className="filter-row">
          <Col>
            <div className="input-icon-wrapper mb-3">
              <FaSearch className="input-icon-placeholder" />
              <Form.Control
                type="text"
                className="filter-input-search input-with-icon"
                value={filters.searchQuery}
                placeholder="Buscar..."
                onChange={handleSearchChange}
              />
              {autocompleteSuggestions.length > 0 && (
                <div className="autocomplete-suggestions">
                  <ul>
                    {autocompleteSuggestions.map((suggestion) => (
                      <li key={suggestion.value} onClick={() => handleSuggestionSelect(suggestion)}>
                        {suggestion.value} {suggestion.secundvalue && ` - ${suggestion.secundvalue}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Col>
        </Row>
        
        {/* Botones de Buscar y Filtros Avanzados */}
        <Row className="filter-row mt-2">
          <Col>
            <div className="buttons-wrapper">
              <Button className="search-button" type="submit">
                Buscar
              </Button>
              <Button className="filters-button" variant="outline-secondary" onClick={toggleAdvancedFilters}>
                <FaSlidersH /> 
              </Button>
            </div>
          </Col>
        </Row>

        {/* Filtros Avanzados (Desplegable) */}
        <Collapse in={showAdvancedFilters}>
          <div className="advanced-filters">
          <Row className="filter-row mb-2">
          <FilterCollapseWeb />
        </Row>
          </div>
        </Collapse>

        
      </Form>
    </Container>
  );
};

export default SearchHomeForm;
