import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Divider, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationsScreen = () => {
  // Ejemplo de notificaciones simuladas
  const notifications = [
    { id: 1, text: 'Tu propiedad en Av. Siempre Viva ha recibido una nueva oferta.', icon: 'home-account' },
    { id: 2, text: 'Recibiste un nuevo mensaje de un posible comprador.', icon: 'message' },
    { id: 3, text: 'La publicación de tu propiedad ha sido destacada por 7 días.', icon: 'star' },
    { id: 4, text: 'No olvides actualizar tu perfil para aumentar la visibilidad.', icon: 'account-edit' },
    { id: 5, text: 'Tu propiedad en Calle Principal ha recibido 50 visitas esta semana.', icon: 'eye' },
  ];

  return (
    <ScrollView style={styles.container}>
      {notifications.map((notification) => (
        <Card key={notification.id} style={styles.notificationCard}>
          <TouchableOpacity style={styles.notificationContainer}>
            <View style={styles.iconContainer}>
              <Icon name={notification.icon} size={30} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.notificationTitle}>Nueva Notificación</Text>
              <Text style={styles.notificationText}>{notification.text}</Text>
            </View>
          </TouchableOpacity>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  notificationCard: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#ffffff',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    backgroundColor: '#8559A8',
    padding: 10,
    borderRadius: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  notificationText: {
    fontSize: 14,
    color: '#555',
  },
});

export default NotificationsScreen;
