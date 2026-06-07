import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import api from "../services/api";

const FormSection = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const InputField = ({ icon, placeholder, value, onChangeText, keyboardType = "default", iconFamily = "Ionicons" }) => (
  <View style={styles.inputGroup}>
    {iconFamily === "MaterialCommunityIcons" ? <MaterialCommunityIcons name={icon} size={20} color="#7F8C8D" style={styles.icon} /> : <Ionicons name={icon} size={20} color="#7F8C8D" style={styles.icon} />}

    <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} keyboardType={keyboardType} style={styles.input} placeholderTextColor="#A0A0A0" />
  </View>
);

const KargoScreen = ({ navigation }) => {
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderAddress, setSenderAddress] = useState("");

  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");

  const [jenisMuatan, setJenisMuatan] = useState("");
  const [berat, setBerat] = useState("");

  const [panjang, setPanjang] = useState("");
  const [lebar, setLebar] = useState("");
  const [tinggi, setTinggi] = useState("");

  const [loading, setLoading] = useState(false);
  
  const paymentDetails = {
    serviceName: "Pengiriman Kargo",
    basePrice: "150.000", // Harga contoh untuk kargo
    discount: "0",
    total: "150.000",
    successScreen: "PaymentSuccessScreen", // Halaman tujuan setelah bayar
  };

  const handleSubmit = async () => {
    if (!senderName || !senderPhone || !senderAddress || !receiverName || !receiverPhone || !receiverAddress || !jenisMuatan || !berat) {
      Alert.alert("Error", "Semua data wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/orders", {
        sender_nama: senderName,
        sender_phone: senderPhone,
        sender_alamat: senderAddress,

        receiver_nama: receiverName,
        receiver_phone: receiverPhone,
        receiver_alamat: receiverAddress,

        service_id: 4,
        berat: parseFloat(berat),
        harga: 150000,
        jenis_barang: jenisMuatan,
      });

      console.log(response.data);

      Alert.alert("Berhasil", "Pesanan kargo berhasil dibuat");

      navigation.navigate("OrderScreen");
    } catch (error) {
      console.log(error.response?.data || error.message);

      Alert.alert("Gagal", JSON.stringify(error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Pengiriman Kargo</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Kartu Informasi Kargo */}
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="truck-cargo-container" size={40} color="#FFFFFF" />

          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={styles.infoTitle}>Pengiriman Skala Besar</Text>

            <Text style={styles.infoSubtitle}>Solusi untuk barang berat dan berukuran besar.</Text>
          </View>
        </View>

        {/* DATA PENGIRIM */}
        <FormSection title="Data Pengirim">
          <InputField icon="person-outline" placeholder="Nama Pengirim" value={senderName} onChangeText={setSenderName} />

          <InputField icon="call-outline" placeholder="Telepon Pengirim" value={senderPhone} onChangeText={setSenderPhone} keyboardType="phone-pad" />

          <InputField icon="arrow-up-circle-outline" placeholder="Alamat Pengambilan" value={senderAddress} onChangeText={setSenderAddress} />
        </FormSection>

        {/* DATA PENERIMA */}
        <FormSection title="Data Penerima">
          <InputField icon="person-outline" placeholder="Nama Penerima" value={receiverName} onChangeText={setReceiverName} />

          <InputField icon="call-outline" placeholder="Telepon Penerima" value={receiverPhone} onChangeText={setReceiverPhone} keyboardType="phone-pad" />

          <InputField icon="arrow-down-circle-outline" placeholder="Alamat Tujuan" value={receiverAddress} onChangeText={setReceiverAddress} />
        </FormSection>

        {/* DETAIL MUATAN */}
        <FormSection title="Detail Muatan">
          <InputField icon="package-variant-closed" placeholder="Jenis Muatan" iconFamily="MaterialCommunityIcons" value={jenisMuatan} onChangeText={setJenisMuatan} />

          <InputField icon="weight-kilogram" placeholder="Total Berat (kg)" keyboardType="numeric" iconFamily="MaterialCommunityIcons" value={berat} onChangeText={setBerat} />

          <Text style={styles.subTitle}>Dimensi (Panjang x Lebar x Tinggi) dalam cm</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextInput style={styles.dimensionInput} placeholder="P" keyboardType="numeric" value={panjang} onChangeText={setPanjang} />

            <TextInput style={styles.dimensionInput} placeholder="L" keyboardType="numeric" value={lebar} onChangeText={setLebar} />

            <TextInput style={styles.dimensionInput} placeholder="T" keyboardType="numeric" value={tinggi} onChangeText={setTinggi} />
          </View>
        </FormSection>

        {/* RINGKASAN */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Estimasi Biaya</Text>

            <Text style={styles.totalValue}>Rp 150.000</Text>
          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.submitButtonText}>Cek Harga & Pesan</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F0F0" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2C3E50",
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop: 20,
  },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  scrollContainer: { padding: 15 },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8E44AD",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  infoTitle: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" },
  infoSubtitle: { fontSize: 14, color: "#ECF0F1", marginTop: 2 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 15,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#2C3E50",
  },
  subTitle: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 10,
  },
  dimensionInput: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    paddingVertical: 12,
    fontSize: 16,
    color: "#2C3E50",
    textAlign: "center",
    marginHorizontal: 4,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 18,
    color: "#2C3E50",
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    color: "#FF6B00",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#FF6B00",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default KargoScreen;
