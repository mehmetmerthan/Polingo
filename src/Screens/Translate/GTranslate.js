import { StyleSheet } from "react-native";
import React from "react";
import WebView from "react-native-webview";
export default function GTranslate() {
  return (
    <WebView
      source={{ uri: "https://translate.google.com" }}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
