import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WordsLearning from "../../Screens/Dictionary/WordsLearning";
import WordsLearned from "../../Screens/Dictionary/WordsLearned";
import { fetchWords } from "../../Utils/Service/wordService";
import { getUserId } from "../../Utils/Service/authService";
import React, { useState, useEffect } from "react";
const Tab = createMaterialTopTabNavigator();

export default function DictioanryMaterialTop() {
  const [loading, setLoading] = useState(true);
  const [allWords, setAllWords] = useState([]);
  const [learningWordList, setLearningWordList] = useState([]);
  const [learnedWordList, setLearnedWordList] = useState([]);
  const [slicedLearningWordList, setSlicedLearningWordList] = useState([]);
  const [slicedLearnedWordList, setSlicedLearnedWordList] = useState([]);
  const [userId, setUserId] = useState("");
  const [learningWordsCount, setLearningWordsCount] = useState(0);
  const [learnedWordsCount, setLearnedWordsCount] = useState(0);
  const fetchData = async () => {
    setLoading(true);
    const userId = await getUserId();
    setUserId(userId);
    const { learningWords, allWords, learnedWords } = await fetchWords({
      userId: userId,
    });
    setLearningWordList(learningWords);
    setLearnedWordList(learnedWords);
    setSlicedLearningWordList(learningWords.slice(0, 20));
    setSlicedLearnedWordList(learnedWords.slice(0, 20));
    setAllWords(allWords);
    setLearningWordsCount(learningWords.length);
    setLearnedWordsCount(learnedWords.length);
    setLoading(false);
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
            loading={loading}
            setLoading={setLoading}
            fetchData={fetchData}
            allWords={allWords}
            setAllWords={setAllWords}
            learningWordList={learningWordList}
            setLearningWordList={setLearningWordList}
            setLearnedWordList={setLearnedWordList}
            slicedLearningWordList={slicedLearningWordList}
            setSlicedLearningWordList={setSlicedLearningWordList}
            setSlicedLearnedWordList={setSlicedLearnedWordList}
            userId={userId}
          />
        )}
      />
      <Tab.Screen
        name={`Learned${
          learnedWordsCount > 0 ? ` (${learnedWordsCount})` : ""
        }`}
        children={() => (
          <WordsLearned
            loading={loading}
            setLoading={setLoading}
            fetchData={fetchData}
            allWords={allWords}
            learnedWordList={learnedWordList}
            setLearningWordList={setLearningWordList}
            setLearnedWordList={setLearnedWordList}
            slicedLearnedWordList={slicedLearnedWordList}
            setSlicedLearnedWordList={setSlicedLearnedWordList}
            setSlicedLearningWordList={setSlicedLearningWordList}
            userId={userId}
          />
        )}
      />
    </Tab.Navigator>
  );
}
