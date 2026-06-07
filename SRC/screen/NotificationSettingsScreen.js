import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Komponen untuk setiap baris pengaturan
const SettingRow = ({ title, description, value, onValueChange }) => (
  <View style={styles.settingRow}>
    <View style={styles.textContainer}>
      <Text style={styles.settingTitle}>{title}</Text>
      <Text style={styles.settingDescription}>{description}</Text>
    </View>
    <Switch
      trackColor={{ false: '#E0E0E0', true: '#FFDDC2' }}
      thumbColor={value ? '#FF6B00' : '#f4f3f4'}
      onValueChange={onValueChange}
      value={value}
    />
  </View>
);

const NotificationSettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    promo: true,
    status: true,
    chat: false,
  });

  const toggleSwitch = (key) => {
    setSettings(previousState => ({ ...previousState, [key]: !previousState[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pengaturan Notifikasi</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notifikasi Umum</Text>
          <SettingRow
            title="Notifikasi Promo"
            description="Dapatkan info promo dan penawaran terbaru."
            value={settings.promo}
            onValueChange={() => toggleSwitch('promo')}
          />
          <SettingRow
            title="Update Status Pengiriman"
            description="Terima notifikasi untuk setiap pergerakan paket."
            value={settings.status}
            onValueChange={() => toggleSwitch('status')}
          />
          <SettingRow
            title="Notifikasi Chat"
            description="Dapatkan pemberitahuan untuk pesan baru."
            value={settings.chat}
            onValueChange={() => toggleSwitch('chat')}
          />
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
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18, fontWeight: 'bold', color: '#2C3E50',
    marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  textContainer: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
  },
  settingDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 4,
  },
});

export default NotificationSettingsScreen;