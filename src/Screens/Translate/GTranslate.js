import { StyleSheet, View } from "react-native";
import { React, useRef } from "react";
import WebView from "react-native-webview";
import { Button } from "@rneui/themed";
export default function GTranslate() {
  const webViewRef = useRef(null);
  function handleOnRefresh() {
    webViewRef.current.reload();
  }
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://translate.google.com/?hl=tr&tab=TT&sl=en&tl=tr&op=translate",
        }}
        style={styles.webviewcontainer}
        ref={webViewRef}
      />
      <Button
        icon={{
          name: "refresh-circle",
          type: "ionicon",
          size: 40,
          color: "#208bdca6",
        }}
        onPress={handleOnRefresh}
        buttonStyle={styles.buttonStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webviewcontainer: {
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: "#ffffff00",
    alignSelf: "flex-end",
    marginBottom: 50,
  },
});
