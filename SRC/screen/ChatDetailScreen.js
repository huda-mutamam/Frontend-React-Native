import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Data dummy untuk pesan
const initialMessages = [
  { id: '0', text: 'Percakapan dimulai', type: 'system', time: '10:39' },
  { id: '1', text: 'Halo, saya mau tanya status paket AWB123456789.', sender: 'user', time: '10:40' },
  { id: '2', text: 'Halo, selamat pagi. Mohon ditunggu, sedang kami cek.', sender: 'support', time: '10:41' },
  { id: '3', text: 'Baik, terima kasih.', sender: 'user', time: '10:41' },
  { id: '4', text: 'Paket Anda saat ini sedang dalam perjalanan menuju kota tujuan. Estimasi tiba besok sore.', sender: 'support', time: '10:45' },
  { id: '5', type: 'typing' }, // Indikator mengetik
];

const ChatDetailScreen = ({ route, navigation }) => {
  const { chatName } = route.params; // Mengambil nama dari parameter navigasi

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerProfile}>
          <Ionicons name="headset" size={24} color="#FFFFFF" />
          <View>
            <Text style={styles.headerTitle}>{chatName}</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        <ScrollView contentContainerStyle={styles.messagesContainer}>
          {initialMessages.map(msg => {
            if (msg.type === 'system') {
              return (
                <View key={msg.id} style={styles.systemMessageContainer}>
                  <Text style={styles.systemMessageText}>{msg.text}</Text>
                </View>
              );
            }
            if (msg.type === 'typing') {
              return (
                <View key={msg.id} style={[styles.messageBubble, styles.supportBubble]}>
                  <Text style={styles.typingIndicator}>•••</Text>
                </View>
              );
            }
            return (
              <View
                key={msg.id}
                style={[styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.supportBubble]}
              >
                <Text style={styles.messageText}>{msg.text}</Text>
                <Text style={[styles.messageTime, msg.sender === 'support' && { color: '#A0A0A0' }]}>{msg.time}</Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ketik pesan..."
            style={styles.input}
            placeholderTextColor="#A0A0A0"
          />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F0' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#2C3E50', paddingHorizontal: 15, paddingVertical: 15, paddingTop: 20,
  },
  headerProfile: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  headerStatus: { color: '#B2DFDB', fontSize: 12, marginLeft: 10, fontStyle: 'italic' },
  messagesContainer: { padding: 15 },
  messageBubble: {
    maxWidth: '80%', padding: 12, borderRadius: 12, marginBottom: 10,
  },
  userBubble: {
    backgroundColor: '#FF6B00', alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  supportBubble: {
    backgroundColor: '#FFFFFF', alignSelf: 'flex-start',
    borderBottomLeftRadius: 0, elevation: 1,
  },
  messageText: { fontSize: 15, color: '#2C3E50' },
  messageTime: {
    fontSize: 11, color: '#FFFFFF90', alignSelf: 'flex-end', marginTop: 5,
  },
  systemMessageContainer: {
    alignSelf: 'center', backgroundColor: '#E0E0E0', borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 5, marginBottom: 15,
  },
  systemMessageText: {
    fontSize: 12, color: '#7F8C8D',
  },
  typingIndicator: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A0A0A0',
  },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', padding: 10,
    backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1, backgroundColor: '#F0F0F0', borderRadius: 20,
    paddingHorizontal: 15, paddingVertical: 10, fontSize: 16, color: '#2C3E50',
  },
  sendButton: {
    marginLeft: 10, backgroundColor: '#FF6B00', borderRadius: 25,
    width: 45, height: 45, justifyContent: 'center', alignItems: 'center',
  },
});

export default ChatDetailScreen;
 