import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";

import { StackNavigationProp } from '@react-navigation/stack';

// type MainLayoutProps = {
//   Stack: {
//     Navigator: React.ComponentType<any>;
//     Screen: React.ComponentType<any>;
//   };
// };

const MainLayout = () => {
   const colorScheme = useColorScheme();
  return (
    // <Stack.Navigator
    //   initialRouteName="index"
    //   screenOptions={{ headerShown: false }}
    // >
    //   <Stack.Screen
    //     name="index"
    //     component={Dashboard}
    //     options={{ title: "Dashboard", headerShown: false }}
    //   />
    //   <Stack.Screen
    //     name="chat"
    //     component={Chat}
    //     options={{ title: "Chat", headerShown: false }}
    //   />
    //   <Stack.Screen
    //     name="explore"
    //     component={Explore}
    //     options={{ title: "Explore", headerShown: false }}
    //   />
    // </Stack.Navigator>
     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(main)/dashboard" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

export default MainLayout;
