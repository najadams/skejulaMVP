import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUser } from "@/context/UserContext";

interface QuickActionProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
}

export default function HomeScreen() {
  const user = useUser();
  const router = useRouter();
  const [welcome, setWelcome] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const contentSlideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!welcome) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(contentSlideAnim, {
          toValue: -100,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [welcome]);

  useEffect(() => {
    setTimeout(() => {
      setWelcome(false);
    }, 5000);
  }, [user]);

  const QuickAction = ({ icon, title, onPress }: QuickActionProps) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <Ionicons name={icon} size={24} />
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        {/* <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color="#007AFF" />
        </TouchableOpacity> */}
      </View>
      <ScrollView style={styles.content}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.subText}>Here's your schedule overview</Text>
        </Animated.View>

        <Animated.View
          style={{
            transform: [{ translateY: contentSlideAnim }],
          }}>
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
        </Animated.View>
      </ScrollView>
      <TouchableOpacity
        style={styles.aiFab}
        onPress={() => router.push("/ai-chat" as any)}>
        <Ionicons name="chatbubble-ellipses" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  content: {
    flex: 1,
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
    backgroundColor: "#6200ee",
    borderRadius: 3,
  },
  aiFab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
