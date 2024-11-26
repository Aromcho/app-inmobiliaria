import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const SearchBarHero = ({ isSearchVisible, translateY, searchQuery, setSearchQuery }) => {
  return isSearchVisible ? (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Searchbar
        placeholder="Barrio, Ciudad..."
        style={styles.searchbar}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  searchbar: {
    backgroundColor: '#fff',
  },
});

export default SearchBarHero;
