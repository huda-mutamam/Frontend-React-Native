import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Data dummy untuk metode pembayaran
const paymentMethods = [
  { id: 'gopay', name: 'GoPay', type: 'ewallet', logo: require('../../assets/gopay.png'), size: { width: 80, height: 80 }, style: { /* Margin, dll. */ } },
  { id: 'ovo', name: 'OVO', type: 'ewallet', logo: require('../../assets/ovo.png'), size: { width: 80, height: 60 }, style: { /* Margin, dll. */ } },
  { id: 'dana', name: 'DANA', type: 'ewallet', logo: require('../../assets/dana.png'), size: { width: 80, height: 80 }, style: { /* Margin, dll. */ } },
  { id: 'mandiri', name: 'Mandiri', type: 'va', logo: require('../../assets/mandiri.png'), size: { width: 90, height: 90 }, style: { /* Margin, dll. */ } },
  { id: 'bca', name: 'BCA', type: 'va', logo: require('../../assets/BCA.png'), size: { width: 80, height: 80 }, style: { /* Margin, dll. */ } },
];

const PaymentScreen = ({ route, navigation }) => {
  // Ambil total tagihan dari parameter navigasi, berikan nilai default jika tidak ada
  const { total = '0', orderId = 'N/A', successScreen = 'PaymentSuccessScreen' } = route.params || {};

  // Normalisasi nilai 'total' untuk menghapus format ribuan
  const normalizedTotal = String(total).replace(/\./g, '');

  const handlePayment = (method) => {
    // Gunakan nilai total yang sudah dinormalisasi
    const paymentData = { paymentMethod: method, total: normalizedTotal, orderId, successScreen };

    if (method.type === 'ewallet') {
      navigation.navigate('EwalletPaymentScreen', paymentData);
    } else if (method.type === 'va') {
      navigation.navigate('VirtualAccountPaymentScreen', paymentData);
    } else {
      // Fallback untuk metode pembayaran lain
      alert(`Metode pembayaran ${method.name} belum didukung.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pilih Pembayaran</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Ringkasan Pesanan</Text>
            {/* Anda bisa menampilkan detail pesanan di sini */}
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total Tagihan</Text>
                <Text style={styles.totalAmount}>Rp {new Intl.NumberFormat('id-ID').format(isNaN(Number(normalizedTotal)) ? 0 : normalizedTotal)}</Text>
            </View>
        </View>

        <Text style={styles.sectionTitle}>Metode Pembayaran</Text>

        {/* Daftar Metode Pembayaran */}
        {paymentMethods.map(method => (
          <TouchableOpacity 
            key={method.id} 
            style={styles.methodCard}
            onPress={() => handlePayment(method)}
          >
            <Image 
              source={method.logo} 
              style={[
                styles.methodLogo,
                { width: method.size.width, height: method.size.height }, // Mengatur lebar dan tinggi
                method.style // Menambahkan style kustom dari data (misal: marginTop, dll)
              ]} 
              resizeMode="contain"
            />
            <View style={styles.arrowContainer}>
              <Ionicons name="chevron-forward" size={20} color="#7F8C8D" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#D32F2F', paddingHorizontal: 15, paddingVertical: 15, paddingTop: 20,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  scrollContainer: { padding: 15 },
  summaryCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 15, marginBottom: 20,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 2,
  },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginBottom: 10 },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 10 },
  totalText: { fontSize: 16, color: '#2C3E50' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#D32F2F' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 80, // Memberikan tinggi yang seragam untuk semua tombol
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 2,
  },
  methodLogo: {
    // Tidak lagi menggunakan flex agar ukuran eksplisit bisa diterapkan
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default PaymentScreen;