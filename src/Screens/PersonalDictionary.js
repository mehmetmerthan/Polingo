import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SearchBar, ListItem, Button } from "@rneui/themed";
import { FloatingAction } from "react-native-floating-action";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function PersonalDictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [wordList, setWordList] = useState([
    { id: "1", english: "Hello", turkish: "Merhaba" },
    { id: "2", english: "World", turkish: "Dünya" },
    { id: "3", english: "Computer", turkish: "Bilgisayar" },
    { id: "4", english: "Book", turkish: "Kitap" },
    { id: "5", english: "Table", turkish: "Masa" },
    { id: "6", english: "Chair", turkish: "Sandalye" },
    { id: "7", english: "Car", turkish: "Araba" },
    { id: "8", english: "Bicycle", turkish: "Bisiklet" },
    { id: "9", english: "Bus", turkish: "Otobüs" },
    { id: "10", english: "Train", turkish: "Tren" },
  ]);
  const [newEnglishWord, setNewEnglishWord] = useState("");
  const [newTurkishWord, setNewTurkishWord] = useState("");
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const filteredWordList = wordList.filter(
    (item) =>
      item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.turkish.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const isWordExist = (english, turkish) => {
    return wordList.some(
      (item) =>
        item.english.toLowerCase() === english.toLowerCase() ||
        item.turkish.toLowerCase() === turkish.toLowerCase()
    );
  };
  const addWord = () => {
    if (newEnglishWord.trim() && newTurkishWord.trim()) {
      if (isWordExist(newEnglishWord, newTurkishWord)) {
        setErrorMessage("Bu kelime zaten mevcut");
        setShowError(true);
      } else {
        setWordList([
          ...wordList,
          {
            id: Math.random().toString(),
            english: newEnglishWord,
            turkish: newTurkishWord,
          },
        ]);
        setNewEnglishWord("");
        setNewTurkishWord("");
      }
      setShowError(false);
      setIsAddFormVisible(false);
    }
  };
  const renderItem = ({ item, index }) => (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <Button
          title="Info"
          onPress={() => reset()}
          icon={{ name: "info", color: "white" }}
          buttonStyle={{
            minHeight: "100%",
            borderRadius: 10,
          }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Delete"
          onPress={() => reset()}
          icon={{ name: "delete", color: "white", size: 20 }}
          buttonStyle={{
            backgroundColor: "red",
            borderRadius: 10,
            height: "100%",
            width: "80%",
          }}
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
          <Text style={styles.englishText}>{item.english}</Text>
          <Text style={styles.turkishText}>{item.turkish}</Text>
        </View>
        <TouchableOpacity style={styles.playIcon}>
          <AntDesign name="playcircleo" size={24} color="black" />
        </TouchableOpacity>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search a word..."
        onChangeText={setSearchTerm}
        value={searchTerm}
        platform="android"
        containerStyle={styles.searchBar}
      />
      <FlatList
        data={filteredWordList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      {!isAddFormVisible && (
        <FloatingAction
          position="right"
          onPressMain={() => setIsAddFormVisible(true)}
          floatingIcon={<Text style={styles.floatingButtonText}>+</Text>}
          color="#4CAF50"
          buttonSize={70}
        />
      )}
      {isAddFormVisible && (
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
            value={newEnglishWord}
            onChangeText={setNewEnglishWord}
          />
          <TextInput
            style={styles.input}
            placeholder="Turkish Meaning"
            value={newTurkishWord}
            onChangeText={setNewTurkishWord}
          />
          {showError && (
            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.addButton} onPress={addWord}>
            <Text style={styles.addButtonText}>Add Word</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  searchBar: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 20,
  },
  wordItemContainer: {
    backgroundColor: "#f2f2f2",
    padding: 12,
  },
  wordItem: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  wordTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  englishText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "600",
    padding: 10,
  },
  turkishText: {
    fontSize: 16,
    color: "#888",
    padding: 10,
  },
  evenItem: {
    backgroundColor: "#e4e4e4",
  },
  oddItem: {
    backgroundColor: "#ffffff",
  },
  playIcon: {
    marginLeft: "auto",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  inputContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  errorMessageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffcccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  errorMessage: {
    color: "#cc0000",
    fontSize: 14,
  },
  closeButton: {
    position: "absolute",
    top: -40,
    right: 0,
    borderRadius: 50,
    padding: 5,
  },
});
