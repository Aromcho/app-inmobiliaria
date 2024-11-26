import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const PriceRangeSelector = () => {
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const handleValueChange = (values) => {
    setPriceRange(values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.values}>
        $ {priceRange[0].toLocaleString('es-ES')} - $ {priceRange[1].toLocaleString('es-ES')}
      </Text>
      <MultiSlider
        values={[priceRange[0], priceRange[1]]}
        onValuesChange={handleValueChange}
        min={0}
        max={100000}
        step={1000}
        sliderLength={280}
        selectedStyle={{ backgroundColor: '#8559A8' }}
        unselectedStyle={{ backgroundColor: '#ddd' }}
        markerStyle={{
          backgroundColor: '#8559A8',
          height: 20,
          width: 20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  values: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 0,
  },
});

export default PriceRangeSelector;
