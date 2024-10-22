import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { addWord } from "../../Utils/Service/wordService";
import styles from "../../styles/wordsStyles";
import { Button, Input } from "@rneui/themed";
import { translateText } from "../../Utils/Service/translateService";
export const AddWordForm = ({
  setIsAddFormVisible,
  setLoadingState,
  fetchData,
  allWords,
}) => {
  const [newWord, setNewWord] = useState("");
  const [newWordTranslation, setNewWordTranslation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  const handleAddWord = async () => {
    if (!newWord.trim() || !newWordTranslation.trim()) {
      setErrorMessage("Both fields are required.");

      return;
    }
    if (allWords.some((word) => word.word === newWord)) {
      setErrorMessage("Word already exists.");

      return;
    }
    setLoadingState(true);
    setLoadingButton(true);
    const result = await addWord({
      newWord,
      newWordTranslation,
      setErrorMessage,
    });
    if (result) {
      await fetchData();
      setIsAddFormVisible(false);
      setLoadingState(false);
      setLoadingButton(false);
    }
  };
  async function handleTranslate() {
    setErrorMessage("");
    if (!newWord.trim()) {
      setErrorMessage("Please enter a word to translate.");
      return;
    }
    setLoadingTranslate(true);
    const result = await translateText({
      text: newWord,
      setError: setErrorMessage,
    });
    if (result) {
      setNewWordTranslation(result);
    }
    setLoadingTranslate(false);
  }
  const rightIcon = (
    <Button
      onPress={handleTranslate}
      icon={{ name: "translate", color: "#000000" }}
      color={"transparent"}
      loading={loadingTranslate}
      size="md"
      loadingStyle={{
        backgroundColor: "#000000",
        borderRadius: 50,
        width: 25,
        height: 25,
      }}
    />
  );

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
        multiline
      />
      <Input
        style={styles.input}
        placeholder="Turkish Meaning"
        value={newWordTranslation}
        onChangeText={setNewWordTranslation}
        clearButtonMode="always"
        rightIcon={rightIcon}
        multiline
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <Button
        title={"Add Word"}
        onPress={handleAddWord}
        containerStyle={styles.addButton}
        color={"#4CAF50"}
        loading={loadingButton}
        rightIcon={rightIcon}
      />
    </View>
  );
};
