import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Komponen untuk setiap baris menu pengaturan
const SettingsItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#34495E" style={styles.menuIcon} />
    <Text style={styles.menuText}>{text}</Text>
    <Ionicons name="chevron-forward-outline" size={22} color="#CED4DA" />
  </TouchableOpacity>
);

// Komponen untuk setiap bagian pengaturan
const SettingsSection = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pengaturan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Bagian Akun */}
        <SettingsSection title="Akun">
          <SettingsItem icon="person-outline" text="Edit Profil" onPress={() => navigation.navigate('EditProfileScreen')} />
          <SettingsItem icon="location-outline" text="Alamat Tersimpan" onPress={() => navigation.navigate('AlamatTersimpanScreen')} />
          <SettingsItem icon="lock-closed-outline" text="Ubah Kata Sandi" onPress={() => navigation.navigate('UbahKataSandiScreen')} />
        </SettingsSection>

        {/* Bagian Notifikasi */}
        <SettingsSection title="Preferensi">
          <SettingsItem icon="notifications-outline" text="Notifikasi" onPress={() => navigation.navigate('NotificationSettingsScreen')} />
          <SettingsItem icon="language-outline" text="Bahasa" onPress={() => navigation.navigate('BahasaScreen')} />
        </SettingsSection>

        {/* Bagian Tentang Aplikasi */}
        <SettingsSection title="Tentang Aplikasi">
          <SettingsItem icon="help-buoy-outline" text="Pusat Bantuan" onPress={() => navigation.navigate('PusatBantuanScreen')} />
          <SettingsItem icon="document-text-outline" text="Syarat & Ketentuan" onPress={() => navigation.navigate('SyaratKetentuanScreen')} />
          <SettingsItem icon="shield-checkmark-outline" text="Kebijakan Privasi" onPress={() => navigation.navigate('KebijakanPrivasiScreen')} />
        </SettingsSection>

        {/* Tombol Keluar */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
          <Ionicons name="log-out-outline" size={22} color="#D32F2F" />
          <Text style={styles.logoutButtonText}>Keluar</Text>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 1,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7F8C8D',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#34495E',
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 10,
    elevation: 1,
  },
  logoutButtonText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default SettingsScreen;