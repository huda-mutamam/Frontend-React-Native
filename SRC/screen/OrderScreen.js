import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import api from "../services/api";

// ================= CARD =================
const OrderCard = ({ order, navigation }) => (
  <View style={styles.orderCard}>

    <View style={styles.cardHeader}>
      <Text style={styles.serviceText}>Order #{order.id}</Text>
      <Text style={styles.dateText}>
        {order.created_at
          ? new Date(order.created_at).toLocaleDateString()
          : "-"}
      </Text>
    </View>

    <View style={styles.cardBody}>

      <View style={styles.addressContainer}>
        <MaterialCommunityIcons name="map-marker" size={20} color="#7F8C8D" />

        <Text style={styles.addressText}>
          {order.receiver?.alamat_tujuan || "Alamat tujuan kosong"}
        </Text>
      </View>

      <Text style={styles.statusText}>
        Status: {order.status}
      </Text>

    </View>

    <TouchableOpacity
      style={styles.trackButton}
      onPress={() =>
        navigation.navigate("LacakPesananScreen", { orderId: order.id })
      }
    >
      <Text style={styles.trackButtonText}>Lacak</Text>
    </TouchableOpacity>

  </View>
);

// ================= SCREEN =================
const OrderScreen = ({ navigation }) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Aktif");

  // FETCH DATA
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders");

      console.log("API RESPONSE:", res.data);

      const data = Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      setOrders(data);

    } catch (error) {
      console.log("ERROR:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // FILTER
  const filteredOrders = (orders || []).filter((o) =>
    activeTab === "Aktif"
      ? o.status !== "Selesai"
      : o.status === "Selesai"
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Order Saya</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* TAB */}
      <View style={styles.tabContainer}>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Aktif" && styles.activeTab]}
          onPress={() => setActiveTab("Aktif")}
        >
          <Text style={[styles.tabText, activeTab === "Aktif" && styles.activeText]}>
            Aktif
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Selesai" && styles.activeTab]}
          onPress={() => setActiveTab("Selesai")}
        >
          <Text style={[styles.tabText, activeTab === "Selesai" && styles.activeText]}>
            Selesai
          </Text>
        </TouchableOpacity>

      </View>

      {/* CONTENT */}
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <OrderCard order={item} navigation={navigation} />
          )}
          contentContainerStyle={{ padding: 15 }}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 50 }}>
              Belum ada pesanan {activeTab}
            </Text>
          }
          refreshing={loading}
          onRefresh={fetchOrders}
        />
      )}

    </SafeAreaView>
  );
};

export default OrderScreen;

// ================= STYLE =================
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

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
  },

  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  activeTab: {
    borderBottomColor: "#FF6B00",
  },

  tabText: {
    color: "#777",
  },

  activeText: {
    color: "#FF6B00",
    fontWeight: "bold",
  },

  orderCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  serviceText: {
    fontWeight: "bold",
  },

  dateText: {
    color: "#888",
    fontSize: 12,
  },

  cardBody: {
    marginBottom: 10,
  },

  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  addressText: {
    marginLeft: 8,
    color: "#444",
  },

  statusText: {
    color: "#FF6B00",
    fontWeight: "bold",
  },

  trackButton: {
    backgroundColor: "#2C3E50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  trackButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});