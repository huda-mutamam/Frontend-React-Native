import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Data dummy untuk FAQ
const faqCategories = [
  { id: '1', title: 'Pengiriman', icon: 'cube-outline' },
  { id: '2', title: 'Pembayaran', icon: 'wallet-outline' },
  { id: '3', title: 'Akun & Keamanan', icon: 'person-circle-outline' },
  { id: '4', title: 'Voucher & Poin', icon: 'ticket-outline' },
];

const popularTopics = [
  { id: '1', question: 'Bagaimana cara melacak paket saya?' },
  { id: '2', question: 'Berapa lama estimasi pengiriman reguler?' },
  { id: '3', question: 'Mengapa pembayaran saya gagal?' },
  { id: '4', question: 'Bagaimana cara mengubah alamat pengiriman?' },
];

const FaqCategoryItem = ({ item }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <Ionicons name={item.icon} size={28} color="#FF6B00" />
    <Text style={styles.categoryText}>{item.title}</Text>
  </TouchableOpacity>
);

const TopicItem = ({ item }) => (
  <TouchableOpacity style={styles.topicItem}>
    <Text style={styles.topicText}>{item.question}</Text>
    <Ionicons name="chevron-forward-outline" size={20} color="#CED4DA" />
  </TouchableOpacity>
);

const PusatBantuanScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pusat Bantuan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#7F8C8D" style={styles.searchIcon} />
          <TextInput
            placeholder="Cari pertanyaan atau masalah Anda..."
            style={styles.searchInput}
            placeholderTextColor="#A0A0A0"
          />
        </View>

        {/* Kategori Bantuan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategori Bantuan</Text>
          <View style={styles.categoryContainer}>
            {faqCategories.map(item => <FaqCategoryItem key={item.id} item={item} />)}
          </View>
        </View>

        {/* Topik Populer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Topik Populer</Text>
          <View style={styles.topicsContainer}>
            {popularTopics.map(item => <TopicItem key={item.id} item={item} />)}
          </View>
        </View>

        {/* Hubungi Kami */}
        <TouchableOpacity style={styles.contactButton} onPress={() => navigation.navigate('ChatScreen')}>
          <Ionicons name="chatbubbles-outline" size={22} color="#FFFFFF" />
          <Text style={styles.contactButtonText}>Hubungi Customer Service</Text>
        </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2C3E50',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 1,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#34495E',
  },
  topicsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 1,
    overflow: 'hidden',
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  topicText: {
    fontSize: 15,
    color: '#34495E',
    flex: 1,
  },
  contactButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 2,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default PusatBantuanScreen;
