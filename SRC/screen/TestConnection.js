import React from "react";
import { Button, Alert } from "react-native";
import api from "../services/api"; // Pastikan path benar

export default function TestConnection() {
  const checkConnection = async () => {
    try {
      // Kita coba panggil route yang sangat sederhana
      const response = await api.get("/");
      Alert.alert("Sukses", "Terhubung ke Backend: " + response.status);
    } catch (error) {
      // Jika muncul alert ini, berarti koneksi gagal
      Alert.alert("Gagal", "Tidak bisa terhubung: " + error.message);
      console.log(error); // Cek terminal untuk detail error
    }
  };

  return <Button title="Tes Koneksi ke Backend" onPress={checkConnection} />;
}
