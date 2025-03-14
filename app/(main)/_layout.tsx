import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./index";
import Chat from "./chat";
import Explore from "./explore";

// Create a stack navigator
const Stack = createStackNavigator();

import { StackNavigationProp } from '@react-navigation/stack';

// type MainLayoutProps = {
//   Stack: {
//     Navigator: React.ComponentType<any>;
//     Screen: React.ComponentType<any>;
//   };
// };

const MainLayout = () => {
  return (
    <Stack.Navigator
      initialRouteName="explore"
      // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="index"
        component={Dashboard}
        options={{ title: "Dashboard", headerShown: false }}
      />
      <Stack.Screen
        name="chat"
        component={Chat}
        options={{ title: "Chat", headerShown: false }}
      />
      <Stack.Screen
        name="explore"
        component={Explore}
        options={{ title: "Explore", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainLayout;
