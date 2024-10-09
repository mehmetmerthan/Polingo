import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { Button } from "@rneui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { translateText } from "../../../Utils/Service/translateService";
import { addWord, searchWord } from "../../../Utils/Service/wordService";
import { getUserId } from "../../../Utils/Service/authService";
export default function ReadingWebView() {
  const [selectedWord, setSelectedWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [isWordExist, setIsWordExist] = useState(false);
  const [isWordExistAlertVisible, setIsWordExistAlertVisible] = useState(false);
  const [loadingAddWord, setLoadingAddWord] = useState(false);
  const [error, setError] = useState("");
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

  async function onMessage(event) {
    setIsWordExist(false);
    setIsWordExistAlertVisible(false);
    setLoading(true);
    const word = event.nativeEvent.data;
    setSelectedWord(word);
    const translated = await translateText({ text: word, setError });
    setTranslatedWord(translated);
    setLoading(false);
  }
  async function addWordToDb() {
    setLoadingAddWord(true);
    const userId = await getUserId();
    const result = await searchWord({ userId, searchWord: selectedWord });
    if (result.length === 0) {
      await addWord({
        userId: userId,
        newWord: selectedWord,
        newWordTranslation: translatedWord,
      });
      setIsWordExist(true);
    } else {
      setIsWordExist(true);
      setIsWordExistAlertVisible(true);
    }
    setLoadingAddWord(false);
  }
  function handleBack() {
    webViewRef.current.goBack();
  }
  function handleOnRefresh() {
    webViewRef.current.reload();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title={"Back"} onPress={handleBack} />
        <Button title={"OnRefresh"} onPress={handleOnRefresh} />
      </View>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{
          uri: "https://www.cbsnews.com/news/tropical-storm-milton-forms-gulf-of-mexico-florida/",
        }}
        onMessage={onMessage}
        containerStyle={styles.webviewContainer}
        injectedJavaScript={injectScript}
      />
      {selectedWord ? (
        <View style={styles.wordContainer}>
          {loading ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : (
            <>
              {loadingAddWord ? (
                <ActivityIndicator style={styles.activityIndicator} />
              ) : (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={addWordToDb}
                >
                  {isWordExist ? (
                    <>
                      <AntDesign name="check" size={30} color="green" />
                      {isWordExistAlertVisible && (
                        <Text style={styles.existAlert}>
                          Word already exist
                        </Text>
                      )}
                    </>
                  ) : (
                    <MaterialIcons name="add" size={30} color="green" />
                  )}
                </TouchableOpacity>
              )}
              <View style={styles.selectedWordContainer}>
                <Text style={styles.selectedWordText}>{selectedWord}</Text>
                <Text style={styles.translatedText}>{translatedWord}</Text>
                <Text style={styles.errorText}>{error}</Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setSelectedWord("");
                  setTranslatedWord("");
                  setIsWordExist(false);
                  setIsWordExistAlertVisible(false);
                }}
              >
                <MaterialIcons name="cancel" size={30} color="black" />
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : null}
    </View>
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
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  existAlert: {
    color: "green",
    fontSize: 14,
    fontWeight: "200",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: "200",
  },
});
