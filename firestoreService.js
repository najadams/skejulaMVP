import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

// Function to add user preferences
export const addUserPreferences = async (userId, preferences) => {
  try {
    await setDoc(doc(db, "users", userId), { preferences }, { merge: true });
    console.log("User preferences saved!");
  } catch (error) {
    console.error("Error saving preferences:", error);
  }
};

// Function to add a new AI-generated schedule
export const addUserSchedule = async (userId, scheduleData) => {
  try {
    const scheduleRef = doc(collection(db, "users", userId, "schedule"));
    await setDoc(scheduleRef, {
      ...scheduleData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    console.log("Schedule added!");
  } catch (error) {
    console.error("Error adding schedule:", error);
  }
};

// Function to get all schedules for a user
export const getUserSchedules = async (userId) => {
  try {
    const snapshot = await getDocs(collection(db, "users", userId, "schedule"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching schedules:", error);
  }
};

// Function to update progress on a schedule
export const updateProgress = async (userId, scheduleId, lesson) => {
  try {
    const scheduleRef = doc(db, "users", userId, "schedule", scheduleId);
    await updateDoc(scheduleRef, {
      "progress.completedLessons": arrayUnion(lesson),
    });
    console.log("Progress updated!");
  } catch (error) {
    console.error("Error updating progress:", error);
  }
};
