import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './SRC/routes/stack'; // Pastikan path ini benar
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons'; // <-- 1. Impor Ionicons dari Expo
import { View } from 'react-native';
import api from './SRC/services/api'; // Pastikan import api.js Anda

// Tahan splash screen agar tidak hilang otomatis
SplashScreen.preventAutoHideAsync();

export default function App() {
  // 2. Ganti cara memuat font dengan metode yang lebih andal dari Expo
  const [fontsLoaded, fontError] = useFonts({
    ...Ionicons.font,
  });

  // Fungsi untuk menyembunyikan splash screen setelah aset dimuat
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Jangan render apapun sampai font berhasil dimuat
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const cekKoneksi = async () => {
    try {
      const response = await api.get("/tes-koneksi");
      console.log("HASIL TES:", response.data.message);
    } catch (error) {
      console.log("ERROR TES:", error.message);
    }
  };

  // Panggil fungsi ini
  cekKoneksi();

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
      <AppStack />
      </NavigationContainer>
    </View>
  );
}
