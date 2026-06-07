import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar} from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import yang benar
import { Ionicons } from '@expo/vector-icons'; // Menggunakan nama asli untuk kejelasan
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Impor MaterialCommunityIcons
import { FontAwesome5 } from '@expo/vector-icons'; // Impor FontAwesome5 khusus untuk ikon pickup

export default function HomeScreen({ navigation }) {
  // Karena font sudah dimuat di App.js, kita tidak perlu memuatnya lagi di sini.

  // Data dummy untuk layanan
 const services = [
    { name: 'Reguler', icon: 'cube-outline', target: 'RegulerScreen' },
    { name: 'Dokumen', icon: 'mail-outline', target: 'DokumenScreen' },
    { name: 'Sameday', icon: 'rocket-outline', target: 'SamedayScreen' },
    { name: 'Next Day', icon: 'paper-plane-outline', target: 'NextDayScreen' },
    { name: 'Kargo', icon: 'bus-outline', target: 'KargoScreen' },
  ];
  const otherFeatures = [
    { name: 'Tagihan Saya', icon: 'file-document-outline', family: 'MaterialCommunityIcons', target: 'TagihanSayaScreen' },
    { name: 'Cari Drop Point', icon: 'map-marker', family: 'MaterialCommunityIcons', target: 'DropoffScreen' },
    { name: 'Pelacakan Internasional', icon: 'earth', family: 'MaterialCommunityIcons', target: 'PelacakanInternasionalScreen' },
  ];
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2C3E50' }}>
      <StatusBar style="light" backgroundColor="#2C3E50" />
      
      {/* 1. Top Navigation Bar (Header) - Pastikan Icon diimpor */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C3E50',
        paddingHorizontal: 15,
        paddingVertical: 10,
        paddingTop: 20, // Extra padding for status bar area
      }}>
        <Ionicons name="search-outline" size={24} color="#FFFFFF" />
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 20,
          marginLeft: 15,
        }}>
          <TextInput
            placeholder="Lacak Resi"
            placeholderTextColor="#7F8C8D"
            style={{
              paddingHorizontal: 15,
              paddingVertical: 8,
              color: '#FFFFFF',
              fontSize: 14,
            }}
          />
        </View>
        <TouchableOpacity>
          <Ionicons name="barcode-outline" size={24} color="#FFFFFF" style={{ marginHorizontal: 16 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 2. Background Area Atas (Banner) */}
          <View style={{
            backgroundColor: '#2C3E50',
            borderRadius: 14,
            padding: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
        </View>

        {/* Ini adalah View yang menggunakan style contentArea */}
        <View style={{
          backgroundColor: '#F0F0F0',
          padding: 15,
          marginTop: -10, // Agar menumpuk sedikit di atas banner
          zIndex: -1,
        }}>
          {/* 3. Poin & Voucher Section */}
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            flexDirection: 'row',
            padding: 20,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }}>
            <TouchableOpacity 
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navigation.navigate('BronzeScreen')}
            >
              <Ionicons name="medal-outline" size={28} color="#CD7F32" />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2C3E50' }}>Bronze</Text>
                <Text style={{ fontSize: 14, color: '#2C3E50' }}>0 Poin</Text>
              </View>
            </TouchableOpacity>
            <View style={{ width: 1, backgroundColor: '#E0E0E0', marginHorizontal: 10 }} />
            <TouchableOpacity 
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navigation.navigate('VoucherScreen')}
            >
              <Ionicons name="ticket-outline" size={28} color="#FFD700" />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2C3E50' }}>Voucher</Text>
                <Text style={{ fontSize: 14, color: '#2C3E50' }}>3 Voucher</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* 4. Layanan Cepat (Pickup & Dropoff) */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('PickupScreen')}
              style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 20,
              alignItems: 'center',
              marginHorizontal: 5,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }} >
              {/* Ikon truk untuk layanan Pickup */}
              <FontAwesome5 name="truck-pickup" size={28} color="#2C3E50" />
              <Text style={{ marginTop: 8, fontSize: 16, fontWeight: 'bold', color: '#2C3E50' }}>Pickup</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigation.navigate('DropoffScreen')}
              style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 20,
              alignItems: 'center',
              marginHorizontal: 5,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}>
              <Ionicons name="business-outline" size={32} color="#2C3E50" />
              <Text style={{ marginTop: 8, fontSize: 16, fontWeight: 'bold', color: '#2C3E50' }}>Dropoff</Text>
            </TouchableOpacity>
          </View>

          {/* 6. Bagian "Layanan Pengiriman" */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 }}>Layanan Pengiriman</Text>
            {/* Mengembalikan ke tata letak ke bawah (grid) */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {services.map((service, index) => (
                <TouchableOpacity key={index} style={{
                  width: '30%', 
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  padding: 15,
                  borderRadius: 12,
                  elevation: 1,
                  marginBottom: 15, // Jarak antar baris
                }}
                  onPress={() => service.target && navigation.navigate(service.target)}
                  disabled={!service.target}
                >
                  <Ionicons name={service.icon} size={30} color="#FF6B00" />
                  <Text style={{ marginTop: 8, fontSize: 14, color: '#2C3E50', fontWeight: '600' }}>{service.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

        
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
                {otherFeatures.map((feature, index) => (
                  <TouchableOpacity key={index} style={{
                    width: '30%',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    padding: 15,
                    borderRadius: 12,
                    elevation: 1,
                    marginBottom: 15,
                  }}
                    onPress={() => feature.target && navigation.navigate(feature.target)}
                    disabled={!feature.target}>
                    <MaterialCommunityIcons name={feature.icon} size={30} color="#2C3E50" />
                    <Text style={{
                      marginTop: 8,
                      fontSize: 12,
                      color: '#2C3E50',
                      fontWeight: '600',
                      textAlign: 'center', // Memastikan teks rata tengah
                    }}>{feature.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

          </View>
      </ScrollView>

      {/* 7. Bottom Navigation Bar (Ini hanya visual, fungsionalitasnya harus diatur di navigator) */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
      }}>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="star" size={24} color="#FF6B00" />
          <Text style={{ fontSize: 10, color: '#FF6B00', marginTop: 4 }}>Beranda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('OrderScreen')}>
          <Ionicons name="clipboard-outline" size={24} color="#7F8C8D" />
          <Text style={{ fontSize: 10, color: '#7F8C8D', marginTop: 4 }}>Order Saya</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('MembershipScreen')}>
          <Ionicons name="medal-outline" size={24} color="#7F8C8D" />
          <Text style={{ fontSize: 10, color: '#7F8C8D', marginTop: 4 }}>Grup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('ChatScreen')}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#7F8C8D" />
          <Text style={{ fontSize: 10, color: '#7F8C8D', marginTop: 4 }}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('ProfileScreen')}>
          <Ionicons name="person-outline" size={24} color="#7F8C8D" />
          <Text style={{ fontSize: 10, color: '#7F8C8D', marginTop: 4 }}>Saya</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}