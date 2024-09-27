import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { addWord } from "../Utils/Service/wordService";
import styles from "../styles/dictionaryStyles";
import { Button } from "@rneui/themed";

export const AddWordForm = ({
  setIsAddFormVisible,
  userId,
  setWordList,
  setLoading,
}) => {
  const [newWord, setNewWord] = useState("");
  const [newWordTranslation, setNewWordTranslation] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const handleAddWord = async () => {
    if (!newWord.trim() || !newWordTranslation.trim()) {
      setErrorMessage("Both fields are required.");
      setShowError(true);
      return;
    }
    setLoading(true);
    setLoadingButton(true);
    const result = await addWord(
      userId,
      newWord,
      newWordTranslation,
      setErrorMessage,
      setLoading
    );
    if (result) {
      setWordList((prevList) => [result, ...prevList]);
      setIsAddFormVisible(false);
      setLoading(false);
      setLoadingButton(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setIsAddFormVisible(false)}
      >
        <AntDesign name="closecircle" size={28} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="English Word"
        value={newWord}
        onChangeText={setNewWord}
      />
      <TextInput
        style={styles.input}
        placeholder="Turkish Meaning"
        value={newWordTranslation}
        onChangeText={setNewWordTranslation}
      />
      {showError && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <Button
        title={"Add Word"}
        onPress={handleAddWord}
        containerStyle={styles.addButton}
        color={"#4CAF50"}
        loading={loadingButton}
      />
    </View>
  );
};
