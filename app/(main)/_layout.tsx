import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

export default function MainLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/auth" options={{ headerShown: false }} />
        {/* Any other screens you want at the main level */}
      </Stack>
      </SafeAreaView>
  );
}