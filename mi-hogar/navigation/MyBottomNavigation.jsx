import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationsScreen from '../screens/NotificationsScreen'; // Nuevo componente de Notificaciones
import MenuScreen from '../screens/MenuScreen'; // Nuevo componente de Menú
import PropertyDetailsScreen from '../screens/PropertyDetailsScreen';
import PostPropertyStepper from '../screens/PostPropertyStepper'; // Importa el componente PostPropertyStepper

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack para Home
const HomeStack = ({ onSearchActivate, onSearchDeactivate }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
      >
        {() => <HomeScreen onSearchActivate={onSearchActivate} onSearchDeactivate={onSearchDeactivate} />}
      </Stack.Screen>
      <Stack.Screen
        name="PropertyDetail"
        component={PropertyDetailsScreen}
        options={{ title: 'Detalles de la Propiedad' }}
      />
      <Stack.Screen
        name="PostPropertyStepper"
        component={PostPropertyStepper}
        options={{ title: 'Publicar Propiedad' }}
      />
    </Stack.Navigator>
  );
};

// Stack para Search
const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PropertyDetail"
        component={PropertyDetailsScreen}
        options={{ title: 'Detalles de la Propiedad' }}
      />
    </Stack.Navigator>
  );
};

// Stack para Notifications
const NotificationsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Stack para Menu
const MenuStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        options={{ headerShown: false }}
      >
        {() => <MenuScreen navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="PostPropertyStepper"
        component={PostPropertyStepper}
        options={{ title: 'Publicar Propiedad' }}
      />
    </Stack.Navigator>
  );
};

const MyBottomNavigation = ({ onSearchActivate, onSearchDeactivate }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = 'home';
            } else if (route.name === 'Búsqueda') {
              iconName = 'magnify';
            } else if (route.name === 'Notificaciones') {
              iconName = 'bell';
            } else if (route.name === 'Menú') {
              iconName = 'menu';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#8559A8',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: 'white' },
        })}
      >
        <Tab.Screen
          name="Inicio"
          options={{ headerShown: false }}
        >
          {() => <HomeStack onSearchActivate={onSearchActivate} onSearchDeactivate={onSearchDeactivate} />}
        </Tab.Screen>
        <Tab.Screen
          name="Búsqueda"
          component={SearchStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Notificaciones"
          component={NotificationsStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Menú"
          component={MenuStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MyBottomNavigation;
