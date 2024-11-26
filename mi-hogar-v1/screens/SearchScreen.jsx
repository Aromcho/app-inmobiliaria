// screens/SearchScreen.js
import React, { useState, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import CardList from '../components/CardList';
import { Button } from 'react-native-paper';
import FilterCollapse from '../components/FilterCollapse';
import { FiltersContext } from '../context/FiltersContext'; // Importar el contexto de filtros

const SearchScreen = () => {
  const [showFilters, setShowFilters] = useState(false); // Estado para manejar la visibilidad de los filtros
  const { filters, updateFilters } = useContext(FiltersContext); // Traemos el contexto para manejar el orden

  const handleFilter = () => {
    setShowFilters(!showFilters);
  };

  const handleMapView = () => console.log('Ver Mapa presionado');

  const toggleSortOrder = () => {
    const newOrder = filters.order === 'desc' ? 'asc' : 'desc';
    updateFilters({ order: newOrder });
  };

  return (
    <ScrollView>
      <View style={styles.actionContainer}>
        <Button mode="text" onPress={handleFilter} icon="filter-variant">
          Filtro
        </Button>
        <Button mode="text" onPress={handleMapView} icon="map">
          Ver Mapa
        </Button>
        <Button mode="contained" onPress={toggleSortOrder} icon="sort">
          Ordenar
        </Button>
      </View>

      {/* Filtros Desplegables */}
      {showFilters && (
        <View style={styles.filtersWrapper}>
          <FilterCollapse />
        </View>
      )}

      {/* Lista de Propiedades */}
      <CardList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  filtersWrapper: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default SearchScreen;
