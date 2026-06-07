import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Data dummy untuk daftar chat
const chatList = [
  {
    id: '1',
    name: 'Customer Service',
    lastMessage: 'Baik, kami akan segera proses...',
    time: '10:45',
    unread: 0,
    icon: 'headset',
  },
  {
    id: '2',
    name: 'Kurir - AWB123456',
    lastMessage: 'Saya sudah di depan gerbang.',
    time: 'Kemarin',
    unread: 2,
    icon: 'bicycle',
  },
];

const EmptyState = () => (
  <View style={styles.contentContainer}>
    <Ionicons name="chatbubbles-outline" size={80} color="#CED4DA" />
    <Text style={styles.emptyText}>Belum Ada Percakapan</Text>
    <Text style={styles.emptySubText}>
      Semua percakapan Anda akan muncul di sini.
    </Text>
  </View>
);

const ChatScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Tombol kembali tidak diperlukan di halaman tab utama */}
        <Text style={styles.headerTitle}>Chat</Text>
        <TouchableOpacity onPress={() => alert('Fitur pencarian akan segera tersedia!')}>
          <Ionicons name="search" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {chatList.length === 0 ? (
          <EmptyState />
        ) : (
          chatList.map(chat => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatItem}
              onPress={() => navigation.navigate('ChatDetailScreen', { chatId: chat.id, chatName: chat.name })}
            >
              <View style={styles.avatar}>
                <Ionicons name={chat.icon} size={24} color="#2C3E50" />
              </View>
              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                </View>
                <View style={styles.chatFooter}>
                  <Text style={styles.lastMessage} numberOfLines={1}>{chat.lastMessage}</Text>
                  {chat.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{chat.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => alert('Mulai percakapan baru!')}
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
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
    fontWeight: 'bold'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 8,
  },
  scrollContainer: { flexGrow: 1, paddingVertical: 10 },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  chatContent: { flex: 1, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 12 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  chatName: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  chatTime: { fontSize: 12, color: '#7F8C8D' },
  chatFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  lastMessage: { fontSize: 14, color: '#7F8C8D', flex: 1 },
  unreadBadge: {
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#FF6B00',
    borderRadius: 30,
    elevation: 8,
  },
});

export default ChatScreen;