import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PaymentSuccessScreen = ({ route, navigation }) => {
  // Ambil data dari parameter navigasi, berikan nilai default jika tidak ada
  const { serviceName = 'Layanan', total = '0', orderId = 'N/A' } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.successContainer}>
          {/* Ikon utama */}
          <View style={styles.iconBackground}>
            <Ionicons name="checkmark-done-circle" size={80} color="#FFFFFF" />
          </View>
          <Text style={styles.successTitle}>Pembayaran Berhasil!</Text>
          <Text style={styles.successSubtitle}>
            Pesanan Anda untuk layanan {serviceName} telah kami terima dan akan segera diproses.
          </Text>
        </View>

        {/* Kartu Detail Pesanan */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Rincian Transaksi</Text>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="barcode-scan" size={22} color="#7F8C8D" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>ID Pesanan</Text>
              <Text style={styles.detailValue}>{orderId}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="wallet-outline" size={22} color="#7F8C8D" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Total Pembayaran</Text>
              <Text style={styles.detailValue}>Rp {total}</Text>
            </View>
          </View>
        </View>

        {/* Tombol Aksi */}
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('OrderScreen')}>
          <Text style={styles.primaryButtonText}>Lacak Pesanan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.replace('Home')}>
          <Text style={styles.secondaryButtonText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#27AE60', // Warna hijau untuk sukses
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  detailsCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  detailTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  detailValue: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
    marginTop: 2,
  },
  primaryButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#7F8C8D',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentSuccessScreen;