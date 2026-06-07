import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Komponen untuk setiap baris menu
const ProfileMenuItem = ({ icon, text, onPress, isLogout = false }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={[styles.menuIconContainer, isLogout && { backgroundColor: '#FFEBEB' }]}>
      <Ionicons name={icon} size={22} color={isLogout ? '#D32F2F' : '#2C3E50'} />
    </View>
    <Text style={[styles.menuText, isLogout && { color: '#D32F2F' }]}>{text}</Text>
    {!isLogout && <Ionicons name="chevron-forward-outline" size={22} color="#CED4DA" />}
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil Saya</Text>
        {/* Placeholder untuk menyeimbangkan judul di tengah */}
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Info Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://i.imgur.com/8v4Hw2j.png' }} // Placeholder avatar
            style={styles.avatar}
          />
          <Text style={styles.profileName}>Dimas Ulinuha</Text>
          <Text style={styles.profileEmail}>dimas.ulinuha@example.com</Text>
          <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditProfileScreen')}>
            <Text style={styles.editProfileText}>Edit Profil</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <ProfileMenuItem icon="settings-outline" text="Pengaturan" onPress={() => navigation.navigate('SettingsScreen')} />
          <ProfileMenuItem icon="help-buoy-outline" text="Pusat Bantuan" onPress={() => navigation.navigate('PusatBantuanScreen')} />
        </View>

        <View style={styles.menuSection}>
          <ProfileMenuItem icon="document-text-outline" text="Syarat & Ketentuan" onPress={() => navigation.navigate('SyaratKetentuanScreen')} />
          <ProfileMenuItem icon="shield-checkmark-outline" text="Kebijakan Privasi" onPress={() => navigation.navigate('KebijakanPrivasiScreen')} />
          <ProfileMenuItem icon="book-outline" text="Petunjuk Penggunaan" onPress={() => navigation.navigate('PetunjukPenggunaanScreen')} />
        </View>

        {/* Logout Section */}
        <View style={styles.menuSection}>
          <ProfileMenuItem icon="log-out-outline" text="Keluar" onPress={() => navigation.replace('Login')} isLogout />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F0' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2C3E50',
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop: 20,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  scrollContainer: { paddingBottom: 20 },
  profileSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
    marginBottom: 15,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#FF6B00',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 15,
  },
  profileEmail: {
    fontSize: 15,
    color: '#7F8C8D',
    marginTop: 4,
  },
  editProfileButton: {
    marginTop: 15,
    backgroundColor: '#FFF0E6',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editProfileText: {
    color: '#FF6B00',
    fontWeight: 'bold',
    fontSize: 14,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    elevation: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#34495E',
    fontWeight: '600',
  },
});

export default ProfileScreen;