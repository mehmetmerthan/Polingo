import React, { useState, useEffect } from "react";
import { Dialog, Divider } from "@rneui/themed";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function WordDetailModal({
  word,
  definition,
  setVisible,
  visible,
}) {
  const [wordData, setWordData] = useState([]);
  const [loading, setLoading] = useState(false);
  function toggleDialog() {
    setVisible(!visible);
  }
  async function fetchData() {
    if (!word) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`
      );
      const data = await response.json();
      const wordInfo = data[0];
      setWordData(wordInfo);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [word]);
  const playSound = (text) => {
    console.log("Ses çalınamıyor", `Ses oynatılıyor: ${text}`);
  };
  const translateText = (text) => {
    console.log("Çeviri işlevi", `Çevirilecek metin: ${text}`);
  };
  const renderDefinition = ({ item }) => (
    <View style={styles.definitionContainer}>
      <Text style={styles.partOfSpeech}>{item.partOfSpeech}</Text>

      <View style={styles.row}>
        <Text style={styles.definition} selectable={true}>
          {item.definitions[0].definition}
        </Text>
        <TouchableOpacity onPress={() => translateText(item.definition)}>
          <Ionicons name="language-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.example} selectable={true}>
          Example: {item.definitions[0].example}
        </Text>
        <TouchableOpacity
          onPress={() => translateText(item.definitions[0].example)}
        >
          <Ionicons name="language-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => playSound(item.definitions[0].example)}>
        <Ionicons name="play-circle-outline" size={30} color="black" />
      </TouchableOpacity>
      <Divider style={{ marginTop: 5 }} />
    </View>
  );
  return (
    <ScrollView style={styles.container}>
      <Dialog visible={visible}>
        {loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <>
            <View style={styles.wordContainer}>
              <Text style={styles.word}>{word}</Text>
              <TouchableOpacity onPress={() => playSound(wordData.word)}>
                <Ionicons name="play-circle-outline" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.meaning}>{definition}</Text>
            <Divider width={1} />
            <FlatList
              data={wordData?.meanings}
              renderItem={renderDefinition}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        )}
        <Dialog.Actions>
          <Dialog.Button onPress={toggleDialog} title="Close" />
        </Dialog.Actions>
      </Dialog>
    </ScrollView>
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
  },
  meaning: {
    fontSize: 20,
    color: "#555",
    marginBottom: 20,
  },
  definitionContainer: {
    marginVertical: 10,
  },
  partOfSpeech: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
    marginVertical: 10,
  },
});
