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

const DokumenScreen = ({ navigation }) => {
  // PENGIRIM
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderAddress, setSenderAddress] = useState("");

  // PENERIMA
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");

  // DOKUMEN
  const [documentType, setDocumentType] = useState("");
  const [securityNote, setSecurityNote] = useState("");
  const [weight, setWeight] = useState("");

  const [loading, setLoading] = useState(false);

  const PRICE_PER_KG = 10000;
  const DOCUMENT_FEE = 5000;

  const calculatedPrice = useMemo(() => {
    const actualWeight = parseFloat(weight.toString().replace(",", "."));
    const effectiveWeight = Math.max(Number.isFinite(actualWeight) ? actualWeight : 0, 1);
    const roundedWeight = effectiveWeight > 1 ? Math.ceil(effectiveWeight / 0.3) * 0.3 : 1;
    const base = roundedWeight * PRICE_PER_KG;

    return {
      billedWeight: Number(roundedWeight.toFixed(1)),
      base,
      documentFee: DOCUMENT_FEE,
      total: base + DOCUMENT_FEE,
    };
  }, [weight]);

  const paymentDetails = {
    serviceName: "Pengiriman Dokumen",
    basePrice: calculatedPrice.base.toString(),
    discount: calculatedPrice.documentFee.toString(),
    total: calculatedPrice.total.toString(),
    successScreen: "PaymentSuccessScreen",
  };

  const handleSubmit = async () => {
    try {
      if (!senderName || !senderPhone || !receiverName || !receiverPhone || !receiverAddress || !documentType) {
        Alert.alert("Error", "Lengkapi semua data terlebih dahulu");
        return;
      }

      setLoading(true);

      const response = await api.post("/orders", {
        sender_nama: senderName,
        sender_phone: senderPhone,
        sender_alamat: senderAddress,

        receiver_nama: receiverName,
        receiver_phone: receiverPhone,
        receiver_alamat: receiverAddress,

        service_id: 3,
        berat: calculatedPrice.billedWeight,
        harga: calculatedPrice.total,
        jenis_barang: documentType,
        catatan: securityNote,
      });

      console.log("SUCCESS:", response.data);

      Alert.alert("Berhasil", "Pengiriman dokumen berhasil dibuat");

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

        <Text style={styles.headerTitle}>Pengiriman Dokumen</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* PENGIRIM */}
        {/* PENGIRIM */}
        <FormSection title="Detail Pengirim">
          <View style={styles.inputGroup}>
            <Ionicons name="person-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Nama Pengirim" value={senderName} onChangeText={setSenderName} style={styles.input} />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="call-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Nomor Telepon Pengirim" value={senderPhone} onChangeText={setSenderPhone} keyboardType="phone-pad" style={styles.input} />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="location-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput
              placeholder="Alamat Lengkap Pengirim"
              value={senderAddress}
              onChangeText={setSenderAddress}
              multiline
              style={[
                styles.input,
                {
                  height: 80,
                  textAlignVertical: "top",
                },
              ]}
            />
          </View>
        </FormSection>

        {/* PENERIMA */}
        <FormSection title="Detail Penerima">
          <View style={styles.inputGroup}>
            <Ionicons name="person-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Nama Penerima" value={receiverName} onChangeText={setReceiverName} style={styles.input} />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="call-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Nomor Telepon Penerima" value={receiverPhone} onChangeText={setReceiverPhone} keyboardType="phone-pad" style={styles.input} />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="location-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput
              placeholder="Alamat Lengkap Penerima"
              value={receiverAddress}
              onChangeText={setReceiverAddress}
              multiline
              style={[
                styles.input,
                {
                  height: 80,
                  textAlignVertical: "top",
                },
              ]}
            />
          </View>
        </FormSection>

        {/* DOKUMEN */}
        <FormSection title="Detail Dokumen">
          <View style={styles.inputGroup}>
            <Ionicons name="document-text-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Jenis Dokumen (KTP, Ijazah, Sertifikat)" value={documentType} onChangeText={setDocumentType} style={styles.input} />
          </View>

          <View style={styles.inputGroup}>
            <MaterialCommunityIcons name="weight-kilogram" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput
              placeholder="Berat Dokumen (kg)"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Catatan Keamanan (Opsional)" value={securityNote} onChangeText={setSecurityNote} style={styles.input} />
          </View>
        </FormSection>

        {/* RINGKASAN */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimasi Biaya</Text>
            <Text style={styles.summaryValue}>Rp {calculatedPrice.base}</Text>
          </View>

          {calculatedPrice.documentFee > 0 && <View style={styles.divider} />}
          {calculatedPrice.documentFee > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Biaya Dokumen</Text>
              <Text style={styles.summaryDiscount}>Rp {calculatedPrice.documentFee}</Text>
            </View>
          )}

          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>Rp {paymentDetails.total}</Text>
          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.submitButtonText}>Lanjutkan</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DokumenScreen;

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
    alignItems: "center",
  },

  summaryLabel: {
    fontSize: 16,
    color: "#2C3E50",
  },

  summaryValue: {
    fontSize: 16,
    color: "#2C3E50",
    fontWeight: "600",
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
