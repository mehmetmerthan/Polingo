import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from "../../styles/wordsStyles";
import { removeWord, changeWord } from "../../Utils/Service/wordService";
import WordDetailModal from "../../components/WordDetailModal";
import * as Speech from "expo-speech";
export const WordListLearning = ({
  item,
  index,
  setLoading,
  fetchData,
  setSlicedLearningWordList,
  setSlicedLearnedWordList,
  setLearningWordList,
  setLearnedWordList,
}) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingChange, setLoadingChange] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingSound, setLoadingSound] = useState(false);
  const [status, setStatus] = useState(item.isLearned);
  const handleDelete = async () => {
    try {
      setLoading(true);
      setLoadingDelete(true);
      const result = await removeWord(item.id);
      if (result) {
        setSlicedLearningWordList((prev) =>
          prev.filter((word) => word.id !== item.id)
        );
        setLearningWordList((prev) =>
          prev.filter((word) => word.id !== item.id)
        );
      }
      await fetchData();
      setLoading(false);
      setLoadingDelete(false);
    } catch (error) {
      console.error("Error deleting the word:", error);
    }
  };
  const handleStatus = async () => {
    try {
      setLoading(true);
      setLoadingChange(true);
      const updatedItem = { ...item, isLearned: !item.isLearned };
      const result = await changeWord({
        wordId: item.id,
        isLearned: !item.isLearned,
      });
      if (result) {
        setSlicedLearningWordList((prev) =>
          prev.filter((word) => word.id !== item.id)
        );
        setLearningWordList((prev) =>
          prev.filter((word) => word.id !== item.id)
        );
        setSlicedLearnedWordList((prev) => [updatedItem, ...prev]);
        setLearnedWordList((prev) => [updatedItem, ...prev]);
      }
      await fetchData();
      setLoading(false);
      setLoadingChange(false);
    } catch (error) {
      console.error("Error changing the word:", error);
    }
  };
  async function playSound(text) {
    if (loadingSound) return;
    setLoadingSound(true);
    Speech.speak(text, {
      onDone: () => {
        setLoadingSound(false);
      },
      onStopped: () => {
        setLoadingSound(false);
      },
      onError: () => {
        setLoadingSound(false);
      },
    });
  }
  return (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <Button
          title="Info"
          onPress={() => {
            setModalVisible(true);
            reset();
          }}
          icon={{ name: "info", color: "white" }}
          buttonStyle={{ minHeight: "100%", borderRadius: 10 }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Delete"
          onPress={() => {
            handleDelete();
            reset();
          }}
          icon={{ name: "delete", color: "white", size: 20 }}
          buttonStyle={{
            backgroundColor: "red",
            borderRadius: 10,
            height: "100%",
          }}
          loading={loadingDelete}
        />
      )}
      containerStyle={styles.wordItemContainer}
    >
      <ListItem.Content
        style={[
          styles.wordItem,
          index % 2 === 0 ? styles.oddItem : styles.evenItem,
        ]}
      >
        <ListItem.CheckBox
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          containerStyle={{
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
          uncheckedColor="#a1a1a1"
          checkedColor="#7f7f7f"
          onPress={() => {
            setStatus(!status);
            handleStatus();
          }}
          disabled={loadingChange}
          checked={status}
        />
        <View style={styles.wordTextContainer}>
          <Text style={styles.englishText}>{item.word}</Text>
          <Text style={styles.turkishText}>{item.translation}</Text>
        </View>
        <Button
          icon={{
            name: "play-circle-outline",
            color: "black",
            size: 30,
          }}
          onPress={() => playSound(item.word)}
          disabled={loadingSound}
          loading={loadingSound}
          color={"transparent"}
          loadingStyle={{
            borderRadius: 50,
          }}
        />
      </ListItem.Content>
      {modalVisible && (
        <WordDetailModal
          visible={modalVisible}
          setVisible={setModalVisible}
          word={item.word}
          definition={item.translation}
        />
      )}
    </ListItem.Swipeable>
  );
};
