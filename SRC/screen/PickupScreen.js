import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Switch, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from "../services/api";
import { Alert, ActivityIndicator } from "react-native";

const PickupScreen = ({ navigation }) => {
  const [serviceType, setServiceType] = useState("Reguler");
  const [isInsuranceEnabled, setIsInsuranceEnabled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  // DATA PENGIRIM
  const [senderName, setSenderName] = useState("");
  const [senderAddress, setSenderAddress] = useState("");

  // DATA PENERIMA
  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");

  // DETAIL BARANG
  const [weight, setWeight] = useState("");
  const [itemType, setItemType] = useState("paket");

  const [loading, setLoading] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const handleSubmit = async () => {
    if (!senderName || !senderAddress || !receiverName || !receiverAddress || !weight) {
      Alert.alert("Error", "Semua data wajib diisi");
      return;
    }

    try {
      setLoading(true);

      let serviceId = 2;

      if (serviceType === "Reguler") {
        serviceId = 2;
      } else if (serviceType === "Sameday") {
        serviceId = 1;
      } else if (serviceType === "Next Day") {
        serviceId = 3;
      }

      const response = await api.post("/orders", {
        sender_nama: senderName,
        sender_alamat: senderAddress,
        receiver_nama: receiverName,
        receiver_alamat: receiverAddress,
        service_id: serviceId,
        berat: weight,
        harga: 25000,
        jenis_barang: itemType,
      });

      console.log("ORDER BERHASIL", response.data);

      Alert.alert("Berhasil", "Pickup berhasil dijadwalkan");

      navigation.navigate("OrderScreen");
    } catch (error) {
      console.log("ERROR FULL:", error);

      if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", error.response.data);
      }

      Alert.alert("Error", JSON.stringify(error.response?.data || error.message));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Jadwalkan Penjemputan</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* DATA PENGIRIM */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Pengirim</Text>

          <View style={styles.inputGroup}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#7F8C8D"
              style={styles.icon}
            />
            <TextInput
              placeholder="Nama Pengirim"
              style={styles.input}
              value={senderName}
              onChangeText={setSenderName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons
              name="location-outline"
              size={20}
              color="#7F8C8D"
              style={styles.icon}
            />
            <TextInput
              placeholder="Alamat Penjemputan"
              style={[styles.input, { height: 80 }]}
              multiline
              value={senderAddress}
              onChangeText={setSenderAddress}
            />
          </View>
        </View>

        {/* DATA PENERIMA */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Penerima</Text>

          <View style={styles.inputGroup}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#7F8C8D"
              style={styles.icon}
            />
            <TextInput
              placeholder="Nama Penerima"
              style={styles.input}
              value={receiverName}
              onChangeText={setReceiverName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons
              name="location-outline"
              size={20}
              color="#7F8C8D"
              style={styles.icon}
            />
            <TextInput
              placeholder="Alamat Tujuan"
              style={[styles.input, { height: 80 }]}
              multiline
              value={receiverAddress}
              onChangeText={setReceiverAddress}
            />
          </View>
        </View>

        {/* DETAIL BARANG */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detail Barang</Text>

          <View style={styles.inputGroup}>
            <MaterialCommunityIcons
              name="weight-kilogram"
              size={20}
              color="#7F8C8D"
              style={styles.icon}
            />
            <TextInput
              placeholder="Berat Barang (kg)"
              style={styles.input}
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>

          <View style={styles.inputGroup}>
            <MaterialCommunityIcons
              name="package-variant"
              size={20}
              color="#7F8C8D"
              style={styles.icon}
            />
            <TextInput
              placeholder="Jenis Barang"
              style={styles.input}
              value={itemType}
              onChangeText={setItemType}
            />
          </View>
        </View>

        {/* JADWAL */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Jadwal Penjemputan</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={showDatepicker}
              style={styles.datePickerButton}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#2C3E50"
              />
              <Text style={styles.datePickerText}>
                {date.toLocaleDateString("id-ID")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={showTimepicker}
              style={styles.datePickerButton}
            >
              <Ionicons
                name="time-outline"
                size={20}
                color="#2C3E50"
              />
              <Text style={styles.datePickerText}>
                {time.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              is24Hour={true}
              onChange={onTimeChange}
            />
          )}
        </View>

        {/* JENIS LAYANAN */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Jenis Layanan</Text>

          <View style={styles.serviceSelector}>
            {["Reguler", "Sameday", "Next Day"].map((service) => (
              <TouchableOpacity
                key={service}
                style={[
                  styles.serviceButton,
                  serviceType === service &&
                  styles.activeServiceButton,
                ]}
                onPress={() => setServiceType(service)}
              >
                <Text
                  style={[
                    styles.serviceButtonText,
                    serviceType === service &&
                    styles.activeServiceButtonText,
                  ]}
                >
                  {service}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ASURANSI */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Opsi Tambahan</Text>

          <View style={styles.optionRow}>
            <Text style={styles.optionText}>
              Asuransi Pengiriman
            </Text>

            <Switch
              value={isInsuranceEnabled}
              onValueChange={setIsInsuranceEnabled}
            />
          </View>
        </View>

        {/* BIAYA */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>
              Estimasi Biaya
            </Text>

            <Text style={styles.totalValue}>
              Rp 25.000
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
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>
              Jadwalkan Penjemputan
            </Text>
          )}
        </TouchableOpacity>

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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
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
    color: '#2C3E50',
  },
  datePickerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  datePickerText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  serviceSelector: {
    flexDirection: 'row', justifyContent: 'space-between',
  },
  serviceButton: {
    flex: 1, paddingVertical: 12, borderRadius: 8,
    backgroundColor: '#F0F0F0', alignItems: 'center', marginHorizontal: 5,
  },
  activeServiceButton: {
    backgroundColor: '#FF6B00',
  },
  serviceButtonText: {
    fontSize: 14, color: '#2C3E50', fontWeight: 'bold',
  },
  activeServiceButtonText: {
    color: '#FFFFFF',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  optionText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  summaryCard: {
    backgroundColor: '#E9F5FF', // Warna latar yang berbeda untuk ringkasan
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#BDE0FE',
  },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PickupScreen;