import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the navigation prop type
type RootStackParamList = {
  Dashboard: undefined;
  SignUp: undefined;
};

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const SignInScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  return (
    <LinearGradient colors={["#1e1e2f", "#3b1e5e"]} style={styles.container}>
      <Animatable.View animation="fadeInDown" style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Dashboard")}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.link}>Don’t have an account? Sign Up</Text>
        </TouchableOpacity>
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  header: { alignItems: "center", marginBottom: 40 },
  title: { fontSize: 32, color: "#fff", fontWeight: "bold" },
  subtitle: { fontSize: 16, color: "#ccc" },
  form: { alignItems: "center" },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#2a2a3c",
    borderRadius: 10,
    color: "#fff",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#00d4ff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  link: { color: "#00d4ff", fontSize: 14 },
});

export default SignInScreen;
