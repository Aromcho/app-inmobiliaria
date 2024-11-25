// components/MyAppBar.js
import React from 'react';
import { Appbar, Searchbar } from 'react-native-paper';
import { View, Image, StyleSheet } from 'react-native';

const MyAppBar = ({ isSearchActive, searchQuery, setSearchQuery }) => {
  const handleMore = () => console.log('Más presionado');

  return (
    <View>
      <Appbar.Header>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        {isSearchActive ? (
          <Searchbar
            placeholder="Buscar"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchbar}
          />
        ) : (
          <Appbar.Content title="Mi Hogar" />
        )}
        <Appbar.Action icon="dots-vertical" onPress={handleMore} />
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    margin: 10,
  },
  searchbar: {
    flex: 1,
    marginRight: 2,
  },
});

export default MyAppBar;
