import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import api from "../services/api";

// trackingHistory will be loaded from API

const TrackingItem = ({ item, isLast }) => (
  <View style={styles.trackingItem}>
    <View style={styles.timeline}>
      <View style={[styles.timelineDot, item.isCompleted && styles.completedDot]} />
      {!isLast && <View style={[styles.timelineLine, item.isCompleted && styles.completedLine]} />}
    </View>
    <View style={styles.trackingDetails}>
      <Text style={[styles.statusText, !item.isCompleted && styles.pendingStatus]}>{item.status}</Text>
      <Text style={styles.locationText}>{item.location}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  </View>
);

const LacakPesananScreen = ({ route, navigation }) => {
  // Ambil orderId dan service dari parameter navigasi
  const { orderId = 'N/A', service = 'Layanan' } = route.params || {};

  const [trackingHistory, setTrackingHistory] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchTracking = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/orders/${orderId}/tracking`);
        const data = response.data || {};

        // Try common response shapes
        const history = data.trackingHistory || data.history || data.tracking || (Array.isArray(data) ? data : []);
        if (isMounted) setTrackingHistory(Array.isArray(history) ? history : []);

        // order info (resi/service) fallback to route params
        const info = data.order || data.orderInfo || null;
        if (isMounted) setOrderInfo(info);
      } catch (err) {
        console.log('TRACKING FETCH ERROR', err);
        Alert.alert('Gagal', 'Gagal mengambil data pelacakan');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTracking();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lacak Pesanan</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FF6B00" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lacak Pesanan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Kartu Info Pesanan */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>No. Resi</Text>
            <Text style={styles.infoValue}>{orderInfo?.resi || orderInfo?.orderId || orderId}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Layanan</Text>
            <Text style={styles.infoValue}>{orderInfo?.service || service}</Text>
          </View>
        </View>

        {/* Timeline Pelacakan */}
        <View style={styles.trackingContainer}>
          <Text style={styles.sectionTitle}>Riwayat Perjalanan</Text>
          {trackingHistory.length === 0 ? (
            <Text>Belum ada riwayat perjalanan untuk pesanan ini.</Text>
          ) : (
            trackingHistory.map((item, index) => (
              <TrackingItem key={index} item={item} isLast={index === trackingHistory.length - 1} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2C3E50',
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 15,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  trackingContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  trackingItem: {
    flexDirection: 'row',
  },
  timeline: {
    alignItems: 'center',
    marginRight: 15,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#CED4DA',
  },
  completedDot: {
    backgroundColor: '#FF6B00',
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#CED4DA',
  },
  completedLine: {
    backgroundColor: '#FF6B00',
  },
  trackingDetails: {
    flex: 1,
    paddingBottom: 25,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  pendingStatus: {
    color: '#7F8C8D',
  },
  locationText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 4,
  },
});

export default LacakPesananScreen;