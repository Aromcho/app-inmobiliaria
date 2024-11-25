// components/CardList.js
import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CompleteCard from './CompleteCard';
import axios from 'axios';
import { FiltersContext } from '../context/FiltersContext'; // Importa el contexto de filtros

const CardList = () => {
  const { filters, updateFilters, totalProperties, limit, offset, setOffset } = useContext(FiltersContext); // Utilizamos filtros del contexto
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalProperties / limit);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log('Parámetros enviados:', {
          limit,
          offset,
          order: filters.order,
        });

        const response = await axios.get('http://belga.com.ar:8080/api/property/properties/', {
          params: {
            limit,
            offset,
            order: filters.order,
          },
        });

        console.log('Respuesta recibida:', response.data);
        setData(response.data.objects);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset, filters.order]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setOffset(offset + limit);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setOffset(offset - limit);
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando propiedades...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Lista de Propiedades */}
      <FlatList
        data={data}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => {
          const transformedProperty = {
            imageUrl: item.photos?.[0]?.image || 'https://www.infobae.com/resizer/v2/K67XTT5HDRCFDGRWNQID4Z5G5M.jpg?auth=f0f76be415f71567d6bb8085b346416f0ff4306d4b54b141efecd93a38c993e6&smart=true&width=1200&height=675&quality=85',
            title: item.address || 'Sin título',
            location: {
              full_location: item.location?.name || 'Ubicación desconocida',
            },
            details: item.publication_title || 'Detalles no disponibles',
          };

          return <CompleteCard property={transformedProperty} />;
        }}
        contentContainerStyle={styles.list}
      />

      {/* Paginación */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.paginationButton}
          disabled={currentPage === 1}
          onPress={handlePreviousPage}
        >
          <Text style={[styles.paginationText, currentPage === 1 && styles.disabledText]}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.pageIndicator}>
          Página {currentPage} de {totalPages}
        </Text>
        <TouchableOpacity
          style={styles.paginationButton}
          disabled={currentPage === totalPages}
          onPress={handleNextPage}
        >
          <Text style={[styles.paginationText, currentPage === totalPages && styles.disabledText]}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  paginationText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledText: {
    color: '#ccc',
  },
  pageIndicator: {
    fontSize: 16,
  },
});

export default CardList;
