import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function VerificationCodeScreen({ navigation }) {
  const [code, setCode] = useState(new Array(6).fill(''));
  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleTextChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Pindah ke input berikutnya jika teks dimasukkan
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Pindah ke input sebelumnya jika backspace ditekan pada input kosong
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 10,
      }}>Masukkan Kode Verifikasi</Text>
      <Text style={{
        fontSize: 16,
        color: '#888888',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
      }}>
        Kami telah mengirimkan kode verifikasi ke email Anda.
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        {Array(6).fill().map((_, index) => (
          <TextInput
            key={index}
            style={{
              width: 40,
              height: 40,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#CCCCCC',
              textAlign: 'center',
              marginHorizontal: 5,
              fontSize: 16,
              color: '#2C3E50',
              backgroundColor: '#FFFFFF',
            }}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleTextChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            ref={(input) => (inputs.current[index] = input)}
            value={code[index]}
          />
        ))}
      </View>

      <TouchableOpacity style={{
        backgroundColor: '#FF6B00',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 12,
      }} onPress={() => alert(`Kode: ${code.join('')}`)}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Verifikasi</Text>
      </TouchableOpacity>
    </View>
  );
}