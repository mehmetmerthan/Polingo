import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WordsLearning from "../../Screens/Dictionary/WordsLearning";
import WordsLearned from "../../Screens/Dictionary/WordsLearned";
import { fetchWords } from "../../Utils/Service/wordService";
import React, { useState, useEffect } from "react";
const Tab = createMaterialTopTabNavigator();
export default function DictioanryMaterialTop() {
  const [loadingState, setLoadingState] = useState(true);
  const [allWords, setAllWords] = useState([]);
  const [learningWordList, setLearningWordList] = useState([]);
  const [learnedWordList, setLearnedWordList] = useState([]);
  const [slicedLearningWordList, setSlicedLearningWordList] = useState([]);
  const [slicedLearnedWordList, setSlicedLearnedWordList] = useState([]);
  const [learningWordsCount, setLearningWordsCount] = useState(0);
  const [learnedWordsCount, setLearnedWordsCount] = useState(0);
  const fetchData = async () => {
    setLoadingState(true);
    const { learningWords, allWords, learnedWords } = await fetchWords();
    setLearningWordList(learningWords);
    setLearnedWordList(learnedWords);
    setSlicedLearningWordList(learningWords.slice(0, 20));
    setSlicedLearnedWordList(learnedWords.slice(0, 20));
    setAllWords(allWords);
    setLearningWordsCount(learningWords.length);
    setLearnedWordsCount(learnedWords.length);
    setLoadingState(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
    >
      <Tab.Screen
        name={`Learn${
          learningWordsCount > 0 ? ` (${learningWordsCount})` : ""
        }`}
        children={() => (
          <WordsLearning
            loadingState={loadingState}
            setLoadingState={setLoadingState}
            fetchData={fetchData}
            allWords={allWords}
            setAllWords={setAllWords}
            learningWordList={learningWordList}
            slicedLearningWordList={slicedLearningWordList}
            setSlicedLearningWordList={setSlicedLearningWordList}
          />
        )}
      />
      <Tab.Screen
        name={`Learned${
          learnedWordsCount > 0 ? ` (${learnedWordsCount})` : ""
        }`}
        children={() => (
          <WordsLearned
            loadingState={loadingState}
            setLoadingState={setLoadingState}
            fetchData={fetchData}
            allWords={allWords}
            learnedWordList={learnedWordList}
            slicedLearnedWordList={slicedLearnedWordList}
            setSlicedLearnedWordList={setSlicedLearnedWordList}
          />
        )}
      />
    </Tab.Navigator>
  );
}
