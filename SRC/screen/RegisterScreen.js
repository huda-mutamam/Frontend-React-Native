import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Peringatan", "Semua field wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/register", {
        name,
        email, 
        password,
      });

      Alert.alert("Berhasil", response.data.message || "Registrasi berhasil");

      navigation.navigate("Login");
    } catch (error) {
      console.log("ERROR FULL:", error);
      console.log("MESSAGE:", error.message);
      console.log("RESPONSE:", error.response);

      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#2C3E50", textAlign: "center", marginBottom: 8 }}>Buat Akun Baru</Text>

        <Text style={{ fontSize: 16, color: "#888888", textAlign: "center", marginBottom: 40 }}>Isi data diri Anda untuk melanjutkan.</Text>

        {/* Nama */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, color: "#2C3E50", marginBottom: 8, fontWeight: "600" }}>Nama Lengkap</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              backgroundColor: "#F0F0F0",
              paddingHorizontal: 15,
              paddingVertical: 14,
              borderRadius: 12,
              fontSize: 16,
              color: "#2C3E50",
            }}
            placeholder="Masukkan nama lengkap Anda"
            placeholderTextColor="#A0A0A0"
          />
        </View>

        {/* Email */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, color: "#2C3E50", marginBottom: 8, fontWeight: "600" }}>Email</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{
              backgroundColor: "#F0F0F0",
              paddingHorizontal: 15,
              paddingVertical: 14,
              borderRadius: 12,
              fontSize: 16,
              color: "#2C3E50",
            }}
            placeholder="contoh@email.com"
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, color: "#2C3E50", marginBottom: 8, fontWeight: "600" }}>Password</Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            style={{
              backgroundColor: "#F0F0F0",
              paddingHorizontal: 15,
              paddingVertical: 14,
              borderRadius: 12,
              fontSize: 16,
              color: "#2C3E50",
            }}
            placeholder="Buat password Anda"
            placeholderTextColor="#A0A0A0"
            secureTextEntry
          />
        </View>

        {/* Tombol Daftar */}
        <TouchableOpacity
          style={{
            backgroundColor: "#FF6B00",
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>{loading ? "Memproses..." : "Daftar"}</Text>
        </TouchableOpacity>

        {/* Pemisah */}
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 30 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#E0E0E0" }} />
          <Text style={{ marginHorizontal: 10, color: "#888888", fontSize: 14 }}>Atau daftar dengan</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#E0E0E0" }} />
        </View>

        {/* Google & Facebook */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F0F0F0",
              paddingVertical: 14,
              borderRadius: 12,
              marginRight: 10,
            }}
            onPress={() => navigation.navigate("GoogleLogin")}
          >
            <Image source={require("../../assets/Google.png")} style={styles.socialIcon} />
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#2C3E50" }}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F0F0F0",
              paddingVertical: 14,
              borderRadius: 12,
              marginLeft: 10,
            }}
            onPress={() => navigation.navigate("FacebookLogin")}
          >
            <Image source={require("../../assets/facebook.png")} style={styles.socialIcon} />
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#2C3E50" }}>Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Login */}
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 24 }}>
          <Text style={{ fontSize: 14, color: "#888888" }}>Sudah punya akun?</Text>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontSize: 14, color: "#FF6B00", fontWeight: "bold" }}> Masuk</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  socialIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },
});
