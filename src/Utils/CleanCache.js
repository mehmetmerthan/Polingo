import { View, StyleSheet } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CleanCache() {
  const oxfordPath = `${FileSystem.documentDirectory}oxford.json`;
  async function deleteCache() {
    await FileSystem.deleteAsync(oxfordPath);
    await AsyncStorage.removeItem("geminiApiKey");
    await AsyncStorage.removeItem("hfToken");
  }
  async function checkCache() {
    const fileInfo = await FileSystem.getInfoAsync(oxfordPath);
    console.log("oxfordPath", fileInfo);
    const geminiKey = await AsyncStorage.getItem("geminiApiKey");
    console.log("geminiKey", geminiKey);
    const hfKey = await AsyncStorage.getItem("hfToken");
    console.log("hfKey", hfKey);
  }
  return (
    <View style={styles.container}>
      <Button
        title={"Delete Cache"}
        onPress={deleteCache}
        containerStyle={styles.button}
      />
      <Button
        title={"Check Cache"}
        onPress={checkCache}
        containerStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 50,
  },
});
