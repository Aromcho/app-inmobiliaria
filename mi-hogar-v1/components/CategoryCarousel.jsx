import React from "react";
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
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CategoryCarousel = () => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {[...Array(6)].map((_, i) => (
          <View key={i} style={styles.categoryCard}>
            <Icon name="home" size={40} color="#8559A8" />
            <Text style={styles.categoryText}>Categoría {i + 1}</Text>
          </View>
        ))}
      </ScrollView>
    );
}
const styles = StyleSheet.create({
    
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

export default CategoryCarousel;