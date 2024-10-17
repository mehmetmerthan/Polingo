import React, { useState, useEffect } from "react";
import { Dialog, Divider, Button } from "@rneui/themed";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { translateText } from "../Utils/Service/translateService";
import * as Speech from "expo-speech";
export default function WordDetailModal({
  word,
  definition,
  setVisible,
  visible,
}) {
  const [wordData, setWordData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [translations, setTranslations] = useState({});
  const [loadingTranslations, setLoadingTranslations] = useState({});
  const [loadingSound, setLoadingSound] = useState({});
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
  const playSound = (text, exampleKey) => {
    if (loadingSound[exampleKey]) return;
    setLoadingSound((prev) => ({ ...prev, [exampleKey]: true }));
    Speech.speak(text, {
      onDone: () => {
        setLoadingSound((prev) => ({ ...prev, [exampleKey]: false }));
      },
      onStopped: () => {
        setLoadingSound((prev) => ({ ...prev, [exampleKey]: false }));
      },
      onError: () => {
        setLoadingSound((prev) => ({ ...prev, [exampleKey]: false }));
      },
    });
  };

  const handleTranslate = async (text, key) => {
    if (translations[key]) return;
    setLoadingTranslations((prev) => ({ ...prev, [key]: true }));
    const translation = await translateText({ text: text });
    setTranslations((prev) => ({ ...prev, [key]: translation }));
    setLoadingTranslations((prev) => ({ ...prev, [key]: false }));
  };

  const renderDefinition = ({ item, index }) => {
    const definitionKey = `definition-${index}`;
    const exampleKey = `example-${index}`;
    return (
      <View style={styles.definitionContainer}>
        <Text style={styles.partOfSpeech}>{item.partOfSpeech}</Text>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.row}>
            <Text style={styles.definition} selectable={true}>
              {item.definitions[0].definition}
            </Text>
            <Button
              icon={{
                name: "translate",
                color: "black",
                size: 20,
              }}
              onPress={() =>
                handleTranslate(item.definitions[0].definition, definitionKey)
              }
              disabled={loadingTranslations[definitionKey]}
              loading={loadingTranslations[definitionKey]}
              color={"transparent"}
              loadingStyle={{
                borderRadius: 50,
              }}
            />
          </View>
          {translations[definitionKey] && (
            <Text style={styles.definitionTranslation}>
              {translations[definitionKey]}
            </Text>
          )}
        </View>
        {item?.definitions[0]?.example && (
          <>
            <View style={{ flexDirection: "column" }}>
              <View style={styles.row}>
                <Text style={styles.example} selectable={true}>
                  Example: {item.definitions[0].example}
                </Text>
                <Button
                  icon={{
                    name: "translate",
                    color: "black",
                    size: 20,
                  }}
                  onPress={() =>
                    handleTranslate(item.definitions[0].example, exampleKey)
                  }
                  disabled={loadingTranslations[exampleKey]}
                  loading={loadingTranslations[exampleKey]}
                  color={"transparent"}
                  loadingStyle={{
                    borderRadius: 50,
                  }}
                />
              </View>
              {translations[exampleKey] && (
                <Text style={styles.definitionTranslation}>
                  {translations[exampleKey]}
                </Text>
              )}
            </View>
            <Button
              icon={{
                name: "play-circle-outline",
                color: "black",
                size: 30,
              }}
              onPress={() => playSound(item.definitions[0].example, exampleKey)}
              disabled={loadingSound[exampleKey]}
              loading={loadingSound[exampleKey]}
              color={"transparent"}
              loadingStyle={{
                borderRadius: 50,
              }}
            />
            <Divider style={{ marginTop: 5 }} />
          </>
        )}
      </View>
    );
  };
  return (
    <Dialog visible={visible} style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={wordData?.meanings}
          renderItem={renderDefinition}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <>
              <View style={styles.wordContainer}>
                <Text style={styles.word}>{word}</Text>
                <Button
                  icon={{
                    name: "play-circle-outline",
                    color: "black",
                    size: 30,
                  }}
                  onPress={() => playSound(wordData.word, "word")}
                  disabled={loadingSound["word"]}
                  loading={loadingSound["word"]}
                  color={"transparent"}
                  loadingStyle={{
                    borderRadius: 50,
                  }}
                />
              </View>
              <Text style={styles.meaning}>{definition}</Text>
              <Divider width={1} />
            </>
          }
          ListHeaderComponentStyle={{ marginTop: 30 }}
        />
      )}
      <Dialog.Actions>
        <Button
          onPress={toggleDialog}
          title={"Close"}
          containerStyle={{ marginBottom: 20 }}
        />
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  definitionTranslation: {
    fontSize: 16,
    fontStyle: "italic",
    color: "black",
    flex: 1,
    marginVertical: 5,
    marginBottom: 15,
    fontWeight: "bold",
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
