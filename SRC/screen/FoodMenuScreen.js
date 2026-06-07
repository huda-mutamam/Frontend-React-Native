import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Data dummy untuk menu makanan
const menuItems = [
  { id: '1', name: 'Sate Ayam (10 tusuk)', price: 'Rp 25.000', description: 'Sate ayam dengan bumbu kacang khas.' },
  { id: '2', name: 'Lontong', price: 'Rp 5.000', description: 'Lontong pendamping sate.' },
  { id: '3', name: 'Es Teh Manis', price: 'Rp 8.000', description: 'Minuman teh manis dingin.' },
  { id: '4', name: 'Sate Kambing (10 tusuk)', price: 'Rp 35.000', description: 'Sate kambing muda dengan bumbu kecap pedas.' },
];

const FoodMenuScreen = ({ route, navigation }) => {
  // Ambil data restoran dari parameter navigasi
  const { restaurant } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{restaurant.name}</Text>
        <TouchableOpacity onPress={() => alert('Buka keranjang!')}>
          <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Detail Restoran */}
        <View style={styles.restoInfoContainer}>
          <Image source={{ uri: restaurant.image }} style={styles.restoImage} />
          <Text style={styles.restoName}>{restaurant.name}</Text>
          <Text style={styles.restoCategory}>{restaurant.category}</Text>
          <View style={styles.restoInfo}>
            <Ionicons name="star" size={16} color="#FFC300" />
            <Text style={styles.restoRating}>{restaurant.rating}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.restoDistance}>{restaurant.distance}</Text>
          </View>
        </View>

        {/* Daftar Menu */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Menu</Text>
          {menuItems.map(item => (
            <View key={item.id} style={styles.menuItemCard}>
              <View style={styles.menuItemInfo}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemDesc}>{item.description}</Text>
                <Text style={styles.menuItemPrice}>{item.price}</Text>
              </View>
              <View style={styles.menuItemActions}>
                <TouchableOpacity style={styles.cartButton} onPress={() => alert(`${item.name} ditambahkan ke keranjang!`)}>
                  <Ionicons name="add-circle-outline" size={24} color="#FF6B00" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.buyButton} 
                  onPress={() => navigation.navigate('PaymentScreen', {
                    // Mengirim data ke halaman pembayaran
                    serviceName: item.name,
                    basePrice: item.price.replace('Rp ', ''),
                    discount: '0',
                    total: item.price.replace('Rp ', ''),
                    successScreen: 'FoodSuccessScreen' // Halaman tujuan setelah bayar
                  })}
                >
                  <Text style={styles.buyButtonText}>Beli</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F0' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#D32F2F', paddingHorizontal: 15, paddingVertical: 15, paddingTop: 20,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center', marginHorizontal: 10 },
  scrollContainer: { paddingBottom: 15 },
  restoInfoContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingBottom: 20,
  },
  restoImage: { width: '100%', height: 180 },
  restoName: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', marginTop: 15 },
  restoCategory: { fontSize: 15, color: '#7F8C8D', marginTop: 4 },
  restoInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  restoRating: { marginLeft: 4, fontWeight: 'bold', color: '#2C3E50' },
  dot: { marginHorizontal: 6, color: '#7F8C8D' },
  restoDistance: { color: '#7F8C8D' },
  menuContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  menuItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 10,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  menuItemDesc: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 4,
  },
  menuItemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginTop: 8,
  },
  menuItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    borderWidth: 1,
    borderColor: '#FF6B00',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  buyButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default FoodMenuScreen;