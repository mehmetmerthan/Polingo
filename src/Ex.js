import { View, StyleSheet, Button } from "react-native";
import React from "react";
import { generateClient } from "aws-amplify/api";
import { wordByDate } from "./graphql/queries";
import { deleteWord, createWord, updateWord } from "./graphql/mutations";
const client = generateClient();
export default function Ex() {
  async function fetchData() {
    const wordDetails = {
      userWordsId: "04283428-6061-7012-f35b-fb347f8a0f53",
      isLearned: false,
      word: "word",
      translation: "translation",
      type: "word",
    };
    try {
      const { data } = await client.graphql({
        query: createWord,
        variables: { input: wordDetails },
      });
      const result = data.createWord;
      console.log("result", result);
    } catch (error) {
      console.error("Error adding the word", error);
    }
  }
  return (
    <View style={styles.container}>
      <Button title="Fetch" onPress={fetchData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
