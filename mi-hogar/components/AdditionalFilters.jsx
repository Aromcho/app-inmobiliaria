import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AdditionalFilters = () => {
  return (
    <View style={styles.container}>
      {/* Filtros adicionales */}
      <Text style={styles.filterText}>Filtrar por número de habitaciones</Text>
      <Picker style={styles.picker}>
        <Picker.Item label="1 Habitación" value="1" />
        <Picker.Item label="2 Habitaciones" value="2" />
        <Picker.Item label="3 Habitaciones" value="3" />
        <Picker.Item label="4+ Habitaciones" value="4+" />
      </Picker>

      <Text style={styles.filterText}>Filtrar por número de baños</Text>
      <Picker style={styles.picker}>
        <Picker.Item label="1 Baño" value="1" />
        <Picker.Item label="2 Baños" value="2" />
        <Picker.Item label="3+ Baños" value="3+" />
      </Picker>

      <Text style={styles.filterText}>Filtrar por número de ambientes</Text>
      <Picker style={styles.picker}>
        <Picker.Item label="1 Ambiente" value="1" />
        <Picker.Item label="2 Ambientes" value="2" />
        <Picker.Item label="3+ Ambientes" value="3+" />
      </Picker>

      <Text style={styles.filterText}>Filtrar por cochera</Text>
      <Picker style={styles.picker}>
        <Picker.Item label="Sin cochera" value="none" />
        <Picker.Item label="Con cochera" value="with" />
      </Picker>

      <Text style={styles.filterText}>Filtrar por tipo de propiedad</Text>
      <Picker style={styles.picker}>
        <Picker.Item label="Casa" value="house" />
        <Picker.Item label="Departamento" value="apartment" />
        <Picker.Item label="Dúplex" value="duplex" />
        <Picker.Item label="Terreno" value="land" />
      </Picker>

      <Text style={styles.filterText}>Filtrar por amueblado</Text>
      <Picker style={styles.picker}>
        <Picker.Item label="Sin amueblar" value="unfurnished" />
        <Picker.Item label="Amueblado" value="furnished" />
      </Picker>

      <Text style={styles.filterText}>Filtrar por disponibilidad de patio/jardín</Text>
      <Picker style={styles.picker}>
        <Picker.Item label="Sin patio/jardín" value="none" />
        <Picker.Item label="Con patio/jardín" value="with" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
  },
  filterText: {
    color: '#333',
    fontSize: 14,
    marginBottom: 5,
  },
  picker: {
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default AdditionalFilters;
