import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GoogleLoginScreen({ navigation }) {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    }}>
      {/* Menampilkan logo Google dari aset */}
      <Image
        source={require('../../assets/Google.png')}
        style={{
          width: 100,
          height: 100,
          marginBottom: 30,
          resizeMode: 'contain',
        }}
      />

      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        textAlign: 'center',
        marginBottom: 16,
      }}>Login dengan Google</Text>
      <Text style={{
        fontSize: 16,
        color: '#888888',
        textAlign: 'center',
      }}>
        Klik tombol di bawah untuk melanjutkan proses login dengan akun Google Anda.
      </Text>

      <TouchableOpacity style={{
        backgroundColor: '#FF6B00',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginTop: 30,
      }} onPress={() => alert('Proses login Google dimulai...')}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Lanjutkan dengan Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ marginTop: 20, color: '#888888', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' }}>Kembali</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}