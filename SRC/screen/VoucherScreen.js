import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Data dummy untuk voucher
const availableVouchers = [
  {
    id: '1',
    icon: 'sale',
    title: 'Diskon Ongkir 20%',
    description: 'Maks. diskon Rp10.000 untuk layanan Reguler.',
    expiry: 'Berlaku hingga 30 Des 2025',
  },
  {
    id: '2',
    icon: 'cash-refund',
    title: 'Cashback 5.000 Poin',
    description: 'Min. transaksi Rp50.000 untuk semua layanan.',
    expiry: 'Berlaku hingga 15 Jan 2026',
  },
  {
    id: '4',
    icon: 'truck-fast',
    title: 'Gratis Ongkir Next Day',
    description: 'Khusus pengiriman antarkota di Pulau Jawa.',
    expiry: 'Berlaku hingga 05 Feb 2026',
  },
];

const historyVouchers = [
  {
    id: '3',
    icon: 'sale',
    title: 'Diskon Ongkir Gratis',
    description: 'Tanpa minimum transaksi.',
    status: 'Digunakan',
  },
  {
    id: '5',
    icon: 'timer-off',
    title: 'Cashback 10.000 Poin',
    description: 'Min. transaksi Rp100.000.',
    status: 'Kedaluwarsa',
  },
];

// Komponen untuk setiap kartu voucher
const VoucherCard = ({ voucher, isUsed = false }) => (
  <View style={[styles.voucherCard, isUsed && styles.usedVoucherCard]}>
    {/* Efek potongan tiket */}
    <View style={styles.cutout} />
    <View style={styles.voucherIconContainer}>
      <MaterialCommunityIcons name={voucher.icon} size={32} color={isUsed ? '#A0A0A0' : '#FF6B00'} />
    </View>
    <View style={styles.voucherDetails}>
      <Text style={[styles.voucherTitle, isUsed && styles.usedText]}>{voucher.title}</Text>
      <Text style={[styles.voucherDesc, isUsed && styles.usedText]}>{voucher.description}</Text>
      <View style={styles.voucherFooter}>
        <Text style={[styles.voucherExpiry, isUsed && styles.usedText]}>
          {isUsed ? `Status: ${voucher.status}` : voucher.expiry}
        </Text>
        <TouchableOpacity onPress={() => alert('Syarat dan ketentuan berlaku.')}>
          <Text style={styles.tncText}>S&K</Text>
        </TouchableOpacity>
      </View>
    </View>
    {!isUsed && (
      <TouchableOpacity style={styles.useButton}>
        <Text style={styles.useButtonText}>Gunakan</Text>
      </TouchableOpacity>
    )}
  </View>
);

const VoucherScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Tersedia');

  const renderContent = () => {
    if (activeTab === 'Tersedia') {
      if (availableVouchers.length === 0) {
        return (
          <View style={styles.emptyContainer}>
            <Ionicons name="ticket-outline" size={80} color="#CED4DA" />
            <Text style={styles.emptyText}>Belum Ada Voucher</Text>
            <Text style={styles.emptySubText}>Voucher yang bisa Anda gunakan akan muncul di sini.</Text>
          </View>
        );
      }
      return availableVouchers.map(voucher => <VoucherCard key={voucher.id} voucher={voucher} />);
    }

    if (activeTab === 'Riwayat') {
      if (historyVouchers.length === 0) {
        return (
          <View style={styles.emptyContainer}>
            <Ionicons name="archive-outline" size={80} color="#CED4DA" />
            <Text style={styles.emptyText}>Tidak Ada Riwayat</Text>
            <Text style={styles.emptySubText}>Voucher yang sudah digunakan atau kedaluwarsa akan muncul di sini.</Text>
          </View>
        );
      }
      return historyVouchers.map(voucher => <VoucherCard key={voucher.id} voucher={voucher} isUsed />);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voucher Saya</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Input Kode Voucher */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Masukkan kode voucher"
          style={styles.input}
          placeholderTextColor="#A0A0A0"
        />
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Gunakan</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigator */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Tersedia' && styles.activeTab]}
          onPress={() => setActiveTab('Tersedia')}
        >
          <Text style={[styles.tabText, activeTab === 'Tersedia' && styles.activeTabText]}>
            Tersedia
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Riwayat' && styles.activeTab]}
          onPress={() => setActiveTab('Riwayat')}
        >
          <Text style={[styles.tabText, activeTab === 'Riwayat' && styles.activeTabText]}>
            Riwayat
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderContent()}
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
  inputContainer: {
    flexDirection: 'row', padding: 15, backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#E0E0E0',
  },
  input: {
    flex: 1, backgroundColor: '#F0F0F0', borderRadius: 8,
    paddingHorizontal: 15, fontSize: 16, color: '#2C3E50',
  },
  applyButton: {
    marginLeft: 10, backgroundColor: '#FF6B00', borderRadius: 8,
    justifyContent: 'center', paddingHorizontal: 15,
  },
  applyButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#FFFFFF', elevation: 2 },
  tab: {
    flex: 1, paddingVertical: 15, alignItems: 'center',
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomColor: '#FF6B00' },
  tabText: { fontSize: 16, color: '#7F8C8D', fontWeight: '600' },
  activeTabText: { color: '#FF6B00', fontWeight: 'bold' },
  scrollContainer: { padding: 15, flexGrow: 1 },
  emptyContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  emptyText: {
    fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginTop: 16,
  },
  emptySubText: {
    fontSize: 14, color: '#7F8C8D', textAlign: 'center', marginTop: 8, paddingHorizontal: 20,
  },
  voucherCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12, flexDirection: 'row',
    marginBottom: 15, elevation: 2, overflow: 'hidden',
    position: 'relative',
  },
  usedVoucherCard: { backgroundColor: '#F8F9FA' },
  cutout: {
    position: 'absolute',
    left: 80, // Sesuaikan dengan posisi border dashed
    top: '50%',
    marginTop: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F0F0F0', // Warna background utama
  },
  voucherIconContainer: {
    padding: 20,
    borderStyle: 'dashed',
    justifyContent: 'center',
  },
  voucherDetails: { flex: 1, padding: 15 },
  voucherTitle: {
    fontSize: 16, fontWeight: 'bold', color: '#2C3E50',
  },
  voucherDesc: {
    fontSize: 13, color: '#7F8C8D', marginTop: 4,
  },
  voucherExpiry: {
    fontSize: 12, color: '#27AE60', fontWeight: '600',
  },
  usedText: { color: '#A0A0A0' },
  voucherFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 12,
  },
  tncText: {
    fontSize: 12, color: '#3498DB', fontWeight: 'bold', textDecorationLine: 'underline',
  },
  useButton: {
    backgroundColor: '#FF6B00', justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 12,
  },
  useButtonText: {
    color: '#FFFFFF', fontWeight: 'bold', fontSize: 14,
  },
});

export default VoucherScreen;