import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FilterButtons = ({ selectedFilter, setSelectedFilter, openMapModal }) => {
  const scaleValue = new Animated.Value(1);

  const animateScale = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = (filter) => {
    animateScale();
    setSelectedFilter(filter);
  };

  return (
    <View style={styles.container}>
      {/* Botón para Filtrar por Alquiler */}
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={[
            styles.card,
            selectedFilter === 'Alquiler' ? styles.selectedCard : styles.defaultCard,
          ]}
          onPress={() => handlePress('Alquiler')}
          activeOpacity={0.8}
        >
          <Icon
            name="key-variant"
            size={40}
            color={selectedFilter === 'Alquiler' ? '#fff' : '#333'}
          />
          <Text
            style={[
              styles.cardText,
              selectedFilter === 'Alquiler' && styles.selectedCardText,
            ]}
          >
            Alquiler
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Botón para Filtrar por Venta */}
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={[
            styles.card,
            selectedFilter === 'Venta' ? styles.selectedCard : styles.defaultCard,
          ]}
          onPress={() => handlePress('Venta')}
          activeOpacity={0.8}
        >
          <Icon
            name="cash"
            size={40}
            color={selectedFilter === 'Venta' ? '#fff' : '#333'}
          />
          <Text
            style={[
              styles.cardText,
              selectedFilter === 'Venta' && styles.selectedCardText,
            ]}
          >
            Venta
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Botón para abrir el mapa */}
      <TouchableOpacity style={styles.mapButton} onPress={openMapModal} activeOpacity={0.8}>
        <Icon name="map-marker-radius" size={40} color="#fff" />
        <Text style={styles.cardText}>Mapa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 40,
  },
  card: {
    width: 100,
    height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    elevation: 5,
  },
  defaultCard: {
    backgroundColor: '#f0f0f0',
  },
  selectedCard: {
    backgroundColor: '#8559A8',
    borderWidth: 2,
    borderColor: '#6b429e',
    shadowColor: '#6b429e',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
  },
  cardText: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedCardText: {
    color: '#fff',
  },
  mapButton: {
    width: 100,
    height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8559A8',
    padding: 15,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#28a745',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
  },
});

export default FilterButtons;
