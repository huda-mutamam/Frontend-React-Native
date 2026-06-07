import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const EwalletPaymentScreen = ({ route, navigation }) => {
  // Ambil data dari parameter navigasi
  const { paymentMethod, total, orderId, successScreen } = route.params;

  // Fungsi untuk memformat angka menjadi format mata uang Rupiah
  const formatCurrency = (amount) => {
    return `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;
  };

  const handleConfirmPayment = () => {
    // Navigasi ke halaman sukses yang sesuai dengan membawa parameter
    navigation.replace(successScreen, {
      orderId,
      total: new Intl.NumberFormat('id-ID').format(total),
      serviceName: `Layanan untuk ${orderId}`, // Anda bisa sesuaikan ini
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pembayaran {paymentMethod.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Detail Pembayaran */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Detail Pembayaran</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Metode</Text>
            <Image source={paymentMethod.logo} style={{ width: paymentMethod.size.width, height: paymentMethod.size.height }} resizeMode="contain" />
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ID Pesanan</Text>
            <Text style={styles.detailValue}>{orderId}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Tagihan</Text>
            <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
          </View>
        </View>

        {/* Instruksi Pembayaran */}
        <View style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>Instruksi Pembayaran</Text>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1.</Text>
            <Text style={styles.stepText}>Buka aplikasi {paymentMethod.name} Anda.</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2.</Text>
            <Text style={styles.stepText}>Pastikan saldo Anda mencukupi.</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3.</Text>
            <Text style={styles.stepText}>Klik tombol "Konfirmasi Pembayaran" di bawah ini.</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>4.</Text>
            <Text style={styles.stepText}>Anda akan diarahkan ke aplikasi {paymentMethod.name} untuk menyelesaikan pembayaran.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Tombol Aksi di Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
          <Text style={styles.confirmButtonText}>Konfirmasi Pembayaran</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F0' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#D32F2F', paddingHorizontal: 15, paddingVertical: 15, paddingTop: 20,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  scrollContainer: { padding: 15 },
  summaryCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20,
    marginBottom: 15, elevation: 2,
  },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  detailLabel: { fontSize: 16, color: '#7F8C8D' },
  detailValue: { fontSize: 16, color: '#2C3E50', fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  totalLabel: { fontSize: 18, color: '#2C3E50', fontWeight: 'bold' },
  totalAmount: { fontSize: 20, color: '#D32F2F', fontWeight: 'bold' },
  instructionCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20,
    marginBottom: 15, elevation: 2,
  },
  instructionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  step: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  stepNumber: { fontSize: 15, color: '#2C3E50', fontWeight: 'bold', marginRight: 8 },
  stepText: { fontSize: 15, color: '#34495E', flex: 1, lineHeight: 22 },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  confirmButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EwalletPaymentScreen;