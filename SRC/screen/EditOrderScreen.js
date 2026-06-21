import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

const EditOrderScreen = ({ route, navigation }) => {
  const { orderId } = route.params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Sesuaikan field ini dengan kolom tabel "orders" di backend Anda
  const [form, setForm] = useState({
    alamat_tujuan: "",
    catatan: "",
    berat: "",
  });

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/orders/${orderId}`);
      const order = res.data?.data || res.data;

      setForm({
        alamat_tujuan: order?.receiver?.alamat_tujuan || "",
        catatan: order?.catatan || "",
        berat: order?.berat ? String(order.berat) : "",
      });
    } catch (error) {
      console.log("FETCH ORDER ERROR:", error?.response?.data || error);
      Alert.alert("Gagal", "Tidak bisa memuat data pesanan.");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!form.alamat_tujuan.trim()) {
      Alert.alert("Validasi", "Alamat tujuan tidak boleh kosong.");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/orders/${orderId}`, {
        alamat_tujuan: form.alamat_tujuan,
        catatan: form.catatan,
        berat: form.berat ? Number(form.berat) : undefined,
      });

      Alert.alert("Berhasil", "Pesanan berhasil diperbarui", [{ text: "OK", onPress: () => navigation.goBack() }]);
    } catch (error) {
      console.log("UPDATE ERROR:", error?.response?.data || error);
      const message = error?.response?.data?.message || "Gagal menyimpan perubahan.";
      Alert.alert("Gagal", message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Pesanan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Alamat Tujuan</Text>
        <TextInput style={styles.input} value={form.alamat_tujuan} onChangeText={(v) => handleChange("alamat_tujuan", v)} placeholder="Masukkan alamat tujuan" multiline />

        <Text style={styles.label}>Berat (kg)</Text>
        <TextInput style={styles.input} value={form.berat} onChangeText={(v) => handleChange("berat", v)} placeholder="Masukkan berat barang" keyboardType="numeric" />

        <Text style={styles.label}>Catatan</Text>
        <TextInput style={[styles.input, { height: 90, textAlignVertical: "top" }]} value={form.catatan} onChangeText={(v) => handleChange("catatan", v)} placeholder="Catatan tambahan (opsional)" multiline />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
          {saving ? <ActivityIndicator color="#FFF" /> : <Text style={styles.saveButtonText}>Simpan Perubahan</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditOrderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },

  header: {
    flexDirection: "row",
    backgroundColor: "#2C3E50",
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  form: {
    padding: 20,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 14,
    color: "#2C3E50",
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  saveButton: {
    backgroundColor: "#FF6B00",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },

  saveButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
