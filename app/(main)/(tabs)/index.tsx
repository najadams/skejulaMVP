import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";

const Dashboard = () => {
  // Properly destructure the user from the context
  const { user } = useUser();

  useEffect(() => {
    console.log(user, "this is user data");
  }, [user]);

  // Add a null check to prevent errors if user is null
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <MaterialIcons name="edit" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
      {/* User Details Section */}
      <View style={styles.detailsSection}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userRole}>Role: {user.role}</Text>
      </View>
      {/* Quick Actions Section */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  editIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    elevation: 3,
  },
  detailsSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  userRole: {
    fontSize: 14,
    color: "#888",
  },
  actionsSection: {
    width: "100%",
  },
  actionButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Dashboard;
