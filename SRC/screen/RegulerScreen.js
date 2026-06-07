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

const InputField = ({ icon, placeholder, keyboardType = "default", multiline = false }) => (
  <View style={styles.inputGroup}>
    <Ionicons name={icon} size={20} color="#7F8C8D" style={styles.icon} />
    <TextInput placeholder={placeholder} style={[styles.input, multiline && { height: 80, textAlignVertical: "top" }]} placeholderTextColor="#A0A0A0" keyboardType={keyboardType} multiline={multiline} />
  </View>
);

const RegulerScreen = ({ navigation }) => {
  const [senderName, setSenderName] = useState("");
  const [senderAddress, setSenderAddress] = useState("");

  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");

  const [itemName, setItemName] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");

  const [loading, setLoading] = useState(false);

  const [senderPhone, setSenderPhone] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");

  const paymentDetails = {
    serviceName: "Pengiriman Reguler",
    basePrice: "20.000",
    discount: "5.000",
    total: "15.000",
    successScreen: "PaymentSuccessScreen", // Halaman tujuan setelah bayar
  };

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
        berat: parseFloat(weight),
        harga: 15000,
        jenis_barang: itemName || "Paket",
      });

      console.log("SUCCESS", response.data);

      Alert.alert("Berhasil", "Pesanan berhasil dibuat");

      navigation.navigate("PaymentScreen", paymentDetails);
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
           <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
             <MaterialCommunityIcons name="weight-kilogram" size={20} color="#7F8C8D" style={styles.icon} />
             <TextInput placeholder="Berat (kg)" style={styles.input} keyboardType="numeric" value={weight} onChangeText={setWeight} />
           </View>

           <View style={[styles.inputGroup, { flex: 1 }]}>
             <MaterialCommunityIcons name="package-variant" size={20} color="#7F8C8D" style={styles.icon} />
             <TextInput placeholder="Jumlah" style={styles.input} keyboardType="numeric" value={quantity} onChangeText={setQuantity} />
           </View>
         </View>
       </FormSection>

       {/* Ringkasan */}
       <View style={styles.summaryCard}>
         <View style={styles.summaryRow}>
           <Text style={styles.summaryLabel}>Estimasi Biaya</Text>
           <Text style={styles.summaryValue}>Rp {paymentDetails.basePrice}</Text>
         </View>

         <View style={styles.summaryRow}>
           <Text style={styles.summaryLabel}>Diskon Voucher</Text>
           <Text style={styles.summaryDiscount}>- Rp {paymentDetails.discount}</Text>
         </View>

         <View style={styles.divider} />

         <View style={styles.summaryRow}>
           <Text style={styles.totalLabel}>Total Pembayaran</Text>
           <Text style={styles.totalValue}>Rp {paymentDetails.total}</Text>
         </View>
       </View>

       {/* Tombol Submit */}
       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
         {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.submitButtonText}>Lanjutkan ke Pembayaran</Text>}
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
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  totalLabel: { fontSize: 18, color: "#2C3E50", fontWeight: "bold" },
  totalValue: { fontSize: 18, color: "#FF6B00", fontWeight: "bold" },
  submitButton: {
    backgroundColor: "#FF6B00",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RegulerScreen;
