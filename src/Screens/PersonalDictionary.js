import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { SearchBarComponent } from "../components/SearchBarComponent";
import { WordList } from "../components/WordList";
import { AddWordForm } from "../components/AddWordForm";
import { fetchWords } from "../Utils/Service/wordService";
import { getUserId } from "../Utils/Service/authService";
import styles from "../styles/dictionaryStyles";

export default function PersonalDictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [wordList, setWordList] = useState([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userId = await getUserId();
      setUserId(userId);
      const { words, nextToken } = await fetchWords(userId);
      setWordList(words);
      setLoading(false);
      setNextToken(nextToken);
    };
    fetchData();
  }, []);

  const loadMoreWords = async () => {
    if (loading || !nextToken) return;
    setLoading(true);
    const { words: newWords, nextToken: newNextToken } = await fetchWords(
      userId,
      nextToken
    );
    setWordList((prevWords) => [...prevWords, ...newWords]);
    setNextToken(newNextToken);
    setLoading(false);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    const { words, nextToken } = await fetchWords(userId);
    setWordList(words);
    setNextToken(nextToken);
    setRefreshing(false);
  };
  useEffect(() => {
    const searchWords = async () => {
      setLoading(true);
      const { words } = await fetchWords(userId, null, searchTerm);
      setWordList(words);
      setLoading(false);
    };

    if (searchTerm.length > 0) {
      searchWords();
    } else {
      const fetchData = async () => {
        setLoading(true);
        const { words, nextToken } = await fetchWords(userId);
        setWordList(words);
        setLoading(false);
        setNextToken(nextToken);
      };
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
        data={wordList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <WordList
            item={item}
            index={index}
            setWordList={setWordList}
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
      {isAddFormVisible ? (
        <AddWordForm
          setIsAddFormVisible={setIsAddFormVisible}
          userId={userId}
          setWordList={setWordList}
          setLoading={setLoading}
        />
      ) : (
        <FloatingAction
          position="right"
          onPressMain={() => setIsAddFormVisible(true)}
          floatingIcon={<Text style={styles.floatingButtonText}>+</Text>}
          color="#4CAF50"
          buttonSize={70}
        />
      )}
    </View>
  );
}
