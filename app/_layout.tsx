import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { View, Text } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   const [user, setUser] = useState<User | null>(null);
//   const [checkingAuth, setCheckingAuth] = useState(true); // ✅ Initially true

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
//       setUser(authenticatedUser);
//       setCheckingAuth(false);
//     });

//     return () => unsubscribe(); // ✅ Clean up the listener
//   }, []);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded || checkingAuth) {
//     return null; // ✅ Show nothing while checking authentication
//   }

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack initialRouteName="about">
//         <Stack.Screen
//           name="about"
//           options={{ headerShown: false, title: "he" }}
//         />

//         {/* {true ? (
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         ) : (
//           <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//         )} */}
//       </Stack>
//       <StatusBar style="auto" />
//       {/* <View>
//         <Text>hello</Text>
//       </View> */}
//     </ThemeProvider>
//   );
// }

export default function RootLayout() {
  return (
    <Stack initialRouteName="about">
      {/* <Stack.Screen name="index" options={{ title: "Home" }} /> */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
