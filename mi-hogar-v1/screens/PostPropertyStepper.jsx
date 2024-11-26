import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { ProgressBar, RadioButton, Card, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PostPropertyStepper = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState(null);
  const [condition, setCondition] = useState('venta'); // venta o alquiler
  const [city, setCity] = useState(null);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Publicación completada');
      navigation.goBack();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Detalles de la Propiedad</Text>

            {/* Selección de Tipo de Propiedad */}
            <Text style={styles.subTitle}>Seleccione el tipo de propiedad:</Text>
            <View style={styles.cardContainer}>
              <TouchableOpacity style={styles.card} onPress={() => setPropertyType('Casa')}>
                <Icon name="home" size={40} color={propertyType === 'Casa' ? '#8559A8' : '#333'} />
                <Text style={styles.cardText}>Casa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => setPropertyType('Departamento')}>
                <Icon name="city" size={40} color={propertyType === 'Departamento' ? '#8559A8' : '#333'} />
                <Text style={styles.cardText}>Departamento</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => setPropertyType('Local Comercial')}>
                <Icon name="storefront" size={40} color={propertyType === 'Local Comercial' ? '#8559A8' : '#333'} />
                <Text style={styles.cardText}>Local Comercial</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => setPropertyType('Terreno')}>
                <Icon name="tree" size={40} color={propertyType === 'Terreno' ? '#8559A8' : '#333'} />
                <Text style={styles.cardText}>Terreno</Text>
              </TouchableOpacity>
            </View>

            {/* Condición de la Propiedad */}
            <View style={styles.conditionContainer}>
              <Text style={styles.conditionTitle}>Condición de la Propiedad:</Text>
              <RadioButton.Group onValueChange={(newValue) => setCondition(newValue)} value={condition}>
                <View style={styles.radioOption}>
                  <RadioButton value="venta" />
                  <Text style={styles.radioText}>Venta</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton value="alquiler" />
                  <Text style={styles.radioText}>Alquiler</Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Ubicación de la Propiedad</Text>

            {/* Selección de Ciudad */}
            <Text style={styles.subTitle}>Seleccione la ciudad:</Text>
            <View style={styles.cardContainer}>
              <TouchableOpacity style={styles.card} onPress={() => setCity('Buenos Aires')}>
                <Icon name="map-marker" size={40} color={city === 'Buenos Aires' ? '#8559A8' : '#333'} />
                <Text style={styles.cardText}>Buenos Aires</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => setCity('Córdoba')}>
                <Icon name="map-marker" size={40} color={city === 'Córdoba' ? '#8559A8' : '#333'} />
                <Text style={styles.cardText}>Córdoba</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => setCity('Rosario')}>
                <Icon name="map-marker" size={40} color={city === 'Rosario' ? '#8559A8' : '#333'} />
                <Text style={styles.cardText}>Rosario</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Confirmación de la Publicación</Text>
            <Text>Tipo de Propiedad: {propertyType}</Text>
            <Text>Condición: {condition === 'venta' ? 'Venta' : 'Alquiler'}</Text>
            <Text>Ciudad: {city}</Text>
            <Text>Revisa los detalles antes de confirmar la publicación.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressBar progress={parseFloat((step / 3).toFixed(2))} color="#8559A8" style={styles.progressBar} />
      {renderStepContent()}
      <View style={styles.buttonContainer}>
        {step > 1 && (
          <Button title="Atrás" onPress={handleBack} color="#888" />
        )}
        <Button
          title={step < 3 ? "Siguiente" : "Publicar"}
          onPress={handleNext}
          color="#8559A8"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  card: {
    width: '40%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  conditionContainer: {
    marginVertical: 20,
    alignItems: 'flex-start',
    width: '100%',
  },
  conditionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});

export default PostPropertyStepper;
