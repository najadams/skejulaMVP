import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ScheduleScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const SessionCard = ({ title, time, tutor, status }) => (
    <TouchableOpacity style={styles.sessionCard}>
      <View style={styles.sessionTimeContainer}>
        <Text style={styles.sessionTime}>{time}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: status === "confirmed" ? "#E8F5E9" : "#FFF3E0" },
          ]}>
          <Text
            style={[
              styles.statusText,
              { color: status === "confirmed" ? "#2E7D32" : "#F57C00" },
            ]}>
            {status === "confirmed" ? "Confirmed" : "Pending"}
          </Text>
        </View>
      </View>
      <Text style={styles.sessionTitle}>{title}</Text>
      <View style={styles.tutorInfo}>
        <Ionicons name="person-circle-outline" size={20} color="#8E8E93" />
        <Text style={styles.tutorName}>{tutor}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Schedule</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.dateSelector}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.selectedDate}>
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.sessionsList}>
          <SessionCard
            title="Mathematics"
            time="10:00 AM - 11:30 AM"
            tutor="John Smith"
            status="confirmed"
          />
          <SessionCard
            title="Physics"
            time="2:00 PM - 3:30 PM"
            tutor="Sarah Johnson"
            status="pending"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
  },
  selectedDate: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  sessionsList: {
    padding: 20,
  },
  sessionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sessionTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sessionTime: {
    fontSize: 14,
    color: "#8E8E93",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  tutorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  tutorName: {
    fontSize: 14,
    color: "#8E8E93",
    marginLeft: 4,
  },
});
