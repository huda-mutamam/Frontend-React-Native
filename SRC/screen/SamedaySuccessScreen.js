import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import api from "../services/api";

const SamedaySuccessScreen = ({ navigation, route }) => {
  const orderId = route?.params?.orderId; // 🔥 FIX AMAN

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${orderId}`);
        setOrder(res.data.data);
      } catch (error) {
        console.log("ERROR FETCH:", error?.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
    else setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.successContainer}>
          <View style={styles.iconBackground}>
            <MaterialCommunityIcons name="rocket-launch" size={80} color="#fff" />
          </View>

          <Text style={styles.successTitle}>Pesanan Diterima!</Text>
          <Text style={styles.successSubtitle}>Kurir sedang memproses pengiriman Anda</Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Detail Pesanan</Text>

          <Text>ID: {order?.resi}</Text>

          <Text>Layanan: {order?.service?.nama_service || "Dokumen"}</Text>

          <Text>Status: {order?.status}</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("OrderScreen")}>
          <Text style={styles.primaryButtonText}>Lihat Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SamedaySuccessScreen;
