import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Data dummy untuk restoran
const restaurants = [
  {
    id: '1',
    name: 'Sate Ayam Pak Budi',
    category: 'Sate, Indonesia',
    rating: '4.8',
    distance: '1.2 km',
    image: 'https://i.imgur.com/gTj913T.jpg', // URL gambar placeholder
  },
  {
    id: '2',
    name: 'Nasi Goreng Mafia',
    category: 'Nasi, Indonesia',
    rating: '4.6',
    distance: '2.1 km',
    image: 'https://i.imgur.com/O1xVlB5.jpg',
  },
  {
    id: '3',
    name: 'Pizza Cepat Saji',
    category: 'Pizza, Barat',
    rating: '4.7',
    distance: '2.5 km',
    image: 'https://i.imgur.com/p5tAb3h.jpg',
  },
];

const FoodScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pesan Makanan</Text>
        <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7F8C8D" style={styles.searchIcon} />
        <TextInput
          placeholder="Cari makanan atau restoran..."
          style={styles.searchInput}
          placeholderTextColor="#A0A0A0"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Kategori */}
        <View>
          <Text style={styles.sectionTitle}>Kategori</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {['Terdekat', 'Promo', 'Terlaris', 'Minuman', 'Cemilan'].map(cat => (
              <TouchableOpacity 
                key={cat} 
                style={styles.categoryButton}
                onPress={() => navigation.navigate('FoodCategoryScreen', { categoryName: cat })}
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Daftar Restoran */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Restoran Terdekat</Text>
          {restaurants.map(resto => (
            <TouchableOpacity 
              key={resto.id} 
              style={styles.restoCard}
              onPress={() => navigation.navigate('FoodMenuScreen', { restaurant: resto })}
            >
              <Image source={{ uri: resto.image }} style={styles.restoImage} />
              <View style={styles.restoDetails}>
                <Text style={styles.restoName}>{resto.name}</Text>
                <Text style={styles.restoCategory}>{resto.category}</Text>
                <View style={styles.restoInfo}>
                  <Ionicons name="star" size={14} color="#FFC300" />
                  <Text style={styles.restoRating}>{resto.rating}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.restoDistance}>{resto.distance}</Text>
                </View>
              </View>
              {/* Tombol Aksi Tambahan */}
              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={() => alert('Item ditambahkan ke keranjang!')}>
                  <Ionicons name="cart-outline" size={20} color="#FF6B00" />
                  <Text style={styles.actionButtonText}>Keranjang</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.buyButton]} onPress={() => navigation.navigate('FoodMenuScreen', { restaurant: resto })}>
                  <Text style={[styles.actionButtonText, styles.buyButtonText]}>Beli</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#D32F2F', paddingHorizontal: 15, paddingVertical: 15, paddingTop: 20,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0',
    margin: 15, borderRadius: 12, paddingHorizontal: 15,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 16, color: '#2C3E50' },
  scrollContainer: { paddingHorizontal: 15, paddingBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  categoryScroll: { marginHorizontal: -5 },
  categoryButton: {
    backgroundColor: '#FFF0F0', borderRadius: 20, paddingVertical: 8,
    paddingHorizontal: 15, marginRight: 10,
  },
  categoryText: { color: '#D32F2F', fontWeight: '600' },
  restoCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 15,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 2,
  },
  restoImage: {
    width: '100%', height: 140, borderTopLeftRadius: 12, borderTopRightRadius: 12,
  },
  restoDetails: { padding: 15 },
  restoName: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  restoCategory: { fontSize: 14, color: '#7F8C8D', marginTop: 4 },
  restoInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  restoRating: { marginLeft: 4, fontWeight: 'bold', color: '#2C3E50' },
  dot: { marginHorizontal: 6, color: '#7F8C8D' },
  restoDistance: { color: '#7F8C8D' },
  actionContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6B00',
    marginHorizontal: 5,
  },
  actionButtonText: {
    marginLeft: 8,
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  buyButton: { backgroundColor: '#FF6B00' },
  buyButtonText: { color: '#FFFFFF', marginLeft: 0 },
});

export default FoodScreen;