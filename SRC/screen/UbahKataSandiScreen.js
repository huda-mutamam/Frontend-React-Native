import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const InputField = ({ label, icon, placeholder }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputGroup}>
      <Ionicons name={icon} size={20} color="#7F8C8D" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        secureTextEntry
      />
    </View>
  </View>
);

const UbahKataSandiScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ubah Kata Sandi</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Form Section */}
        <View style={styles.formSection}>
          <InputField
            label="Kata Sandi Saat Ini"
            icon="lock-closed-outline"
            placeholder="Masukkan kata sandi Anda saat ini"
          />
          <InputField
            label="Kata Sandi Baru"
            icon="key-outline"
            placeholder="Minimal 8 karakter"
          />
          <InputField
            label="Konfirmasi Kata Sandi Baru"
            icon="key-outline"
            placeholder="Ketik ulang kata sandi baru Anda"
          />
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => {
          alert('Kata sandi berhasil diubah!');
          navigation.goBack();
        }}>
          <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
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
  scrollContainer: { padding: 20, flexGrow: 1 },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  inputContainer: { marginBottom: 20 },
  label: {
    fontSize: 14, color: '#2C3E50',
    marginBottom: 8, fontWeight: '600',
  },
  inputGroup: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F8F9FA', borderRadius: 8,
    paddingHorizontal: 15, borderWidth: 1, borderColor: '#E0E0E0',
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1, paddingVertical: 14,
    fontSize: 16, color: '#2C3E50',
  },
  footer: {
    padding: 15,
    backgroundColor: '#F0F0F0',
  },
  saveButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 2,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UbahKataSandiScreen;