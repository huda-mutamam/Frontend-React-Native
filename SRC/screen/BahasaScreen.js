import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const languages = [
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'en', name: 'English (US)' },
];

const LanguageItem = ({ language, isSelected, onPress }) => (
  <TouchableOpacity style={styles.languageItem} onPress={onPress}>
    <Text style={styles.languageText}>{language.name}</Text>
    {isSelected && <Ionicons name="checkmark-circle" size={24} color="#FF6B00" />}
  </TouchableOpacity>
);

const BahasaScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('id'); // Default ke Bahasa Indonesia

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bahasa</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          {languages.map((lang) => (
            <LanguageItem
              key={lang.code}
              language={lang}
              isSelected={selectedLanguage === lang.code}
              onPress={() => setSelectedLanguage(lang.code)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => {
          alert(`Bahasa diubah ke ${languages.find(l => l.code === selectedLanguage).name}`);
          navigation.goBack();
        }}>
          <Text style={styles.saveButtonText}>Simpan</Text>
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
  scrollContainer: { padding: 15 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 12, elevation: 1,
    overflow: 'hidden',
  },
  languageItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 18, paddingHorizontal: 20,
    borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  languageText: {
    fontSize: 16, color: '#34495E', fontWeight: '600',
  },
  footer: {
    padding: 15, backgroundColor: '#F0F0F0',
    borderTopWidth: 1, borderTopColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#FF6B00', borderRadius: 12, paddingVertical: 16,
    alignItems: 'center', elevation: 2,
  },
  saveButtonText: {
    color: '#FFFFFF', fontSize: 18, fontWeight: 'bold',
  },
});

export default BahasaScreen;