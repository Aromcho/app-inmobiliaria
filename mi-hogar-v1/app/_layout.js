import { Slot } from 'expo-router';
import { View } from 'react-native';
import MyAppBar from '../components/MyAppBar';
import { FiltersProvider } from '../context/FiltersContext';


export default function Layout() {
  return (
    <FiltersProvider>
      <MyAppBar />
      <Slot />
    </FiltersProvider>
    
    );
}