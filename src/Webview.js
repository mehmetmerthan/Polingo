import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Button } from "@rneui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function Webview() {
  const [selectedWord, setSelectedWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState("ASdasdassadasdasdadsd");
  const webViewRef = useRef(null);

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
        <Button title={"Back"} onPress={handleBack} />
        <Button title={"OnRefresh"} onPress={handleOnRefresh} />
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
        <View style={styles.wordContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setSelectedWord("");
              setTranslatedWord("");
            }}
          >
            <AntDesign name="pluscircle" size={30} color="green" />
          </TouchableOpacity>
          <View style={styles.selectedWordContainer}>
            <Text style={styles.selectedWordText}>{selectedWord}</Text>
            <Text style={styles.translatedText}>{translatedWord}</Text>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setSelectedWord("");
              setTranslatedWord("");
            }}
          >
            <MaterialIcons name="cancel" size={30} color="black" />
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
  wordContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    maxHeight: 150,
  },
  selectedWordContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },
  selectedWordText: {
    fontSize: 16,
    color: "#000",
    textAlignVertical: "center",
    fontWeight: "500",
  },
  translatedText: {
    fontSize: 14,
    color: "#000",
    textAlignVertical: "center",
    fontWeight: "300",
  },
  closeButton: {
    justifyContent: "center",
    marginRight: 10,
  },
  wordButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
