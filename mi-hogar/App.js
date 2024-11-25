// App.js
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyAppBar from './components/MyAppBar';
import MyBottomNavigation from './navigation/MyBottomNavigation';
import { FiltersProvider } from './context/FiltersContext';  // Importamos el FiltersProvider


export default function App() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activateSearch = () => {
    setIsSearchActive(true);
  };

  const deactivateSearch = () => {
    setIsSearchActive(false);
  };

  return (
    <FiltersProvider>
      <SafeAreaProvider>
        <MyAppBar
          isSearchActive={isSearchActive}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <MyBottomNavigation
          onSearchActivate={activateSearch}
          onSearchDeactivate={deactivateSearch}
        />
      </SafeAreaProvider>
    </FiltersProvider>
  );
}
