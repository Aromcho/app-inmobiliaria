// App.js
import React, { useState } from 'react';
import { FiltersProvider } from './context/FiltersContext';  // Importamos el FiltersProvider
import Main from './components/Main';

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
      <Main />
    </FiltersProvider>
  );
}
