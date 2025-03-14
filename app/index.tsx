// import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// import { auth } from "@/firebaseConfig";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { useFonts } from "expo-font";
// import { useNavigation } from "expo-router";

// export default function Page() {
//   const [user, setUser] = useState<User | null>(null);
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const navigation = useNavigation();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   useEffect(() => {
//     navigation.setOptions({headerShown: false})
//   })
//   // Check Firebase Auth State
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
//       setUser(authenticatedUser);
//       setCheckingAuth(false);
//     });

//     return () => unsubscribe(); // Cleanup the listener
//   }, []);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   // Handle Loading & No User
//   if (checkingAuth) {
//     return <Text>Checking authentication...</Text>;
//   }

//   if (!user) {
//     return <Text>No user logged in.</Text>;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <Text style={styles.title}>User Information</Text>
//         {Object.entries(user).map(([key, value], index) => (
//           <View key={index} style={styles.item}>
//             <Text style={styles.label}>{key}:</Text>
//             <Text style={styles.value}>{JSON.stringify(value, null, 2)}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f8f9fa",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   item: {
//     marginBottom: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 5,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#007BFF",
//   },
//   value: {
//     fontSize: 14,
//     color: "#333",
//   },
// });
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainLayout from './(main)/_layout';

const Page = () => {
  return (
    <NavigationContainer>
      <MainLayout />
    </NavigationContainer>
  );
};

export default Page;