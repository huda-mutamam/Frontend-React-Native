import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen({ navigation }) {
  return (
    // Pembungkus Utama Layar
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', padding: 20 }}>
      {/* Konten Utama */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 200, height: 200, marginBottom: 20 }}
          resizeMode="contain"
        />

        {/* Judul */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2C3E50', textAlign: 'center', marginTop: 40 }}>
          Pengiriman Cepat & Terpercaya
        </Text>
        {/* Deskripsi */}
        <Text style={{ fontSize: 16, color: '#888888', textAlign: 'center', marginTop: 16, lineHeight: 24 }}>
          Kirim paket Anda ke seluruh penjuru negeri dengan layanan yang cepat, aman, dan dapat diandalkan oleh Dim Exspres.
        </Text>
      </View>
      {/* Tombol Utama */}
      <TouchableOpacity 
        style={{ backgroundColor: '#FF6B00', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} 
        onPress={() => navigation.navigate('Register')}
      >
        {/* Teks di dalam tombol */}
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
          Mulai Sekarang
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}