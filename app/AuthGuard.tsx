import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { UserProvider } from "@/context/UserContext";
import { Slot } from "expo-router";

// Define the user type
type UserStateType = {
  name: string;
  email: string;
  phone: string;
  emailverified: boolean;
  isanonymous: boolean;
  role: string;
  profilePicture: string;
} | null;

export default function AuthGuard() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  // Initialize with proper type
  const [initialUserState, setInitialUserState] = useState<UserStateType>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        // Set initial user state for context
        setInitialUserState({
          name: authenticatedUser.displayName || "User",
          email: authenticatedUser.email || "",
          phone: authenticatedUser.phoneNumber || "",
          emailverified: authenticatedUser.emailVerified || false,
          isanonymous: authenticatedUser.isAnonymous || false,
          role: "User", // Replace with actual role from Firestore
          profilePicture:
            authenticatedUser.photoURL || "https://via.placeholder.com/150",
        });

        setCheckingAuth(false);
        // Navigate to main tabs
        router.replace("/(main)/(tabs)");
      } else {
        setCheckingAuth(false);
        router.replace("/(auth)/auth");
      }
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  // Use Slot to render child routes
  return (
    <UserProvider initialUser={initialUserState}>
      <Slot />
    </UserProvider>
  );
}