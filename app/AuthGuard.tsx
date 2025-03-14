import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import MainLayout from "./(main)/_layout";

export default function AuthGuard() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      setCheckingAuth(false);

      if (true) {
        // router.replace("/(main)/dashboard"); 
        router.replace("/about"); 
      } else {
        router.replace("/(auth)"); 
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

  return ;
}
