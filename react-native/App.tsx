import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  Alert,
  AppState,
  AppStateStatus
} from 'react-native';
import InventoryList from './src/screens/InventoryList';
import ProductDetail from './src/screens/ProductDetail';
import { Product } from './src/data/types';
import { generateMockProducts } from './src/data/ProductRepository';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    // Mock Background Sync simulation
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground! Simulating background sync check...');
      checkLowStock();
    }
    setAppState(nextAppState);
  };

  const checkLowStock = () => {
    // Simulate background check
    const products = generateMockProducts(100);
    const lowStock = products.filter(p => p.stock < 5);

    if (lowStock.length > 0) {
      Alert.alert(
        "Low Stock Alert (Background Sync)",
        `${lowStock.length} products are running low on stock!`
      );
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#89F8C7" />
      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <InventoryList onProductSelect={setSelectedProduct} />
      )}
    </>
  );
};

export default App;
