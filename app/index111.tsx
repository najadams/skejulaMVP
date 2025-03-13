import { Text, View, StyleSheet, ScrollView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { useFonts } from "expo-font";

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // ✅ Check Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // ✅ Handle Loading & No User
  if (checkingAuth) {
    return <Text>Checking authentication...</Text>;
  }

  if (!user) {
    return <Text>No user logged in.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Information</Text>
      {Object.entries(user).map(([key, value], index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.label}>{key}:</Text>
          <Text style={styles.value}>{JSON.stringify(value, null, 2)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// ✅ Add Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  value: {
    fontSize: 14,
    color: "#333",
  },
});
