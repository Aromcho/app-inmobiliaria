import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CompleteCard from './CompleteCard';
import axios from 'axios';
import { FiltersContext } from '../context/FiltersContext';

const DestacadoSection = () => {
  const { filters } = useContext(FiltersContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://belga.com.ar:8080/api/property/properties/', {
          params: {
            limit: 5, // Limitar a 5 propiedades destacadas
            order: filters.order, // Ordenar de acuerdo con el filtro
          },
        });

        console.log('Propiedades destacadas recibidas:', response.data);
        setData(response.data.objects);
      } catch (error) {
        console.error('Error al obtener propiedades destacadas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters.order]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando propiedades destacadas...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.title}>Propiedades destacadas</Text>
      <ScrollView style={styles.destacadosCont} horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => {
          const transformedProperty = {
            imageUrl: item.photos?.[0]?.image || 'https://www.infobae.com/resizer/v2/K67XTT5HDRCFDGRWNQID4Z5G5M.jpg?auth=f0f76be415f71567d6bb8085b346416f0ff4306d4b54b141efecd93a38c993e6&smart=true&width=1200&height=675&quality=85',
            title: item.address || 'Sin título',
            location: {
              full_location: item.location?.name || 'Ubicación desconocida',
            },
            details:  'Detalles no disponibles',
          };

          return <CompleteCard key={item._id} property={transformedProperty} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  destacadosCont: {
    padding: 10,
  }
});

export default DestacadoSection;
