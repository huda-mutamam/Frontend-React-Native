import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const LupaSandiScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lupa Kata Sandi</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Ionicons name="mail-open-outline" size={80} color="#FF6B00" style={{ alignSelf: 'center', marginBottom: 20 }} />
        <Text style={styles.title}>Jangan Khawatir!</Text>
        <Text style={styles.subtitle}>
          Masukkan alamat email yang terdaftar. Kami akan mengirimkan instruksi untuk mengatur ulang kata sandi Anda.
        </Text>

        {/* Form Input Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputGroup}>
            <Ionicons name="mail-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="contoh@email.com"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Tombol Kirim */}
        <TouchableOpacity style={styles.submitButton} onPress={() => {
          alert('Instruksi telah dikirim ke email Anda!');
          navigation.goBack();
        }}>
          <Text style={styles.submitButtonText}>Kirim Instruksi</Text>
        </TouchableOpacity>
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
  scrollContainer: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  title: {
    fontSize: 24, fontWeight: 'bold', color: '#2C3E50', textAlign: 'center',
  },
  subtitle: {
    fontSize: 15, color: '#7F8C8D', textAlign: 'center', marginTop: 10, marginBottom: 30,
  },
  inputContainer: { marginBottom: 20 },
  label: {
    fontSize: 14, color: '#2C3E50', marginBottom: 8, fontWeight: '600',
  },
  inputGroup: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 12, paddingHorizontal: 15, elevation: 1,
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1, paddingVertical: 14, fontSize: 16, color: '#2C3E50',
  },
  submitButton: {
    backgroundColor: '#FF6B00', borderRadius: 12, paddingVertical: 16,
    alignItems: 'center', elevation: 2, marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF', fontSize: 18, fontWeight: 'bold',
  },
});

export default LupaSandiScreen;