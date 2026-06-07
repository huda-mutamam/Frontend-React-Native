import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Data dummy
const unpaidBills = [
  { id: 'INV-001', date: '25 Nov 2025', due: '30 Nov 2025', amount: 'Rp 75.000' },
  { id: 'INV-002', date: '20 Nov 2025', due: '25 Nov 2025', amount: 'Rp 120.000' },
];

const paidBills = [
  { id: 'INV-000', date: '15 Nov 2025', amount: 'Rp 50.000' },
];

const BillCard = ({ bill, isPaid = false, navigation }) => (
  <View style={styles.billCard}>
    <View style={styles.billHeader}>
      <Text style={styles.billId}>{bill.id}</Text>
      <Text style={styles.billDate}>Tgl. Transaksi: {bill.date}</Text>
    </View>
    <View style={styles.billBody}>
      <View>
        <Text style={styles.amountLabel}>Total Tagihan</Text>
        <Text style={styles.billAmount}>{bill.amount}</Text>
      </View>
      {!isPaid ? (
        <TouchableOpacity 
          style={styles.payButton}
          onPress={() => navigation.navigate('PaymentScreen', {
            serviceName: `Tagihan ${bill.id}`,
            total: bill.amount.replace(/[^0-9]/g, ''), // Hanya mengirim angka
            orderId: bill.id,
          })}
        >
          <Text style={styles.payButtonText}>Bayar Sekarang</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.paidStatus}>
          <Ionicons name="checkmark-circle" size={18} color="#27AE60" />
          <Text style={styles.paidText}>Lunas</Text>
        </View>
      )}
    </View>
    {!isPaid && <Text style={styles.dueDate}>Jatuh tempo: {bill.due}</Text>}
  </View>
);

const EmptyState = ({ message }) => (
  <View style={styles.emptyContainer}>
    <Ionicons name="document-text-outline" size={80} color="#CED4DA" />
    <Text style={styles.emptyText}>Tidak Ada Tagihan</Text>
    <Text style={styles.emptySubText}>{message}</Text>
  </View>
);

const TagihanSayaScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Belum Dibayar');

  const renderContent = () => {
    if (activeTab === 'Belum Dibayar') {
      if (unpaidBills.length === 0) return <EmptyState message="Tidak ada tagihan yang perlu dibayar." />;
      return unpaidBills.map(bill => <BillCard key={bill.id} bill={bill} navigation={navigation} />);
    }
    if (activeTab === 'Lunas') {
      if (paidBills.length === 0) return <EmptyState message="Belum ada riwayat tagihan lunas." />;
      return paidBills.map(bill => <BillCard key={bill.id} bill={bill} isPaid navigation={navigation} />);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tagihan Saya</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tab Navigator */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'Belum Dibayar' && styles.activeTab]} onPress={() => setActiveTab('Belum Dibayar')}>
          <Text style={[styles.tabText, activeTab === 'Belum Dibayar' && styles.activeTabText]}>Belum Dibayar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'Lunas' && styles.activeTab]} onPress={() => setActiveTab('Lunas')}>
          <Text style={[styles.tabText, activeTab === 'Lunas' && styles.activeTabText]}>Lunas</Text>
        </TouchableOpacity>
      </View>

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
  tabContainer: { flexDirection: 'row', backgroundColor: '#FFFFFF', elevation: 2 },
  tab: { flex: 1, paddingVertical: 15, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#FF6B00' },
  tabText: { fontSize: 16, color: '#7F8C8D', fontWeight: '600' },
  activeTabText: { color: '#FF6B00', fontWeight: 'bold' },
  scrollContainer: { padding: 15, flexGrow: 1 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginTop: 16 },
  emptySubText: { fontSize: 14, color: '#7F8C8D', textAlign: 'center', marginTop: 8 },
  billCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 15,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 2,
  },
  billHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  billId: { fontWeight: 'bold', color: '#2C3E50' },
  billDate: { fontSize: 12, color: '#7F8C8D' },
  billBody: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 15,
  },
  amountLabel: { fontSize: 14, color: '#7F8C8D' },
  billAmount: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50', marginTop: 4 },
  payButton: { backgroundColor: '#FF6B00', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 15 },
  payButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  paidStatus: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 },
  paidText: { color: '#27AE60', fontWeight: 'bold', marginLeft: 5 },
  dueDate: {
    paddingHorizontal: 15, paddingBottom: 15, fontSize: 12, color: '#E74C3C',
  },
});

export default TagihanSayaScreen;