import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { SearchBarComponent } from "../../components/DictonaryComponents/SearchBarComponent";
import { WordListLearning } from "../../components/DictonaryComponents/WordListLearning";
import { AddWordForm } from "../../components/DictonaryComponents/AddWordForm";
import { fetchWords } from "../../Utils/Service/wordService";
import { getUserId } from "../../Utils/Service/authService";
import styles from "../../styles/dictionaryStyles";

export default function DictionaryLearning({
  wordListLearning,
  setWordListLearning,
  setWordListLearned,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
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
      isLearned: false,
    });
    setWordListLearning(words);
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
    setWordListLearning(words);
    setLoading(false);
  };
  const loadMoreWords = async () => {
    if (loading || !nextToken) return;
    setLoading(true);
    const { words: newWords, nextToken: newNextToken } = await fetchWords({
      userId: userId,
      nextToken: nextToken,
      searchTerm: "",
      isLearned: false,
    });
    setWordListLearning((prevWords) => [...prevWords, ...newWords]);
    setNextToken(newNextToken);
    setLoading(false);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    const { words, nextToken } = await fetchWords({
      userId: userId,
      nextToken: null,
      searchTerm: "",
      isLearned: false,
    });
    setWordListLearning(words);
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
        data={wordListLearning}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <WordListLearning
            item={item}
            index={index}
            setWordListLearning={setWordListLearning}
            setLoading={setLoading}
            setWordListLearned={setWordListLearned}
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
          setWordListLearning={setWordListLearning}
          setWordListLearned={setWordListLearned}
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
