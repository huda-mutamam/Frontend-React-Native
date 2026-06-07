import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const PelacakanInternasionalScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lacak Internasional</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Hero Section */}
        <ImageBackground
          source={{ uri: 'https://i.imgur.com/5uV2TzC.png' }} // Placeholder gambar peta dunia
          style={styles.heroCard}
          imageStyle={{ borderRadius: 12, opacity: 0.3 }}
        >
          <Ionicons name="earth" size={40} color="#FFFFFF" />
          <Text style={styles.heroTitle}>Lacak Kiriman Global Anda</Text>
          <Text style={styles.heroSubtitle}>Masukkan nomor resi internasional di bawah ini.</Text>
        </ImageBackground>

        {/* Input Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Masukkan Nomor Resi</Text>
          <View style={styles.inputGroup}>
            <Ionicons name="barcode-outline" size={22} color="#7F8C8D" style={styles.icon} />
            <TextInput
              placeholder="Contoh: INT123456789"
              style={styles.input}
              placeholderTextColor="#A0A0A0"
            />
          </View>
          <TouchableOpacity style={styles.trackButton}>
            <Text style={styles.trackButtonText}>Lacak Paket</Text>
          </TouchableOpacity>
        </View>

        {/* Result Section (Placeholder) */}
        <View style={styles.resultContainer}>
          <Ionicons name="map-outline" size={80} color="#CED4DA" />
          <Text style={styles.emptyText}>Status pelacakan akan muncul di sini</Text>
        </View>
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
  scrollContainer: { padding: 15 },
  heroCard: {
    backgroundColor: '#004A7F',
    borderRadius: 12, padding: 25, marginBottom: 15, elevation: 3,
    alignItems: 'center',
  },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 },
  heroSubtitle: { fontSize: 14, color: '#ECF0F1', marginTop: 4 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20,
    marginBottom: 15, elevation: 2,
  },
  cardTitle: {
    fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15,
  },
  inputGroup: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA',
    borderRadius: 8, paddingHorizontal: 10,
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1, paddingVertical: 14, fontSize: 16, color: '#2C3E50',
  },
  trackButton: {
    backgroundColor: '#FF6B00', borderRadius: 8, paddingVertical: 14,
    alignItems: 'center', marginTop: 15,
  },
  trackButtonText: {
    color: '#FFFFFF', fontSize: 16, fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20, alignItems: 'center', padding: 20,
  },
  emptyText: {
    fontSize: 16, color: '#7F8C8D', marginTop: 16, textAlign: 'center',
  },
});

export default PelacakanInternasionalScreen;