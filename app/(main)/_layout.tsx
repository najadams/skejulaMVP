import { Stack } from "expo-router";
import React from "react";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Any other screens you want at the main level */}
    </Stack>
  );
}