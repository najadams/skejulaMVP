import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TutorCard } from "../../components/TutorCard";
import { Tutor } from "../../types/tutor";

const mockTutors: Tutor[] = [
  {
    id: "1",
    name: "John Smith",
    subjects: ["Mathematics", "Physics"],
    rating: 4.8,
    experience: 5,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    description:
      "Experienced tutor specializing in Mathematics and Physics. Helping students achieve their academic goals for over 5 years.",
    hourlyRate: 50,
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    subjects: ["Chemistry", "Biology"],
    rating: 4.9,
    experience: 3,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    description:
      "Passionate science tutor with expertise in Chemistry and Biology. Focused on making complex concepts easy to understand.",
    hourlyRate: 45,
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: "3",
    name: "Michael Brown",
    subjects: ["Computer Science", "Mathematics"],
    rating: 4.7,
    experience: 4,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    description:
      "Tech-savvy tutor specializing in Computer Science and Mathematics. Helping students build strong programming foundations.",
    hourlyRate: 55,
    availability: ["Monday", "Thursday", "Friday"],
  },
];

export default function TutorsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [tutors] = useState<Tutor[]>(mockTutors);

  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subjects.some((subject) =>
        subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleTutorPress = (tutor: Tutor) => {
    router.push(`/tutor/${tutor.id}`);
  };

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color="#8E8E93"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search tutors or subjects..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#8E8E93"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery("")}>
          <Ionicons name="close-circle" size={20} color="#8E8E93" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find a Tutor</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {renderSearchBar()}
      <ScrollView style={styles.content}>
        <View style={styles.tutorsList}>
          {filteredTutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onPress={handleTutorPress}
            />
          ))}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 0,
    margin: 16,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
  },
  tutorsList: {
    padding: 20,
  },
});
