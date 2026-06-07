import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/api";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Peringatan", "Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/login", {
        email,
        password,
      });

      const token = response.data.token;

      await SecureStore.setItemAsync("token", token);

      Alert.alert("Berhasil", "Login berhasil");

      navigation.replace("Home");
    } catch (error) {
      console.log(error.response?.data);

      Alert.alert("Login Gagal", error.response?.data?.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#2C3E50",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          Selamat Datang Kembali!
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 14,
              color: "#2C3E50",
              marginBottom: 8,
            }}
          >
            Email
          </Text>

          <TextInput
            style={{
              backgroundColor: "#F0F0F0",
              padding: 14,
              borderRadius: 12,
            }}
            placeholder="contoh@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 14,
              color: "#2C3E50",
              marginBottom: 8,
            }}
          >
            Password
          </Text>

          <TextInput
            style={{
              backgroundColor: "#F0F0F0",
              padding: 14,
              borderRadius: 12,
            }}
            placeholder="Masukkan password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#FF6B00",
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {loading ? "Memproses..." : "Masuk"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
