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
  loadingState,
  setLoadingState,
  fetchData,
  allWords,
  learnedWordList,
  slicedLearnedWordList,
  setSlicedLearnedWordList,
}) {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
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
      {loadingState && (
        <View style={styles.listHeader}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <FlatList
        data={slicedLearnedWordList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <WordListLearned
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
