import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Data dummy untuk alamat tersimpan
const savedAddresses = [
  {
    id: '1',
    label: 'Rumah',
    icon: 'home-outline',
    address: 'Jl. Cendrawasih No. 123, Komplek Griya Indah, Jakarta Selatan, 12345',
    recipient: 'Dimas Ulinuha',
    phone: '081234567890',
  },
  {
    id: '2',
    label: 'Kantor',
    icon: 'briefcase-outline',
    address: 'Gedung Cyber Tower, Lt. 10, Jl. HR Rasuna Said, Jakarta Selatan, 12950',
    recipient: 'Dimas (Kantor)',
    phone: '089876543210',
  },
];

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="map-outline" size={80} color="#CED4DA" />
    <Text style={styles.emptyText}>Belum Ada Alamat</Text>
    <Text style={styles.emptySubText}>Tambahkan alamat baru untuk mempercepat proses pengiriman Anda.</Text>
  </View>
);

const AddressCard = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={item.icon} size={22} color="#FF6B00" />
        <Text style={styles.cardLabel}>{item.label}</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={20} color="#7F8C8D" />
      </TouchableOpacity>
    </View>
    <View style={styles.cardBody}>
      <Text style={styles.recipientName}>{item.recipient}</Text>
      <Text style={styles.recipientPhone}>{item.phone}</Text>
      <Text style={styles.addressText}>{item.address}</Text>
    </View>
  </View>
);

const AlamatTersimpanScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alamat Tersimpan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {savedAddresses.length === 0 ? (
          <EmptyState />
        ) : (
          savedAddresses.map(addr => <AddressCard key={addr.id} item={addr} />)
        )}
      </ScrollView>

      {/* Tombol Tambah Alamat */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={() => alert('Buka halaman tambah alamat baru')}>
          <Ionicons name="add-circle-outline" size={22} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Tambah Alamat Baru</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2C3E50',
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 15,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 10,
  },
  cardBody: {
    padding: 15,
  },
  recipientName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#34495E',
  },
  recipientPhone: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#34495E',
    marginTop: 8,
    lineHeight: 20,
  },
  footer: {
    padding: 15,
    backgroundColor: '#F0F0F0',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AlamatTersimpanScreen;