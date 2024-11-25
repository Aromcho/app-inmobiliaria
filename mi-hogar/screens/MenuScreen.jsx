import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuScreen = ({ navigation }) => {
  const handleEditProfile = () => {
    console.log('Editar perfil presionado');
  };

  const handleSettings = () => {
    console.log('Configuración presionada');
  };

  const handleMyPosts = () => {
    console.log('Mis publicaciones presionado');
  };

  const handleLogout = () => {
    console.log('Cerrar sesión presionado');
  };

  const handlePostProperty = () => {
    // Navegar al stack "Menú" y luego a "PostPropertyStepper"
    navigation.navigate('Menú', {
      screen: 'PostPropertyStepper',
    });
  };

  return (
    <View style={styles.container}>
      {/* Avatar del usuario */}
      <View style={styles.avatarContainer}>
        <Avatar.Image size={100} source={{ uri: 'https://www.example.com/avatar.jpg' }} />
        <Text style={styles.userName}>Usuario Nombre</Text>
      </View>

      {/* Opciones de Menú */}
      <View style={styles.menuOptions}>
        <TouchableOpacity style={styles.menuOption} onPress={handleEditProfile}>
          <Icon name="account-edit" size={24} color="#8559A8" />
          <Text style={styles.menuText}>Editar Perfil</Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={styles.menuOption} onPress={handleSettings}>
          <Icon name="cog" size={24} color="#8559A8" />
          <Text style={styles.menuText}>Configuración</Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={styles.menuOption} onPress={handleMyPosts}>
          <Icon name="book-open-variant" size={24} color="#8559A8" />
          <Text style={styles.menuText}>Mis Publicaciones</Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={styles.menuOption} onPress={handleLogout}>
          <Icon name="logout" size={24} color="#8559A8" />
          <Text style={styles.menuText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Botón para Publicar Propiedad */}
      <Button
        mode="contained"
        icon="plus-circle"
        onPress={handlePostProperty}
        style={styles.publishButton}
        labelStyle={styles.publishButtonText}
      >
        Publicar Propiedad
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  menuOptions: {
    flex: 1,
    width: '100%',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 20,
  },
  publishButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#8559A8',
  },
  publishButtonText: {
    fontSize: 16,
  },
});

export default MenuScreen;
