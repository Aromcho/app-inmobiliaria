// screens/HomeScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Button,
  Animated,
} from 'react-native';
import FilterButtons from '../components/FilterButtons';
import SearchBarHero from '../components/SearchBarHero';
import PriceRangeSelector from '../components/PriceRangeSelector';
import CompleteCard from '../components/CompleteCard';
import MapModal from '../components/MapModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AdditionalFilters from '../components/AdditionalFilters';
import CategoryCarousel from '../components/CategoryCarousel';
import DestacadoSection from '../components/DestacadoSection';
import LoginScreen from './LoginScreen';

const HomeScreen = ({ onSearchActivate, onSearchDeactivate }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition > 50 && isSearchVisible) {
      setIsSearchVisible(false);
      onSearchActivate();
    } else if (scrollPosition <= 0 && !isSearchVisible) {
      setIsSearchVisible(true);
      onSearchDeactivate();
    }
  };

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
      <View style={styles.container}>
        <LoginScreen />
        <FilterButtons
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          openMapModal={() => setIsModalVisible(true)}
        />
        <MapModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
        <View style={styles.searchSlideCont}>
          <SearchBarHero
            isSearchVisible={isSearchVisible}
            translateY={translateY}
          />
          <PriceRangeSelector />
          
          {/* Botón Buscar e Ícono de Filtro */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Buscar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFilters} style={styles.filterButton}>
              <Icon name="filter" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Filtros adicionales */}
          {isFiltersVisible && (
            <View style={styles.additionalFiltersContainer}>
              <AdditionalFilters />
            </View>
          )}
        </View>

        {/* Categorías */}
          <CategoryCarousel/>

        {/* Propiedades destacadas */}
        {[...Array(5)].map((_, index) => (

        <DestacadoSection  key={index}  />
      ))}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSlideCont: {
    margin: 15,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  searchButton: {
    backgroundColor: '#8559A8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#8559A8',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalFiltersContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  categoriesContainer: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  categoryCard: {
    width: 100,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default HomeScreen;
