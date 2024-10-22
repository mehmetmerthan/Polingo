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
import { AddWordForm } from "../../components/DictonaryComponents/AddWordForm";
import styles from "../../styles/wordsStyles";
import { WordListLearning } from "../../components/DictonaryComponents/WordListLearning";
export default function WordsLearning({
  loadingState,
  setLoadingState,
  fetchData,
  allWords,
  setAllWords,
  learningWordList,
  setSlicedLearningWordList,
  slicedLearningWordList,
}) {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const loadMoreWords = () => {
    if (loading || refreshing || searchTerm !== "") return;
    setLoading(true);
    const nextPage = page + 1;
    const newWords = learningWordList.slice(0, nextPage * pageSize);
    setSlicedLearningWordList(newWords);
    setPage(nextPage);
    setLoading(false);
  };
  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator animating size="large" />;
  };
  const onRefresh = async () => {
    if (refreshing || loading) return;
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };
  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === "") {
      setSlicedLearningWordList(learningWordList.slice(0, 20));
      return;
    }
    const filteredWords = allWords.filter((word) => {
      const wordName = word.word ? word.word.toLowerCase() : "";
      const wordTranslation = word.translation
        ? word.translation.toLowerCase()
        : "";
      return (
        wordName.includes(text.toLowerCase()) ||
        wordTranslation.includes(text.toLowerCase())
      );
    });
    setSlicedLearningWordList(filteredWords);
    setPage(1);
  };
  return (
    <View style={styles.container}>
      <SearchBarComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      {loadingState && (
        <View style={styles.listHeader}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <FlatList
        data={slicedLearningWordList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <WordListLearning
            item={item}
            index={index}
            setLoadingState={setLoadingState}
            fetchData={fetchData}
          />
        )}
        onEndReached={loadMoreWords}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {isAddFormVisible ? (
        <AddWordForm
          setIsAddFormVisible={setIsAddFormVisible}
          allWords={allWords}
          setLoadingState={setLoadingState}
          fetchData={fetchData}
          setAllWords={setAllWords}
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
