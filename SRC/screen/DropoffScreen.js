import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps'; // <-- 1. Impor MapView dan Marker
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Data dummy untuk lokasi dropoff
const dropoffLocations = [
  {
    id: '1',
    name: 'DimExpress Center - Sudirman',
    address: 'Jl. Jenderal Sudirman No. 12, Jakarta Pusat',
    distance: '1.2 km',
    hours: 'Buka: 08:00 - 20:00',
    coordinate: { latitude: -6.2088, longitude: 106.8456 },
  },
  {
    id: '2',
    name: 'Agen Mitra - Kelapa Gading',
    address: 'Jl. Boulevard Raya No. 45, Jakarta Utara',
    distance: '3.5 km',
    hours: 'Buka: 09:00 - 18:00',
    coordinate: { latitude: -6.1589, longitude: 106.9079 },
  },
  {
    id: '3',
    name: 'Drop Point - Mall Taman Anggrek',
    address: 'Lt. 2, Jl. Letjen S. Parman, Jakarta Barat',
    distance: '5.1 km',
    hours: 'Buka: 10:00 - 21:00',
    coordinate: { latitude: -6.1783, longitude: 106.7924 },
  },
];

// 2. Tentukan lokasi awal peta
const initialRegion = {
  latitude: -6.2088, // Jakarta sebagai pusat
  longitude: 106.8456,
  latitudeDelta: 0.15, // Zoom level
  longitudeDelta: 0.15, // Zoom level
};

const DropoffScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cari Drop Point</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7F8C8D" style={styles.searchIcon} />
        <TextInput
          placeholder="Cari nama lokasi atau kota"
          style={styles.searchInput}
          placeholderTextColor="#A0A0A0"
        />
      </View>

      {/* Kontainer untuk Peta dan Tombol */}
      <View style={styles.mapContainer}>
        <MapView style={styles.mapView} initialRegion={initialRegion}>
          {/* Tambahkan Marker untuk setiap lokasi */}
          {dropoffLocations.map(location => (
            <Marker
              key={location.id}
              coordinate={location.coordinate}
              title={location.name}
              description={location.address}
            />
          ))}
        </MapView>
        {/* Tombol ini sekarang berada di luar MapView, tetapi di dalam kontainer yang sama */}
        <TouchableOpacity style={styles.centerMapButton}>
          <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Location List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.listTitle}>Lokasi Terdekat</Text>
        {dropoffLocations.map(location => (
          <View key={location.id} style={styles.locationCard}>
            <View style={styles.locationIcon}>
              <Ionicons name="business" size={24} color="#FF6B00" />
            </View>
            <View style={styles.locationDetails}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationAddress}>{location.address}</Text>
              <Text style={styles.locationHours}>{location.hours}</Text>
            </View>
            <View style={styles.locationDistance}>
              <Text style={styles.distanceText}>{location.distance}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F0' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#2C3E50', paddingHorizontal: 15, paddingVertical: 15, paddingTop: 20,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#E0E0E0',
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 14, fontSize: 16, color: '#2C3E50' },
  mapContainer: {
    height: 200, // Tetapkan tinggi untuk kontainer
  },
  mapView: { ...StyleSheet.absoluteFillObject }, // Buat peta mengisi seluruh kontainer
  centerMapButton: {
    position: 'absolute', bottom: 15, right: 15,
    backgroundColor: '#2C3E50', borderRadius: 25, padding: 10, elevation: 4,
  },
  scrollContainer: { padding: 15 },
  listTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  locationCard: {
    flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 12,
    padding: 15, marginBottom: 15, elevation: 2, alignItems: 'center',
  },
  locationIcon: {
    backgroundColor: '#FFF0E6', borderRadius: 25, width: 50, height: 50,
    justifyContent: 'center', alignItems: 'center', marginRight: 15,
  },
  locationDetails: { flex: 1 },
  locationName: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  locationAddress: { fontSize: 14, color: '#7F8C8D', marginTop: 4 },
  locationHours: { fontSize: 12, color: '#27AE60', marginTop: 6, fontWeight: '600' },
  locationDistance: { alignItems: 'flex-end', marginLeft: 10 },
  distanceText: { fontSize: 14, fontWeight: 'bold', color: '#FF6B00' },
});

export default DropoffScreen;