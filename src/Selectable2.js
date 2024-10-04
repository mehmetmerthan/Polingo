import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Ex = () => {
  const [text, setText] = useState("");
  const [selectedWords, setSelectedWords] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [multiSelectedMode, setMultiSelectedMode] = useState(false);
  useEffect(() => {
    const fetchTextFromApi = async () => {
      const response = await fetch(
        "https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=1"
      );
      const data = await response.json();
      setText(data[0]);
    };

    fetchTextFromApi();
  }, []);

  const handlePress = (word, index, event) => {
    const { pageX, pageY } = event.nativeEvent;
    setPosition({ x: pageX, y: pageY });
    setModalVisible(true);
    if (!multiSelectedMode) {
      setSelectedWords([{ word, index }]);
    } else if (selectedWords.length === 1 && multiSelectedMode) {
      const newSelectedWords = [...selectedWords, { word, index }];
      setSelectedWords(newSelectedWords);
    }
  };
  const handleLongPress = (word, index, event) => {
    const { pageX, pageY } = event.nativeEvent;
    setPosition({ x: pageX, y: pageY });
    setModalVisible(true);
    setMultiSelectedMode(true);
    if (selectedWords.length === 0) {
      setSelectedWords([{ word, index }]);
    }
  };
  const handlePressOut = () => {
    setMultiSelectedMode(false);
    setModalVisible(false);
    setSelectedWords([]);
  };
  const touchableWithoutFeedback = () => {
    if (!multiSelectedMode) {
      setModalVisible(false);
      setSelectedWords([]);
    }
  };
  const ModalSingleMode = () => {
    return (
      <View style={[styles.tooltip, { top: position.y, left: position.x }]}>
        <Text style={styles.tooltipText}>{getWordsBetween()}</Text>
      </View>
    );
  };
  const ModalMultiMode = () => {
    return (
      <View style={[styles.tooltip, { top: position.y, left: position.x }]}>
        <Text style={styles.tooltipText}>
          {selectedWords.map((word) => word.word).join(" ")}
        </Text>
        <Button onPress={handlePressOut} title="Close" />
      </View>
    );
  };
  const getWordsBetween = () => {
    if (selectedWords.length === 0) return "";
    if (selectedWords.length === 1) return selectedWords[0].word;

    const start = Math.min(selectedWords[0].index, selectedWords[1].index);
    const end = Math.max(selectedWords[0].index, selectedWords[1].index);

    return words.slice(start, end + 1).join(" ");
  };

  const words = text.split(" ");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.textContainer}>
        <Text style={styles.text}>
          {words.map((word, index) => (
            <TouchableOpacity
              key={index}
              onPress={(event) => handlePress(word, index, event)}
              onLongPress={(event) => handleLongPress(word, index, event)}
            >
              <Text style={styles.word}>{word} </Text>
            </TouchableOpacity>
          ))}
        </Text>
      </ScrollView>

      <View >
        {modalVisible && (
          <TouchableWithoutFeedback onPress={touchableWithoutFeedback}>
            {multiSelectedMode ? <ModalMultiMode /> : <ModalSingleMode />}
          </TouchableWithoutFeedback>
        )}
      </View>
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
  },
  modal: {
    flex: 1,
  },
  modalOverlayMutli: {
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

export default Ex;
