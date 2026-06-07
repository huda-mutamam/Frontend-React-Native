import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Clipboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const VirtualAccountPaymentScreen = ({ route, navigation }) => {
  // Ambil data dari parameter navigasi
  const { paymentMethod, total, orderId, successScreen } = route.params;

  // Buat nomor Virtual Account dummy
  const vaNumber = `8808${orderId.replace(/[^0-9]/g, '').slice(-8)}`;

  // Fungsi untuk memformat angka menjadi format mata uang Rupiah
  const formatCurrency = (amount) => {
    return `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;
  };

  const handleCopy = (text) => {
    Clipboard.setString(String(text)); // Pastikan selalu string
    alert(`"${text}" telah disalin ke clipboard.`);
  };

  const handleFinishPayment = () => {
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
          <Text style={styles.summaryTitle}>Selesaikan Pembayaran Sebelum</Text>
          <Text style={styles.countdown}>23:59:59</Text>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank Tujuan</Text>
            <Image source={paymentMethod.logo} style={{ width: paymentMethod.size.width, height: paymentMethod.size.height }} resizeMode="contain" />
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nomor Virtual Account</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.detailValue}>{vaNumber}</Text>
              <TouchableOpacity onPress={() => handleCopy(vaNumber)} style={{ marginLeft: 10 }}>
                <Ionicons name="copy-outline" size={20} color="#FF6B00" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Tagihan</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
              <TouchableOpacity onPress={() => handleCopy(total)} style={{ marginLeft: 10 }}>
                <Ionicons name="copy-outline" size={20} color="#FF6B00" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Instruksi Pembayaran */}
        <View style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>Cara Pembayaran</Text>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1.</Text>
            <Text style={styles.stepText}>Buka aplikasi Mobile Banking atau ATM {paymentMethod.name}.</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2.</Text>
            <Text style={styles.stepText}>Pilih menu Transfer, lalu pilih Virtual Account.</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3.</Text>
            <Text style={styles.stepText}>Masukkan nomor Virtual Account di atas.</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>4.</Text>
            <Text style={styles.stepText}>Pastikan total tagihan sudah sesuai, lalu konfirmasi pembayaran.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Tombol Aksi di Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleFinishPayment}>
          <Text style={styles.confirmButtonText}>Saya Sudah Bayar</Text>
        </TouchableOpacity>
      </View>
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
  scrollContainer: { padding: 15 },
  summaryCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20,
    marginBottom: 15, elevation: 2, alignItems: 'center',
  },
  summaryTitle: { fontSize: 16, color: '#7F8C8D' },
  countdown: { fontSize: 24, fontWeight: 'bold', color: '#D32F2F', marginVertical: 8 },
  divider: { width: '100%', height: 1, backgroundColor: '#E0E0E0', marginVertical: 15 },
  detailRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  detailLabel: { fontSize: 16, color: '#7F8C8D' },
  detailValue: { fontSize: 16, color: '#2C3E50', fontWeight: 'bold' },
  totalAmount: { fontSize: 18, color: '#2C3E50', fontWeight: 'bold' },
  instructionCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20,
    marginBottom: 15, elevation: 2,
  },
  instructionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  step: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
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

export default VirtualAccountPaymentScreen;