import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const QuickAction = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#007AFF" />
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.subText}>Here's your schedule overview</Text>
      </View>

      <View style={styles.quickActions}>
        <QuickAction
          icon="calendar-outline"
          title="Schedule"
          onPress={() => router.push("/schedule")}
        />
        <QuickAction
          icon="people-outline"
          title="Find Tutor"
          onPress={() => router.push("/tutors")}
        />
        <QuickAction
          icon="book-outline"
          title="My Lessons"
          onPress={() => router.push("/schedule")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
        <View style={styles.sessionCard}>
          <View style={styles.sessionInfo}>
            <Text style={styles.sessionTitle}>Mathematics</Text>
            <Text style={styles.sessionTime}>Today, 2:00 PM</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Progress</Text>
        <View style={styles.progressCard}>
          <Text style={styles.progressText}>
            You've completed 3 sessions this week
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "60%" }]} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    padding: 5,
    backgroundColor: "#FFFFFF",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  subText: {
    fontSize: 16,
    color: "#8E8E93",
    marginTop: 4,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
  },
  quickAction: {
    alignItems: "center",
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 12,
    color: "#8E8E93",
  },
  section: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 15,
  },
  sessionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#F2F2F7",
    borderRadius: 10,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  sessionTime: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
  },
  progressCard: {
    backgroundColor: "#F2F2F7",
    padding: 15,
    borderRadius: 10,
  },
  progressText: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E5EA",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 3,
  },
});
