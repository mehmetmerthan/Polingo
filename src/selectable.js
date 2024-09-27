import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const App = () => {
  const [text, setText] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fetchTextFromApi = async () => {
      const apiResponseText =
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      setText(apiResponseText);
    };

    fetchTextFromApi();
  }, []);

  const handleWordPress = (word, event) => {
    const { pageX, pageY } = event.nativeEvent;
    setPosition({ x: pageX, y: pageY });
    setSelectedWord(word);
    setModalVisible(true);
  };
  const words = text.split(" ");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.textContainer}>
        <Text style={styles.text}>
          {words.map((word, index) => (
            <TouchableOpacity
              key={index}
              onPress={(event) => handleWordPress(word, event)}
            >
              <Text style={styles.word}>{word} </Text>
            </TouchableOpacity>
          ))}
        </Text>
      </ScrollView>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View
              style={[styles.tooltip, { top: position.y, left: position.x }]}
            >
              <Text style={styles.tooltipText}>{selectedWord}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  word: {
    fontWeight: "bold",
    color: "blue",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipText: {
    fontSize: 16,
  },
});

export default App;
