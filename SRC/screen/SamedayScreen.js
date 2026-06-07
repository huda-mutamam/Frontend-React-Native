
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

const FormSection = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  keyboardType = "default",
}) => (
  <View style={styles.inputGroup}>
    <Ionicons
      name={icon}
      size={20}
      color="#7F8C8D"
      style={styles.icon}
    />

    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      multiline={multiline}
      style={[
        styles.input,
        multiline && {
          height: 80,
          textAlignVertical: "top",
        },
      ]}
    />
  </View>
);

const SamedayScreen = ({ navigation }) => {
  // PENGIRIM
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderAddress, setSenderAddress] = useState("");

  // PENERIMA
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");

  // PAKET
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !senderName ||
      !senderPhone ||
      !senderAddress ||
      !receiverName ||
      !receiverPhone ||
      !receiverAddress ||
      !weight
    ) {
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

        service_id: 1, // Sameday
        berat: parseFloat(weight),
        harga: 35000,
        jenis_barang: "Paket",
        catatan: notes,
      });

      console.log("SUCCESS:", response.data);

      Alert.alert("Berhasil", "Pesanan berhasil dibuat");

      navigation.navigate("OrderScreen");
    } catch (error) {
      console.log(
        "ERROR:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Gagal",
        JSON.stringify(
          error.response?.data || error.message
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Pengiriman Sameday
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* DATA PENGIRIM */}
        <FormSection title="Data Pengirim">
          <InputField
            icon="person-outline"
            placeholder="Nama Pengirim"
            value={senderName}
            onChangeText={setSenderName}
          />

          <InputField
            icon="call-outline"
            placeholder="No HP Pengirim"
            value={senderPhone}
            onChangeText={setSenderPhone}
            keyboardType="phone-pad"
          />

          <InputField
            icon="location-outline"
            placeholder="Alamat Penjemputan"
            value={senderAddress}
            onChangeText={setSenderAddress}
            multiline
          />
        </FormSection>

        {/* DATA PENERIMA */}
        <FormSection title="Data Penerima">
          <InputField
            icon="person-outline"
            placeholder="Nama Penerima"
            value={receiverName}
            onChangeText={setReceiverName}
          />

          <InputField
            icon="call-outline"
            placeholder="No HP Penerima"
            value={receiverPhone}
            onChangeText={setReceiverPhone}
            keyboardType="phone-pad"
          />

          <InputField
            icon="location-outline"
            placeholder="Alamat Tujuan"
            value={receiverAddress}
            onChangeText={setReceiverAddress}
            multiline
          />
        </FormSection>

        {/* DETAIL PAKET */}
        <FormSection title="Detail Paket">
          <InputField
            icon="cube-outline"
            placeholder="Berat Paket (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />

          <InputField
            icon="document-text-outline"
            placeholder="Catatan untuk kurir"
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </FormSection>

        {/* RINGKASAN */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Layanan
            </Text>
            <Text style={styles.summaryValue}>
              Same Day
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Estimasi Biaya
            </Text>
            <Text style={styles.summaryValue}>
              Rp 35.000
            </Text>
          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>
              Pesan Sekarang
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SamedayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2C3E50",
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop: 20,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  scrollContainer: {
    padding: 15,
  },

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

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#2C3E50",
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  summaryLabel: {
    fontSize: 16,
    color: "#7F8C8D",
  },

  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },

  submitButton: {
    backgroundColor: "#FF6B00",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
