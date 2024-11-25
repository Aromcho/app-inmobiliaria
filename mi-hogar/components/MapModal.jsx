import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { Image } from 'react-native';


const MapModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
              source={{ uri: 'https://media.istockphoto.com/id/1192078523/es/vector/fondo-del-esquema-de-mapa-de-la-ciudad-en-estilo-plano-vector.jpg?s=612x612&w=0&k=20&c=OHCSMEe-toWfaK_8hfETNskgK3p6oS5IfpNOOBM3bkM=' }}
              style={{ width: 400, height: 400, marginTop: 20 }}
            />
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>

            
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#800080',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapModal;
