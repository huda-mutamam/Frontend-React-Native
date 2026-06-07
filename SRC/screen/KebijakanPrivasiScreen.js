import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionContent}>{children}</Text>
  </View>
);

const KebijakanPrivasiScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kebijakan Privasi</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.lastUpdated}>Terakhir diperbarui: 1 Desember 2025</Text>

        <Section title="1. Informasi yang Kami Kumpulkan">
          Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti nama, alamat email, nomor telepon, dan alamat pengiriman. Kami juga mengumpulkan data secara otomatis saat Anda menggunakan layanan kami, termasuk informasi perangkat, lokasi, dan data penggunaan.
        </Section>

        <Section title="2. Bagaimana Kami Menggunakan Informasi Anda">
          Informasi Anda digunakan untuk menyediakan dan meningkatkan layanan kami, memproses transaksi, berkomunikasi dengan Anda, serta untuk tujuan keamanan dan pencegahan penipuan.
        </Section>

        <Section title="3. Berbagi Informasi">
          Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum atau untuk menyediakan layanan (misalnya, berbagi alamat dengan kurir).
        </Section>

        <Section title="4. Keamanan Data">
          Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi informasi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Namun, tidak ada sistem keamanan yang sepenuhnya aman.
        </Section>

        <Section title="5. Hak Anda">
          Anda memiliki hak untuk mengakses, memperbaiki, atau menghapus informasi pribadi Anda. Silakan hubungi kami melalui Pusat Bantuan untuk mengajukan permintaan.
        </Section>
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
  lastUpdated: {
    fontSize: 12,
    color: '#7F8C8D',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 15,
    color: '#34495E',
    lineHeight: 22,
  },
});

export default KebijakanPrivasiScreen;