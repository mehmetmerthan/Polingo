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
import { WordListLearned } from "../../components/DictonaryComponents/WordListLearned";
export default function WordsLearned({
  loading,
  setLoading,
  fetchData,
  allWords,
  userId,
  learnedWordList,
  setSlicedLearningWordList,
  slicedLearnedWordList,
  setSlicedLearnedWordList,
  setLearningWordList,
  setLearnedWordList,
}) {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const loadMoreWords = () => {
    if (loading || refreshing) return;
    setLoading(true);
    const nextPage = page + 1;
    const newWords = learnedWordList.slice(0, nextPage * pageSize);
    setSlicedLearnedWordList(newWords);
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

  return (
    <View style={styles.container}>
      <SearchBarComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <FlatList
        data={slicedLearnedWordList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <WordListLearned
            item={item}
            index={index}
            setLoading={setLoading}
            fetchData={fetchData}
            setSlicedLearningWordList={setSlicedLearningWordList}
            setSlicedLearnedWordList={setSlicedLearnedWordList}
            setLearningWordList={setLearningWordList}
            setLearnedWordList={setLearnedWordList}
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
          userId={userId}
          allWords={allWords}
          setLoading={setLoading}
          fetchData={fetchData}
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
