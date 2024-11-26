import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Función para renderizar la tarjeta completa
const CompleteCard = ({ property = {} }) => {
  const navigation = useNavigation();

  const {
    imageUrl = 'https://www.infobae.com/resizer/v2/K67XTT5HDRCFDGRWNQID4Z5G5M.jpg?auth=f0f76be415f71567d6bb8085b346416f0ff4306d4b54b141efecd93a38c993e6&smart=true&width=1200&height=675&quality=85', // Imagen por defecto
    title = 'Sin título',
    location = {}, // Ubicación como objeto
    details = 'Detalles no disponibles',
  } = property;
console.log(property);
  const handlePress = () => {
    navigation.navigate('PropertyDetail', { property });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card style={styles.card}>
        {/* Imagen de encabezado */}
        <Card.Cover source={{ uri: imageUrl }} />

        {/* Título y descripción */}
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{location?.full_location || 'Ubicación desconocida'}</Paragraph>
          <Paragraph>{details}</Paragraph>
        </Card.Content>

        {/* Acciones */}
        <Card.Actions style={styles.actions}>
          <Button icon="phone" onPress={() => console.log('Contactar presionado')}>Contactar</Button>
          <Button icon="share" onPress={() => console.log('Compartir presionado')}>Compartir</Button>
          <IconButton
            icon="heart"
            color="#0891b2"
            size={20}
            onPress={() => console.log('Favorito presionado')}
          />
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 8,
    elevation: 4,
  },
  actions: {
    justifyContent: 'space-between',
  },
});

export default CompleteCard;
