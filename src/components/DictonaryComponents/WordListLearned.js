import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from "../../styles/wordsStyles";
import { removeWord, changeWord } from "../../Utils/Service/wordService";
import WordDetailModal from "../../components/WordDetailModal";
export const WordListLearned = ({
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
  const [status, setStatus] = useState(item.isLearned);
  const handleDelete = async () => {
    try {
      setLoading(true);
      setLoadingDelete(true);
      const result = await removeWord(item.id);
      if (result) {
        setSlicedLearnedWordList((prev) =>
          prev.filter((word) => word.id !== item.id)
        );
        setLearnedWordList((prev) =>
          prev.filter((word) => word.id !== item.id)
        );
        await fetchData();
      }
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
        setSlicedLearnedWordList((prev) =>
          prev.filter((word) => word.id !== item.id)
        );
        setLearnedWordList((prev) =>
          prev.filter((word) => word.id !== item.id)
        );
        setSlicedLearningWordList((prev) => [updatedItem, ...prev]);
        setLearningWordList((prev) => [updatedItem, ...prev]);
        await fetchData();
      }
      setLoading(false);
      setLoadingChange(false);
    } catch (error) {
      console.error("Error changing the word:", error);
    }
  };
  async function playSound(text) {
    console.log("Ses çalınamıyor", `Ses oynatılıyor: ${text}`);
  }
  return (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <Button
          title="Info"
          onPress={() => {
            reset();
            setModalVisible(true);
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
        <TouchableOpacity style={styles.playIcon}>
          <AntDesign name="playcircleo" size={24} color="black" />
        </TouchableOpacity>
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
