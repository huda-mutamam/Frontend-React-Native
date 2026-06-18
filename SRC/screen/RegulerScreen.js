import React, { useState, useMemo } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  TextInput, Alert, ActivityIndicator, Modal, FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import api from "../services/api";

const FormSection = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

// Pilihan satuan berat
const SATUAN_OPTIONS = [
  { label: "kg", value: "kg", toKg: 1 },
  { label: "ons", value: "ons", toKg: 0.1 },
  { label: "gram", value: "gram", toKg: 0.001 },
];

const PRICE_PER_KG = 10000;
const DISCOUNT = 5000;

const RegulerScreen = ({ navigation }) => {
  const [senderName, setSenderName] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [senderPhone, setSenderPhone] = useState("");

  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");

  const [itemName, setItemName] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedSatuan, setSelectedSatuan] = useState(SATUAN_OPTIONS[0]);
  const [satuanModalVisible, setSatuanModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  // Konversi berat ke kg lalu hitung harga
 const calculatedPrice = useMemo(() => {
  const w = parseFloat(weight) || 0;
  const q = parseInt(quantity) || 1;
  const weightInKg = w * selectedSatuan.toKg;
  const base = weightInKg * q * PRICE_PER_KG;
  const isGram = selectedSatuan.value === "gram";
  const discount = isGram ? 0 : DISCOUNT;
  const total = Math.max(base - discount, 0);
  return { base, total, weightInKg, discount };
}, [weight, quantity, selectedSatuan]);

  const formatRupiah = (angka) => angka.toLocaleString("id-ID");

  const handleSubmit = async () => {
    try {
      if (!senderName || !senderPhone || !senderAddress || !receiverName || !receiverPhone || !receiverAddress || !weight) {
        Alert.alert("Error", "Lengkapi semua data");
        return;
      }

      setLoading(true);

      const response = await api.post("/orders", {
        sender_nama: senderName,
        sender_alamat: senderAddress,
        sender_phone: senderPhone,

        receiver_nama: receiverName,
        receiver_alamat: receiverAddress,
        receiver_phone: receiverPhone,

        service_id: 2,
        berat: calculatedPrice.weightInKg, // selalu kirim dalam kg ke API
        jumlah: parseInt(quantity) || 1,
        harga: calculatedPrice.total,
        jenis_barang: itemName || "Paket",
      });

      console.log("SUCCESS", response.data);
      Alert.alert("Berhasil", "Pesanan berhasil dibuat");

      navigation.navigate("PaymentScreen", {
        serviceName: "Pengiriman Reguler",
        basePrice: formatRupiah(calculatedPrice.base),
        discount: formatRupiah(DISCOUNT),
        total: formatRupiah(calculatedPrice.total),
        successScreen: "PaymentSuccessScreen",
      });
    } catch (error) {
      console.log("ERROR", error.response?.data || error.message);
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
        <Text style={styles.headerTitle}>Pengiriman Reguler</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Detail Pengirim */}
        <FormSection title="Detail Pengirim">
          <View style={styles.inputGroup}>
            <Ionicons name="person-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Nama Pengirim" style={styles.input} value={senderName} onChangeText={setSenderName} />
          </View>
          <View style={styles.inputGroup}>
            <Ionicons name="call-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Nomor Telepon" style={styles.input} keyboardType="phone-pad" value={senderPhone} onChangeText={setSenderPhone} />
          </View>
          <View style={styles.inputGroup}>
            <Ionicons name="location-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Alamat Lengkap Pengirim" style={[styles.input, { height: 80, textAlignVertical: "top" }]} multiline value={senderAddress} onChangeText={setSenderAddress} />
          </View>
        </FormSection>

        {/* Detail Penerima */}
        <FormSection title="Detail Penerima">
          <View style={styles.inputGroup}>
            <Ionicons name="person-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Nama Penerima" style={styles.input} value={receiverName} onChangeText={setReceiverName} />
          </View>
          <View style={styles.inputGroup}>
            <Ionicons name="call-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Nomor Telepon Penerima" style={styles.input} keyboardType="phone-pad" value={receiverPhone} onChangeText={setReceiverPhone} />
          </View>
          <View style={styles.inputGroup}>
            <Ionicons name="location-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Alamat Lengkap Penerima" style={[styles.input, { height: 80, textAlignVertical: "top" }]} multiline value={receiverAddress} onChangeText={setReceiverAddress} />
          </View>
        </FormSection>

        {/* Detail Paket */}
        <FormSection title="Detail Paket">
          <View style={styles.inputGroup}>
            <Ionicons name="cube-outline" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Nama Barang" style={styles.input} value={itemName} onChangeText={setItemName} />
          </View>

          <View style={{ flexDirection: "row" }}>
            {/* Input Berat */}
            <View style={[styles.inputGroup, { flex: 2, marginRight: 8 }]}>
              <MaterialCommunityIcons name="weight-kilogram" size={20} color="#7F8C8D" style={styles.icon} />
              <TextInput
                placeholder="Berat"
                style={styles.input}
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
            </View>

            {/* Dropdown Satuan */}
            <TouchableOpacity
              style={[styles.inputGroup, { flex: 1, justifyContent: "space-between" }]}
              onPress={() => setSatuanModalVisible(true)}
            >
              <Text style={[styles.input, { flex: 1, paddingVertical: 12 }]}>{selectedSatuan.label}</Text>
              <Ionicons name="chevron-down" size={18} color="#7F8C8D" />
            </TouchableOpacity>
          </View>

          {/* Tampilkan konversi ke kg jika bukan satuan kg */}
          {weight !== "" && selectedSatuan.value !== "kg" && (
            <Text style={styles.konversiText}>
              = {calculatedPrice.weightInKg.toFixed(4)} kg
            </Text>
          )}

          {/* Input Jumlah */}
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons name="package-variant" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput placeholder="Jumlah Barang" style={styles.input} keyboardType="numeric" value={quantity} onChangeText={setQuantity} />
          </View>
        </FormSection>

        {/* Ringkasan */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimasi Biaya</Text>
            <Text style={styles.summaryDiscount}>- Rp {formatRupiah(calculatedPrice.discount)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Diskon Voucher</Text>
            <Text style={styles.summaryDiscount}>- Rp {formatRupiah(DISCOUNT)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>Rp {formatRupiah(calculatedPrice.total)}</Text>
          </View>
        </View>

        {/* Tombol Submit */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.submitButtonText}>Lanjutkan ke Pembayaran</Text>}
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Pilih Satuan */}
      <Modal visible={satuanModalVisible} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setSatuanModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Pilih Satuan Berat</Text>
            {SATUAN_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[styles.modalOption, selectedSatuan.value === item.value && styles.modalOptionActive]}
                onPress={() => { setSelectedSatuan(item); setSatuanModalVisible(false); }}
              >
                <Text style={[styles.modalOptionText, selectedSatuan.value === item.value && styles.modalOptionTextActive]}>
                  {item.label}
                </Text>
                {selectedSatuan.value === item.value && (
                  <Ionicons name="checkmark" size={20} color="#FF6B00" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#2C3E50", marginBottom: 15 },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 12, fontSize: 16, color: "#2C3E50" },
  konversiText: {
    fontSize: 13,
    color: "#7F8C8D",
    marginTop: -8,
    marginBottom: 10,
    marginLeft: 4,
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
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 16, color: "#7F8C8D" },
  summaryValue: { fontSize: 16, color: "#2C3E50", fontWeight: "600" },
  summaryDiscount: { fontSize: 16, color: "#E74C3C", fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#E0E0E0", marginVertical: 10 },
  totalLabel: { fontSize: 18, color: "#2C3E50", fontWeight: "bold" },
  totalValue: { fontSize: 18, color: "#FF6B00", fontWeight: "bold" },
  submitButton: {
    backgroundColor: "#FF6B00",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 34,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 16,
    textAlign: "center",
  },
  modalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#F8F9FA",
  },
  modalOptionActive: { backgroundColor: "#FFF3E8" },
  modalOptionText: { fontSize: 16, color: "#2C3E50" },
  modalOptionTextActive: { color: "#FF6B00", fontWeight: "bold" },
});

export default RegulerScreen;