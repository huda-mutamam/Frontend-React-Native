import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FacebookLoginScreen({ navigation }) {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    }}>
      {/* Menampilkan logo Facebook dari aset */}
      <Image
        source={require('../../assets/facebook.png')}
        style={{
          width: 200,
          height: 200,
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
      }}>Login dengan Facebook</Text>
      <Text style={{
        fontSize: 16,
        color: '#888888',
        textAlign: 'center',
      }}>
        Klik tombol di bawah untuk melanjutkan proses login dengan akun Facebook Anda.
      </Text>

      <TouchableOpacity style={{
        backgroundColor: '#FF6B00',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginTop: 30,
      }} onPress={() => alert('Proses login Facebook dimulai...')}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Lanjutkan dengan Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ marginTop: 20, color: '#888888', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' }}>Kembali</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}