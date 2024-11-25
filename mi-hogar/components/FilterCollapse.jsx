import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FiltersContext } from '../context/FiltersContext';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FilterCollapse = () => {
  const { filters, updateFilters } = useContext(FiltersContext);

  const handleFormChange = (field, value) => {
    updateFilters({ [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        {/* Filtro por tipo de operación */}
        <Text style={styles.filterLabel}>Tipo de Operación:</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[
              styles.smallCard,
              filters.operation_type === 'Venta' ? styles.selectedSmallCard : null,
            ]}
            onPress={() => handleFormChange('operation_type', 'Venta')}
          >
            <Icon
              name="cash"
              size={24}
              color={filters.operation_type === 'Venta' ? '#fff' : '#333'}
            />
            <Text
              style={[
                styles.cardText,
                filters.operation_type === 'Venta' && styles.selectedCardText,
              ]}
            >
              Venta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.smallCard,
              filters.operation_type === 'Alquiler' ? styles.selectedSmallCard : null,
            ]}
            onPress={() => handleFormChange('operation_type', 'Alquiler')}
          >
            <Icon
              name="key"
              size={24}
              color={filters.operation_type === 'Alquiler' ? '#fff' : '#333'}
            />
            <Text
              style={[
                styles.cardText,
                filters.operation_type === 'Alquiler' && styles.selectedCardText,
              ]}
            >
              Alquiler
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filtro por tipo de propiedad */}
        <Text style={styles.filterLabel}>Tipo de Propiedad:</Text>
        <View style={styles.cardContainer}>
          {['Casa', 'Departamento', 'PH', 'Terreno'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.smallCard,
                filters.property_type === type ? styles.selectedSmallCard : null,
              ]}
              onPress={() => handleFormChange('property_type', type)}
            >
              <Icon
                name={
                  type === 'Casa' ? 'home' :
                  type === 'Departamento' ? 'city' :
                  type === 'PH' ? 'home-group' :
                  'tree'
                }
                size={24}
                color={filters.property_type === type ? '#fff' : '#333'}
              />
              <Text
                style={[
                  styles.cardText,
                  filters.property_type === type && styles.selectedCardText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filtro por habitaciones */}
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Dormitorios (min - max):</Text>
          <View style={styles.inlineInputs}>
            <TextInput
              label="Mínimo"
              value={filters.min_rooms ? filters.min_rooms.toString() : ''}
              onChangeText={(value) => handleFormChange('min_rooms', value)}
              keyboardType="numeric"
              style={[styles.input, styles.inlineInput]}
            />
            <TextInput
              label="Máximo"
              value={filters.max_rooms ? filters.max_rooms.toString() : ''}
              onChangeText={(value) => handleFormChange('max_rooms', value)}
              keyboardType="numeric"
              style={[styles.input, styles.inlineInput]}
            />
          </View>
        </View>

        {/* Filtro por cocheras */}
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Cocheras (min - max):</Text>
          <View style={styles.inlineInputs}>
            <TextInput
              label="Mínimo"
              value={filters.min_garages ? filters.min_garages.toString() : ''}
              onChangeText={(value) => handleFormChange('min_garages', value)}
              keyboardType="numeric"
              style={[styles.input, styles.inlineInput]}
            />
            <TextInput
              label="Máximo"
              value={filters.max_garages ? filters.max_garages.toString() : ''}
              onChangeText={(value) => handleFormChange('max_garages', value)}
              keyboardType="numeric"
              style={[styles.input, styles.inlineInput]}
            />
          </View>
        </View>

        {/* Botón de búsqueda */}
        <Button
          mode="contained"
          onPress={() => console.log('Aplicar filtros')}
          style={styles.searchButton}
        >
          Aplicar Filtros
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  filtersContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 5,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  smallCard: {
    width: '30%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 1,
  },
  selectedSmallCard: {
    backgroundColor: '#8559A8',
  },
  cardText: {
    fontSize: 14,
    marginTop: 5,
    color: '#333',
    textAlign: 'center',
  },
  selectedCardText: {
    color: '#fff',
  },
  filterItem: {
    marginBottom: 15,
  },
  inlineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  inlineInput: {
    width: '48%',
  },
  searchButton: {
    backgroundColor: '#8559A8',
  },
});

export default FilterCollapse;
