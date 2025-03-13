import React, { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Title,
  ToggleButton,
} from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { authInstance } from "@/firebaseConfig";

const AuthScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
      navigation.setOptions({ headerShown: false }); // ✅ Hide header
    }, [navigation]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = (values: { email: string; password: string }) => {
   isSignUp
      ? createUserWithEmailAndPassword(authInstance, values.email, values.password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User created: ", user);
          })
           .catch((error) => {
               console.error(error);
               setError(error.message);
           })
      : signInWithEmailAndPassword(authInstance, values.email, values.password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in: ", user);
          })
          .catch((error) => {
            console.error(error);
          });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</Title>
      </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              label="Email"
              mode="outlined"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={touched.email && !!errors.email}
              style={styles.input}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={touched.password && !!errors.password}
              style={styles.input}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={styles.button}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>

            <ToggleButton
              icon={isSignUp ? "account-arrow-left" : "account-plus"}
              onPress={() => setIsSignUp(!isSignUp)}
              style={styles.toggleButton}
            />
            <Text style={styles.toggleText}>
              {isSignUp
                ? "Already have an account? Sign In"
                : "Need an account? Sign Up"}
            </Text>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  toggleButton: {
    alignSelf: "center",
    marginTop: 20,
  },
  toggleText: {
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default AuthScreen;
