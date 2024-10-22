import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/themed";
import { signOut } from "aws-amplify/auth";
export default function ProfileScreen() {
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [hfToken, setHfToken] = useState("");
  const [savedGeminiApiKey, setSavedGeminiApiKey] = useState(false);
  const [savedHfToken, setSavedHfToken] = useState(false);
  const [loadingGeminiApiKey, setLoadingGeminiApiKey] = useState(false);
  const [loadingHfToken, setLoadingHfToken] = useState(false);
  const [loadingLogOut, setLoadingLogOut] = useState(false);
  useEffect(() => {
    const loadApiKeys = async () => {
      try {
        const geminiKey = await AsyncStorage.getItem("geminiApiKey");
        const hfKey = await AsyncStorage.getItem("hfToken");
        if (geminiKey) setSavedGeminiApiKey(true);
        if (hfKey) setSavedHfToken(true);
      } catch (e) {
        console.error(e);
      }
    };

    loadApiKeys();
  }, []);
  const saveGeminiKey = async () => {
    try {
      setLoadingGeminiApiKey(true);
      await AsyncStorage.setItem("geminiApiKey", geminiApiKey);
      setSavedGeminiApiKey(geminiApiKey);
      setLoadingGeminiApiKey(false);
      setGeminiApiKey("");
      Alert.alert("Success", "Gemini API Key saved");
    } catch (e) {
      console.log(e);
    }
  };
  const saveHfToken = async () => {
    try {
      setLoadingHfToken(true);
      await AsyncStorage.setItem("hfToken", hfToken);
      setSavedHfToken(hfToken);
      setLoadingHfToken(false);
      setHfToken("");
      Alert.alert("Success", "HF Token saved");
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async () => {
    try {
      setLoadingLogOut(true);
      await signOut();
      setLoadingLogOut(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Gemini API Key</Text>
        {savedGeminiApiKey && <Text style={styles.existText}>Key exist</Text>}
        <TextInput
          style={styles.input}
          placeholder={savedGeminiApiKey ? "Saved" : "Enter Gemini API Key"}
          value={geminiApiKey}
          onChangeText={setGeminiApiKey}
        />
        <Button
          icon={{
            name: "save",
            type: "ionicon",
            color: "#208bdca6",
          }}
          onPress={saveGeminiKey}
          buttonStyle={styles.saveButton}
          loading={loadingGeminiApiKey}
          loadingProps={{ color: "#208bdca6" }}
        />
        <Text style={styles.label}>HF Token</Text>
        {savedHfToken && <Text style={styles.existText}>Key exist</Text>}
        <TextInput
          style={styles.input}
          placeholder={savedHfToken ? "Saved" : "Enter HF Token"}
          value={hfToken}
          onChangeText={setHfToken}
        />
        <Button
          icon={{ name: "save", type: "ionicon", color: "#208bdca6" }}
          onPress={saveHfToken}
          buttonStyle={styles.saveButton}
          loading={loadingHfToken}
          loadingProps={{ color: "#208bdca6" }}
        />
      </View>
      <Button
        title={"Log Out"}
        icon={{ name: "logout", type: "material-community", color: "red" }}
        onPress={logOut}
        buttonStyle={styles.logoutButton}
        type="outline"
        color={"red"}
        titleStyle={{ color: "red" }}
        loading={loadingLogOut}
        loadingProps={{ color: "red" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  logoutButton: {
    marginBottom: 20,
    borderColor: "red",
  },
  saveButton: {
    backgroundColor: "transparent",
    alignSelf: "flex-end",
  },
  existText: {
    color: "green",
    fontWeight: "200",
  },
});
