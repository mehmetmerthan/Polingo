import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Expo ikonları

const wordData = {
  word: "run",
  meaning: "koşmak",
  definitions: [
    {
      partOfSpeech: "noun",
      definition: "An act or spell of running.",
      example: "He went for a run in the park.",
    },
    {
      partOfSpeech: "verb",
      definition: "Move at a speed faster than a walk.",
      example: "He can run very fast.",
    },
  ],
};

const playSound = (text) => {
  Alert.alert("Ses çalınamıyor", `Ses oynatılıyor: ${text}`);
};

const translateText = (text) => {
  Alert.alert("Çeviri işlevi", `Çevirilecek metin: ${text}`);
};

export default function WordDetail() {
  const renderDefinition = ({ item }) => (
    <View style={styles.definitionContainer}>
      <Text style={styles.partOfSpeech}>{item.partOfSpeech}</Text>

      <View style={styles.row}>
        <Text style={styles.definition}>{item.definition}</Text>
        <TouchableOpacity onPress={() => translateText(item.definition)}>
          <Ionicons name="language-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.example}>Example: {item.example}</Text>
        <TouchableOpacity onPress={() => translateText(item.example)}>
          <Ionicons name="language-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => playSound(item.example)}>
        <Ionicons name="play-circle-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.wordContainer}>
        <Text style={styles.word}>{wordData.word}</Text>
        <TouchableOpacity onPress={() => playSound(wordData.word)}>
          <Ionicons name="play-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.meaning}>{wordData.meaning}</Text>

      <FlatList
        data={wordData.definitions}
        renderItem={renderDefinition}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  word: {
    fontSize: 32,
    fontWeight: "bold",
    marginRight: 10,
    textAlign: "center",
  },
  meaning: {
    fontSize: 24,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  definitionContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  partOfSpeech: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  definition: {
    fontSize: 16,
    color: "#666",
    flex: 1,
    marginRight: 10,
  },
  example: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#888",
    flex: 1,
    marginRight: 10,
  },
});
