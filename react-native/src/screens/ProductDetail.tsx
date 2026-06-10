import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Product } from '../data/types';

interface Props {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<Props> = ({ product, onBack }) => {

  const handleCall = () => {
    Linking.openURL('tel:555-0199');
  };

  const handleLocate = () => {
    Linking.openURL('geo:0,0?q=Warehouse');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Product Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.value}>${product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Stock</Text>
            <Text style={styles.value}>{product.stock}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Last Restock</Text>
            <Text style={styles.value}>
              {new Date(product.lastRestockDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleCall}>
            <Text style={styles.buttonText}>Call Provider</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleLocate}>
            <Text style={styles.secondaryButtonText}>Warehouse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFDF9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#89F8C7',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    fontSize: 18,
    color: '#002114',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002114',
  },
  content: {
    padding: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006C4C',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#DBE5DE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#4D6357',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191C1A',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#006C4C',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#006C4C',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#006C4C',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductDetail;
