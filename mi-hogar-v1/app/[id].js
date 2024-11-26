import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PropertyDetailsScreen = ({ route }) => {
  // Obtenemos la propiedad desde los parámetros de la navegación
  const { property } = route.params;

  // Desestructuramos las propiedades necesarias
  const {
    imageUrl,
    title,
    location,
    details,
  } = property;

  return (
    <View style={styles.container}>
      {/* Imagen */}
      <Image source={{ uri: imageUrl }} style={styles.imageS} />
      
      {/* Título */}
      <Text style={styles.titleS}>{title}</Text>
      
      {/* Ubicación */}
      <Text style={styles.locationS}>{location.full_location}</Text>
      
      {/* Detalles */}
      <Text style={styles.detailsS}>{details}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageS: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  titleS: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationS: {
    fontSize: 18,
    marginBottom: 10,
  },
  detailsS: {
    fontSize: 16,
    color: '#555',
  },
});

export default PropertyDetailsScreen;
