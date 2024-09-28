import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SearchBarComponent } from "../../components/DictonaryComponents/SearchBarComponent";
import { WordListLearned } from "../../components/DictonaryComponents/WordListLearned";
import { fetchWords } from "../../Utils/Service/wordService";
import { getUserId } from "../../Utils/Service/authService";
import styles from "../../styles/dictionaryStyles";

export default function DictionaryLearned({
  wordListLearned,
  setWordListLearned,
  setWordListLearning,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const userId = await getUserId();
    setUserId(userId);
    const { words, nextToken } = await fetchWords({
      userId: userId,
      nextToken: null,
      searchTerm: "",
      isLearned: true,
    });
    setWordListLearned(words);
    setLoading(false);
    setNextToken(nextToken);
  };
  const searchWords = async () => {
    setLoading(true);
    const { words } = await fetchWords({
      userId: userId,
      nextToken: null,
      searchTerm: searchTerm,
    });
    setWordListLearned(words);
    setLoading(false);
  };
  const loadMoreWords = async () => {
    if (loading || !nextToken) return;
    setLoading(true);
    const { words: newWords, nextToken: newNextToken } = await fetchWords({
      userId: userId,
      nextToken: nextToken,
      searchTerm: "",
      isLearned: true,
    });
    setWordListLearned((prevWords) => [...prevWords, ...newWords]);
    setNextToken(newNextToken);
    setLoading(false);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    const { words, nextToken } = await fetchWords({
      userId: userId,
      nextToken: null,
      searchTerm: "",
      isLearned: true,
    });
    setWordListLearned(words);
    setNextToken(nextToken);
    setRefreshing(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (searchTerm.length > 0) {
      searchWords();
    } else {
      fetchData();
    }
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <SearchBarComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <FlatList
        data={wordListLearned}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <WordListLearned
            item={item}
            index={index}
            setWordListLearned={setWordListLearned}
            setWordListLearning={setWordListLearning}
            setLoading={setLoading}
          />
        )}
        onEndReached={loadMoreWords}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
