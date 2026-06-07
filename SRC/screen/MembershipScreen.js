import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Data dummy untuk tingkatan keanggotaan
const membershipTiers = [
  {
    level: 'Bronze',
    points: '0 - 999 Poin',
    icon: 'medal',
    color: '#CD7F32',
    benefits: [
      'Voucher diskon pengiriman untuk pengguna baru',
      'Akses ke layanan pelanggan standar',
    ],
  },
  {
    level: 'Silver',
    points: '1.000 - 4.999 Poin',
    icon: 'medal',
    color: '#C0C0C0',
    benefits: [
      'Voucher diskon ongkir bulanan',
      'Prioritas layanan pelanggan',
      'Bonus poin di hari ulang tahun',
    ],
  },
  {
    level: 'Gold',
    points: '5.000+ Poin',
    icon: 'trophy',
    color: '#FFD700',
    benefits: [
      'Voucher gratis ongkir bulanan',
      'Layanan pelanggan prioritas 24/7',
      'Cashback poin untuk setiap transaksi',
    ],
  },
];

const MembershipScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grup</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Kartu Status Pengguna */}
        <View style={styles.statusCard}>
          <View style={styles.profileInfo}>
            <Image source={{ uri: 'https://i.imgur.com/8v4Hw2j.png' }} style={styles.avatar} />
            <View>
              <Text style={styles.profileName}>Dimas Ulinuha</Text>
              <View style={styles.levelBadge}>
                <Ionicons name="medal" size={16} color="#CD7F32" />
                <Text style={styles.levelText}>Bronze Member</Text>
              </View>
            </View>
          </View>
          <View style={styles.pointsSection}>
            <Text style={styles.pointsLabel}>Poin Anda</Text>
            <Text style={styles.pointsValue}>0 Poin</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.progressLabel}>Kumpulkan 1.000 poin lagi untuk mencapai level Silver</Text>
        </View>

        {/* Daftar Tingkatan Keanggotaan */}
        <Text style={styles.sectionTitle}>Tingkatan Keanggotaan</Text>
        {membershipTiers.map((tier, index) => (
          <View key={index} style={[styles.tierCard, { borderLeftColor: tier.color }]}>
            <View style={styles.tierHeader}>
              <Ionicons name={tier.icon} size={28} color={tier.color} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.tierLevel}>{tier.level}</Text>
                <Text style={styles.tierPoints}>{tier.points}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <Text style={styles.benefitTitle}>Keuntungan:</Text>
            {tier.benefits.map((benefit, i) => (
              <View key={i} style={styles.benefitItem}>
                <Ionicons name="checkmark-circle-outline" size={18} color="#27AE60" />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        ))}
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
    padding: 15,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  levelText: {
    marginLeft: 5,
    color: '#CD7F32',
    fontWeight: '600',
  },
  pointsSection: {
    marginTop: 15,
    alignItems: 'flex-start',
  },
  pointsLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  pointsValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  progressBarBackground: {
    width: '100%', height: 8, backgroundColor: '#E0E0E0',
    borderRadius: 4, marginTop: 20,
  },
  progressBarFill: { width: '0%', height: '100%', backgroundColor: '#CD7F32', borderRadius: 4 },
  progressLabel: { fontSize: 12, color: '#7F8C8D', marginTop: 8 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  tierCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    borderLeftWidth: 5,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierLevel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  tierPoints: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 15,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#34495E',
    flex: 1,
  },
});

export default MembershipScreen;