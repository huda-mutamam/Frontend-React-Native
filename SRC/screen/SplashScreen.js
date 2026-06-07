import React, { useEffect } from 'react';
import { Text, View, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen({ navigation }) {
  // Setelah 3 detik, otomatis pindah ke layar Onboarding
  useEffect(() => {
    const timer = setTimeout(() => {
      // `replace` digunakan agar pengguna tidak bisa kembali ke splash screen
      navigation.replace('Onboarding'); 
    }, 3000); // 3000 milidetik = 3 detik

    return () => clearTimeout(timer); // Membersihkan timer jika komponen dilepas
  }, [navigation]);

  return (
    // Pembungkus Utama Layar
    <LinearGradient
      colors={['#FF6B00', '#E55F00']} // Gradien dari oranye cerah ke sedikit lebih gelap
      style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: '30%' }}
    >
      {/* Kotak putih di belakang logo */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <Image
          source={require('../../assets/logo.png')} // Memanggil logo dari folder assets
          style={{ width: 250, height: 250 }}
          resizeMode="contain"
        />
      </View>
      {/* Tagline */}
      <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', marginTop: 10 }}>
        Cepat, Aman, Terpercaya
      </Text>

      <StatusBar style="light" />
    </LinearGradient>
  );
}