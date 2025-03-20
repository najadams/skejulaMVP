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

export default function TutorsScreen() {
  const router = useRouter();

  const TutorCard = ({ name, subjects, rating, experience, image }) => (
    <TouchableOpacity style={styles.tutorCard}>
      <Image source={{ uri: image }} style={styles.tutorImage} />
      <View style={styles.tutorInfo}>
        <Text style={styles.tutorName}>{name}</Text>
        <View style={styles.subjectsContainer}>
          {subjects.map((subject, index) => (
            <View key={index} style={styles.subjectTag}>
              <Text style={styles.subjectText}>{subject}</Text>
            </View>
          ))}
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <Text style={styles.experienceText}>{experience} years experience</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find a Tutor</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8E8E93" />
          <Text style={styles.searchText}>Search by subject or tutor name</Text>
        </View>

        <View style={styles.tutorsList}>
          <TutorCard
            name="John Smith"
            subjects={["Mathematics", "Physics"]}
            rating={4.8}
            experience={5}
            image="https://randomuser.me/api/portraits/men/1.jpg"
          />
          <TutorCard
            name="Sarah Johnson"
            subjects={["Chemistry", "Biology"]}
            rating={4.9}
            experience={3}
            image="https://randomuser.me/api/portraits/women/1.jpg"
          />
          <TutorCard
            name="Michael Brown"
            subjects={["Computer Science", "Mathematics"]}
            rating={4.7}
            experience={4}
            image="https://randomuser.me/api/portraits/men/2.jpg"
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
  filterButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  searchText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#8E8E93",
  },
  tutorsList: {
    padding: 20,
  },
  tutorCard: {
    flexDirection: "row",
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
  tutorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  tutorInfo: {
    flex: 1,
  },
  tutorName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  subjectsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  subjectTag: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  subjectText: {
    fontSize: 12,
    color: "#2E7D32",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 4,
  },
  experienceText: {
    fontSize: 14,
    color: "#8E8E93",
  },
});
