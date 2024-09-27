import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from "../styles/dictionaryStyles";
import { removeWord } from "../Utils/Service/wordService";
export const WordList = ({ item, index, setWordList, setLoading }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      setLoadingDelete(true);
      const result = await removeWord(item.id);
      if (result) {
        setWordList((prevList) =>
          prevList.filter((word) => word.id !== item.id)
        );
      }
      setLoading(false);
      setLoadingDelete(false);
    } catch (error) {
      console.error("Error deleting the word:", error);
    }
  };
  return (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <Button
          title="Info"
          onPress={() => reset()}
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
          index % 2 === 0 ? styles.evenItem : styles.oddItem,
        ]}
      >
        <View style={styles.wordTextContainer}>
          <Text style={styles.englishText}>{item.word}</Text>
          <Text style={styles.turkishText}>{item.translation}</Text>
        </View>
        <TouchableOpacity style={styles.playIcon}>
          <AntDesign name="playcircleo" size={24} color="black" />
        </TouchableOpacity>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};
