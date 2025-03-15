import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import React from "react";

export default function MainLayout() {
  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/auth" options={{ headerShown: false }} />
        {/* Any other screens you want at the main level */}
      </Stack>
  );
}