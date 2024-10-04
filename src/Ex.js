import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function Ex() {
  const [selectedWord, setSelectedWord] = useState("");
  const webViewRef = useRef(null);
  // Dinamik metin
  const text =
    "This is a dynamic sample text. You can select any word here and long press to see the custom context menu.";

  // HTML içeriği dinamik text ile
  const htmlContent = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 100px;
          padding: 20px;
          text-align: center; /* Metni ortala */
        }
      </style>
    </head>
    <body>
      <p id="text-content">
        ${text}
      </p>
    </body>
    </html>
  `;
  const injectScript = `
  var materialIconsLink = document.createElement('link');
  materialIconsLink.rel = 'stylesheet';
  materialIconsLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  document.head.appendChild(materialIconsLink);
  
  let currentMenu = null;

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    var selectedText = window.getSelection().toString();
    if (selectedText) {
      if (currentMenu) {
        document.body.removeChild(currentMenu);
        currentMenu = null;
      }
      var menu = document.createElement('div');
      menu.style.position = 'fixed';
      menu.style.top = (e.clientY - 75) + 'px';
      menu.style.left = (e.clientX + 10) + 'px';
      menu.style.backgroundColor = '#ffffffff';
      menu.style.borderRadius = '10px';
      menu.style.boxShadow = '0px 2px 10px rgba(0, 0, 0, 0.4)';
      menu.style.padding = '10px';
      menu.style.zIndex = 1000;
      menu.style.border = '1px solid rgba(173, 173, 173, 1) ';
      var button1 = document.createElement('button');
      button1.innerHTML = '<i class="material-icons">translate</i>';
      button1.style.display = 'block';
      button1.style.color = '#000000';
      button1.onclick = function() {
        window.ReactNativeWebView.postMessage(selectedText);
        document.body.removeChild(menu);
        currentMenu = null;
      };

      menu.appendChild(button1);
      document.body.appendChild(menu);
      currentMenu = menu;
    }
  });
  document.addEventListener('click', function(e) {
    if (currentMenu) {
      document.body.removeChild(currentMenu);
      currentMenu = null;
    }
  });
`;

  const onMessage = (event) => {
    const word = event.nativeEvent.data;
    setSelectedWord(word);
    console.log("Selected word:", word);
  };

  function handleBack() {
    webViewRef.current.goBack();
  }
  function handleOnRefresh() {
    webViewRef.current.reload();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Back" onPress={handleBack} />
        <Button title="OnRefresh" onPress={handleOnRefresh} />
      </View>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{
          uri: "https://www.cnbc.com/2024/10/03/stock-market-today-live-updates.html",
        }}
        onMessage={onMessage}
        containerStyle={styles.webviewContainer}
        injectedJavaScript={injectScript}
      />
      {selectedWord ? (
        <View style={styles.selectedWordContainer}>
          <Text style={styles.selectedWordText}>{selectedWord}</Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedWord("");
            }}
            style={styles.closeButton}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  selectedWordContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    borderColor: "rgba(173, 173, 173, 1)",
    borderWidth: 1,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  selectedWordText: {
    fontSize: 16,
    color: "#000",
  },
  closeButton: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
});
