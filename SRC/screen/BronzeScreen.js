import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BronzeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bronze</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Kartu Status */}
        <View style={styles.statusCard}>
          <Ionicons name="medal" size={60} color="#CD7F32" />
          <Text style={styles.levelText}>Level Bronze</Text>
          <Text style={styles.pointsText}>0 Poin</Text>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.progressLabel}>Kumpulkan 1000 poin untuk mencapai level Silver</Text>
        </View>

        {/* Kartu Keuntungan */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Keuntungan Level Bronze</Text>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={22} color="#27AE60" />
            <Text style={styles.benefitText}>Voucher diskon pengiriman untuk pengguna baru.</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={22} color="#27AE60" />
            <Text style={styles.benefitText}>Akses ke layanan pelanggan standar.</Text>
          </View>
        </View>

        {/* Kartu Cara Mendapatkan Poin */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cara Mendapatkan Poin</Text>
          <View style={styles.benefitItem}>
            <Ionicons name="cube-outline" size={22} color="#2C3E50" />
            <Text style={styles.benefitText}>Setiap pengiriman akan mendapatkan poin.</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="star-outline" size={22} color="#2C3E50" />
            <Text style={styles.benefitText}>Ikuti promo dan event spesial untuk poin bonus.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F0' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#2C3E50', paddingHorizontal: 15, paddingVertical: 15, paddingTop: 20, // Ini adalah pemilik dari style header
  },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  scrollContainer: { padding: 15 },
  statusCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 15, // Style untuk kartu status
    alignItems: 'center', elevation: 2,
  },
  levelText: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', marginTop: 10 },
  pointsText: { fontSize: 16, color: '#7F8C8D', marginTop: 4 },
  progressBarBackground: {
    width: '100%', height: 8, backgroundColor: '#E0E0E0',
    borderRadius: 4, marginTop: 20,
  },
  progressBarFill: { width: '0%', height: '100%', backgroundColor: '#CD7F32', borderRadius: 4 },
  progressLabel: { fontSize: 12, color: '#7F8C8D', marginTop: 8 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20,
    marginBottom: 15, elevation: 2,
  },
  cardTitle: {
    fontSize: 18, fontWeight: 'bold', color: '#2C3E50',
    marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 10,
  },
  benefitItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  benefitText: { fontSize: 15, color: '#34495E', marginLeft: 10, flex: 1 },
});

export default BronzeScreen;