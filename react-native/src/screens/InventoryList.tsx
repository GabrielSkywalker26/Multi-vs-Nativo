import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Product } from '../data/types';
import { generateMockProducts, getSortedProducts } from '../data/ProductRepository';

interface Props {
  onProductSelect: (product: Product) => void;
}

const InventoryList: React.FC<Props> = ({ onProductSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Heavy operation simulation
    const loadData = () => {
      const mockData = generateMockProducts(5000);
      const sorted = getSortedProducts(mockData);
      setProducts(sorted);
      setLoading(false);
    };

    setTimeout(loadData, 500); // Simulate initial load delay
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onProductSelect(item)}
    >
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetails}>
          Stock: {item.stock} | ${item.price.toFixed(2)}
        </Text>
      </View>
      {item.stock < 20 && (
        <View style={styles.priorityIndicator} />
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#006C4C" />
        <Text style={styles.loadingText}>Calculating Restock Priorities...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inventory Manager</Text>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFDF9',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFDF9',
  },
  header: {
    padding: 16,
    backgroundColor: '#89F8C7',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002114',
  },
  searchBar: {
    margin: 16,
    padding: 12,
    backgroundColor: '#E1E3DF',
    borderRadius: 24,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191C1A',
  },
  itemDetails: {
    fontSize: 14,
    color: '#404944',
    marginTop: 4,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#BA1A1A',
  },
  separator: {
    height: 1,
    backgroundColor: '#BFC9C2',
    marginHorizontal: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#006C4C',
  },
});

export default InventoryList;
