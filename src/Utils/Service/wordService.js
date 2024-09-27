import { generateClient } from "aws-amplify/api";
import { wordByDate } from "../../graphql/queries";
import { deleteWord, createWord } from "../../graphql/mutations";
const client = generateClient();

export const fetchWords = async (userId, nextToken = null, searchTerm = "") => {
  try {
    let variables;
    if (searchTerm.length === 0) {
      variables = {
        type: "word",
        sortDirection: "DESC",
        filter: {
          isLearned: { eq: false },
          userWordsId: { eq: userId },
        },
        limit: 20,
        nextToken,
      };
    } else {
      variables = {
        type: "word",
        sortDirection: "DESC",
        filter: {
          userWordsId: { eq: userId },
          ...(searchTerm && {
            or: [
              { word: { contains: searchTerm.toLowerCase() } },
              {
                translation: {
                  contains: searchTerm.toLowerCase(),
                },
              },
            ],
          }),
        },
        limit: 10,
      };
    }
    const { data } = await client.graphql({ query: wordByDate, variables });
    return {
      words: data.wordByDate.items,
      nextToken: data.wordByDate.nextToken,
    };
  } catch (error) {
    console.error("Error fetching words", error);
  }
};

export const addWord = async (userId, newWord, newWordTranslation) => {
  const word = newWord.toLowerCase();
  const translation = newWordTranslation.toLowerCase();
  const wordDetails = {
    userWordsId: userId,
    isLearned: false,
    word: word,
    translation: translation,
    type: "word",
  };
  try {
    const { data } = await client.graphql({
      query: createWord,
      variables: { input: wordDetails },
    });
    console.log("data", data);
    const result = data.createWord;
    return result;
  } catch (error) {
    setErrorMessage("Error adding the word.");
    console.error("Error adding the word", error);
  }
};

export const removeWord = async (wordId) => {
  try {
    const { data } = await client.graphql({
      query: deleteWord,
      variables: { input: { id: wordId } },
    });
    const result = data.deleteWord;
    return result;
  } catch (error) {
    console.error("Error deleting the word", error);
  }
};
