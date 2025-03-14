import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import MainLayout from "./(main)/layout_test";

export default function AuthGuard() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      
      if (authenticatedUser) {
        // router.replace("/(main)/dashboard"); 
        router.replace("/(main)/dashboard"); 
      } else {
        router.replace("/(auth)/auth"); 
      }
    });
    
    setCheckingAuth(false);
    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (user) {
    return <MainLayout />;
  }
}
