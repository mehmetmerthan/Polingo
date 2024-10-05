import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { listWords } from "./graphql/queries";
const client = generateClient();
export default function Ex() {
  async function search() {
    const userId = "04283428-6061-7012-f35b-fb347f8a0f53";
    const searchWord = "word-translation36";
    try {
      const variables = {
        filter: {
          userWordsId: { eq: userId },
          word: { eq: searchWord },
        },
      };
      const { data } = await client.graphql({ query: listWords, variables });
      const allWords = data.listWords.items;
      console.log("All words", allWords);
    } catch (error) {
      console.error("Error searching the word", error);
    }
  }

  useEffect(() => {
    search();
  }, []);
  return (
    <View>
      <Text>Ex</Text>
    </View>
  );
}
