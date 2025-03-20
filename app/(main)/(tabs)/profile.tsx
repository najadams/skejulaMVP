import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={24} color="#007AFF" />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <MenuItem
          icon="person-outline"
          title="Edit Profile"
          onPress={() => {}}
        />
        <MenuItem
          icon="notifications-outline"
          title="Notifications"
          onPress={() => {}}
        />
        <MenuItem
          icon="lock-closed-outline"
          title="Privacy & Security"
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <MenuItem
          icon="calendar-outline"
          title="Schedule Preferences"
          onPress={() => {}}
        />
        <MenuItem
          icon="book-outline"
          title="Subject Preferences"
          onPress={() => {}}
        />
        <MenuItem icon="language-outline" title="Language" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <MenuItem
          icon="help-circle-outline"
          title="Help Center"
          onPress={() => {}}
        />
        <MenuItem
          icon="mail-outline"
          title="Contact Support"
          onPress={() => {}}
        />
        <MenuItem
          icon="document-text-outline"
          title="Terms of Service"
          onPress={() => {}}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#8E8E93",
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 12,
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
