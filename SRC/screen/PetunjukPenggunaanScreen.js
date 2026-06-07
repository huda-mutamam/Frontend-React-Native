import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Komponen untuk setiap item panduan
const GuideItem = ({ icon, title, steps }) => (
  <View style={styles.guideItem}>
    <View style={styles.guideHeader}>
      <Ionicons name={icon} size={24} color="#FF6B00" />
      <Text style={styles.guideTitle}>{title}</Text>
    </View>
    <View style={styles.guideContent}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <Text style={styles.stepNumber}>{`${index + 1}.`}</Text>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  </View>
);

const PetunjukPenggunaanScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Petunjuk Penggunaan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.introText}>
          Temukan cara mudah menggunakan aplikasi DimExspres untuk semua kebutuhan pengiriman Anda.
        </Text>

        <GuideItem
          icon="search-outline"
          title="Melacak Paket Anda"
          steps={[
            'Masukkan nomor resi pada kolom pencarian di halaman Beranda.',
            'Tekan tombol cari atau ikon barcode untuk memindai.',
            'Status dan riwayat perjalanan paket Anda akan ditampilkan.',
          ]}
        />

        <GuideItem
          icon="cube-outline"
          title="Membuat Pesanan Pengiriman"
          steps={[
            'Pilih salah satu layanan pengiriman di halaman Beranda (misal: Reguler, Sameday).',
            'Isi detail alamat pengirim, penerima, dan informasi barang.',
            'Lanjutkan ke halaman pembayaran dan pilih metode yang Anda inginkan.',
          ]}
        />

        <GuideItem
          icon="calendar-outline"
          title="Menjadwalkan Penjemputan (Pickup)"
          steps={[
            'Pilih menu "Pickup" di halaman Beranda.',
            'Isi alamat penjemputan, detail paket, dan tentukan jadwal.',
            'Konfirmasi pesanan dan kurir akan datang sesuai jadwal.',
          ]}
        />

        <GuideItem
          icon="ticket-outline"
          title="Menggunakan Voucher"
          steps={[
            'Buka menu "Voucher Saya" dari halaman Beranda.',
            'Pilih voucher yang ingin digunakan dan tekan "Gunakan".',
            'Voucher akan otomatis diterapkan pada transaksi Anda berikutnya.',
          ]}
        />
      </ScrollView>
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
    padding: 20,
  },
  introText: {
    fontSize: 15,
    color: '#34495E',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  guideItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 10,
    marginBottom: 10,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 12,
  },
  guideContent: {},
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepNumber: { fontSize: 15, color: '#7F8C8D', marginRight: 8, fontWeight: 'bold' },
  stepText: { fontSize: 15, color: '#34495E', flex: 1, lineHeight: 22 },
});

export default PetunjukPenggunaanScreen;