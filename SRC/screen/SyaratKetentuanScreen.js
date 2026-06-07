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

const SyaratKetentuanScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Syarat & Ketentuan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.lastUpdated}>Terakhir diperbarui: 1 Desember 2025</Text>

        <Section title="1. Pendahuluan">
          Selamat datang di DimExspres. Dengan menggunakan layanan kami, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Mohon baca dengan saksama.
        </Section>

        <Section title="2. Penggunaan Layanan">
          Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah dan sesuai dengan hukum yang berlaku. Anda bertanggung jawab penuh atas informasi yang Anda berikan, termasuk alamat pengirim, alamat penerima, dan detail barang.
        </Section>

        <Section title="3. Barang yang Dilarang">
          Anda dilarang mengirimkan barang-barang ilegal, berbahaya, mudah terbakar, atau barang lain yang dilarang oleh peraturan perundang-undangan. Kami berhak menolak atau menghentikan pengiriman jika kami mencurigai adanya pelanggaran.
        </Section>

        <Section title="4. Tanggung Jawab dan Ganti Rugi">
          Tanggung jawab kami atas kehilangan atau kerusakan paket terbatas pada nilai yang ditentukan dalam polis asuransi (jika ada) atau sesuai dengan kebijakan standar kami. Kami tidak bertanggung jawab atas kerugian tidak langsung atau konsekuensial.
        </Section>

        <Section title="5. Perubahan Ketentuan">
          Kami dapat mengubah Syarat & Ketentuan ini dari waktu ke waktu. Perubahan akan diinformasikan melalui aplikasi atau email. Dengan terus menggunakan layanan setelah perubahan, Anda dianggap menyetujui ketentuan yang baru.
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

export default SyaratKetentuanScreen;