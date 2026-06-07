import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const InputField = ({ label, icon, value, placeholder, keyboardType = 'default' }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputGroup}>
      <Ionicons name={icon} size={20} color="#7F8C8D" style={styles.icon} />
      <TextInput
        style={styles.input}
        defaultValue={value}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

const EditProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profil</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Image
            source={{ uri: 'https://i.imgur.com/8v4Hw2j.png' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.changeAvatarButton}>
            <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <InputField
            label="Nama Lengkap"
            icon="person-outline"
            value="Dimas Ulinuha"
            placeholder="Masukkan nama lengkap Anda"
          />
          <InputField
            label="Email"
            icon="mail-outline"
            value="dimas.ulinuha@example.com"
            placeholder="Masukkan email Anda"
            keyboardType="email-address"
          />
          <InputField
            label="Nomor Telepon"
            icon="call-outline"
            value="081234567890"
            placeholder="Masukkan nomor telepon Anda"
            keyboardType="phone-pad"
          />
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => {
          alert('Perubahan disimpan!');
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
  scrollContainer: { padding: 20 },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  avatar: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 4, borderColor: '#FF6B00',
  },
  changeAvatarButton: {
    position: 'absolute',
    bottom: 0, right: '35%',
    backgroundColor: '#2C3E50',
    width: 36, height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  formSection: {},
  inputContainer: { marginBottom: 20 },
  label: {
    fontSize: 14, color: '#2C3E50',
    marginBottom: 8, fontWeight: '600',
  },
  inputGroup: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 12,
    paddingHorizontal: 15, elevation: 1,
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1, paddingVertical: 14,
    fontSize: 16, color: '#2C3E50',
  },
  footer: {
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
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

export default EditProfileScreen;