// App.js
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyBottomNavigation from '../navigation/MyBottomNavigation';
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
      <SafeAreaProvider>
        <MyBottomNavigation
          onSearchActivate={activateSearch}
          onSearchDeactivate={deactivateSearch}
        />
      </SafeAreaProvider>
  );
}
