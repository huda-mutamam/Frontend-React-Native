import React, { useMemo, useState } from "react";
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

const InputField = ({ icon, placeholder, value, onChangeText, keyboardType = "default", multiline = false }) => (
  <View style={styles.inputGroup}>
    <Ionicons name={icon} size={20} color="#7F8C8D" style={styles.icon} />

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

const NextDayScreen = ({ navigation }) => {
  // PENGIRIM
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderAddress, setSenderAddress] = useState("");

  // PENERIMA
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");

  // PAKET
  const [itemName, setItemName] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);

  const PRICE_PER_KG_NEXTDAY = 12000;
  const NEXTDAY_FEE = 7000;

  const calculatedPrice = useMemo(() => {
    const actualWeight = parseFloat(weight.toString().replace(",", "."));
    const effectiveWeight = Math.max(Number.isFinite(actualWeight) ? actualWeight : 0, 1);
    const roundedWeight = effectiveWeight > 1 ? Math.ceil(effectiveWeight / 0.3) * 0.3 : 1;
    const base = Number((roundedWeight * PRICE_PER_KG_NEXTDAY).toFixed(0));

    return {
      billedWeight: Number(roundedWeight.toFixed(1)),
      base,
      nextDayFee: NEXTDAY_FEE,
      total: base + NEXTDAY_FEE,
    };
  }, [weight]);

  const paymentDetails = {
    serviceName: "Pengiriman Next Day",
    basePrice: calculatedPrice.base.toString(),
    discount: calculatedPrice.nextDayFee.toString(),
    total: calculatedPrice.total.toString(),
    successScreen: "PaymentSuccessScreen",
  };

  const handleSubmit = async () => {
    if (!senderName || !senderPhone || !senderAddress || !receiverName || !receiverPhone || !receiverAddress) {
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

        service_id: 3, // NEXT DAY

        berat: calculatedPrice.billedWeight,
        harga: calculatedPrice.total,

        jenis_barang: itemName || "Dokumen",
        catatan: notes,
      });

      console.log("SUCCESS:", response.data);

      Alert.alert("Berhasil", "Order Next Day berhasil dibuat");

      navigation.navigate("PaymentScreen", paymentDetails);
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);

      Alert.alert("Gagal", JSON.stringify(error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Pengiriman Next Day</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* GARANSI */}
        <View style={styles.guaranteeCard}>
          <MaterialCommunityIcons name="calendar-check-outline" size={40} color="#FFFFFF" />

          <View style={{ marginLeft: 15 }}>
            <Text style={styles.guaranteeTitle}>Pasti Tiba Besok</Text>

            <Text style={styles.guaranteeSubtitle}>Jaminan uang kembali jika terlambat</Text>
          </View>
        </View>

        {/* PENGIRIM */}
        <FormSection title="Data Pengirim">
          <InputField icon="person-outline" placeholder="Nama Pengirim" value={senderName} onChangeText={setSenderName} />

          <InputField icon="call-outline" placeholder="No HP Pengirim" value={senderPhone} onChangeText={setSenderPhone} keyboardType="phone-pad" />

          <InputField icon="location-outline" placeholder="Alamat Pengirim" value={senderAddress} onChangeText={setSenderAddress} multiline />
        </FormSection>

        {/* PENERIMA */}
        <FormSection title="Data Penerima">
          <InputField icon="person-outline" placeholder="Nama Penerima" value={receiverName} onChangeText={setReceiverName} />

          <InputField icon="call-outline" placeholder="No HP Penerima" value={receiverPhone} onChangeText={setReceiverPhone} keyboardType="phone-pad" />

          <InputField icon="location-outline" placeholder="Alamat Tujuan" value={receiverAddress} onChangeText={setReceiverAddress} multiline />
        </FormSection>

        {/* DETAIL BARANG */}
        <FormSection title="Detail Barang">
            <InputField icon="cube-outline" placeholder="Nama Barang" value={itemName} onChangeText={setItemName} />

          <View style={styles.inputGroup}>
            <MaterialCommunityIcons name="weight-kilogram" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput
              placeholder="Berat Paket (kg)"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <InputField icon="document-text-outline" placeholder="Catatan untuk Kurir" value={notes} onChangeText={setNotes} multiline />
        </FormSection>

        {/* RINGKASAN */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimasi Biaya</Text>
            <Text style={styles.summaryValue}>Rp {calculatedPrice.base}</Text>
          </View>

          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Biaya Next Day</Text>
            <Text style={styles.summaryDiscount}>Rp {calculatedPrice.nextDayFee}</Text>
          </View>

          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>Rp {calculatedPrice.total}</Text>
          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.submitButtonText}>Buat Pengiriman</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NextDayScreen;

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

  guaranteeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#27AE60",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },

  guaranteeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  guaranteeSubtitle: {
    color: "#ECF0F1",
    marginTop: 3,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
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

  summaryDiscount: {
    fontSize: 16,
    color: "#FF6B00",
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECF0F1",
    marginVertical: 12,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B00",
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
