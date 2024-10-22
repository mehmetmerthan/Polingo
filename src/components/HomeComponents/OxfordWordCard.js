import { View, Text } from "react-native";
import { React, useEffect, useState } from "react";
import { Button, Card } from "@rneui/themed";
import oxford from "../../../data/oxford";
import styles from "../../styles/homeScreenStyles";
import { addWord } from "../../Utils/Service/wordService";
import * as Speech from "expo-speech";
import GlishModal from "../GlishModal";
import WordDetailModal from "../WordDetailModal";
import * as FileSystem from "expo-file-system";
export default function OxfordWordCard() {
  const [allWords, setAllWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [temp, setTemp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSound, setLoadingSound] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalGlishVisible, setModalGlishVisible] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isExist, setIsExist] = useState(false);
  const oxfordPath = `${FileSystem.documentDirectory}oxford.json`;
  useEffect(() => {
    const loadOxfordData = async () => {
      const fileInfo = await FileSystem.getInfoAsync(oxfordPath);
      if (!fileInfo.exists) {
        await FileSystem.writeAsStringAsync(oxfordPath, JSON.stringify(oxford));
      }
      const data = await FileSystem.readAsStringAsync(oxfordPath);
      const words = JSON.parse(data);
      setAllWords(words);
    };
    loadOxfordData();
  }, []);
  useEffect(() => {
    if (allWords.length > 0) {
      setCurrentWord(allWords[0]);
      setWordCount(allWords.length);
      setIsExist(true);
    }
  }, [allWords]);
  const handleDelete = async () => {
    setTemp(currentWord);
    const updatedWords = allWords.slice(1);
    await updateOxfordData(updatedWords);
    setAllWords(updatedWords);
  };
  const handleForwardToLearn = async () => {
    setLoading(true);
    const updatedWords = allWords.slice(1);
    await updateOxfordData(updatedWords);
    setAllWords(updatedWords);
    await addWord({
      newWord: currentWord.word,
      newWordTranslation: currentWord.meaning,
    });
    setLoading(false);
  };
  const updateOxfordData = async (updatedData) => {
    await FileSystem.writeAsStringAsync(
      oxfordPath,
      JSON.stringify(updatedData)
    );
  };
  const handleTemp = async () => {
    if (!temp) return;
    const updatedWords = [temp, ...allWords];
    await updateOxfordData(updatedWords);
    setAllWords(updatedWords);
    setTemp(null);
  };
  async function playSound(text) {
    if (loadingSound) return;
    setLoadingSound(true);
    Speech.speak(text, {
      onDone: () => {
        setLoadingSound(false);
      },
      onStopped: () => {
        setLoadingSound(false);
      },
      onError: () => {
        setLoadingSound(false);
      },
    });
  }
  return (
    <>
      {isExist && (
        <>
          <Card containerStyle={styles.cardContainer}>
            <Card.Title style={styles.cartTitle}>
              {`Check the oxford dictionary words \n ${wordCount} words left`}
            </Card.Title>
            <Card.Divider />
            <View style={styles.listItemContainer}>
              <View style={styles.oxfordWordsContainer}>
                <Text style={styles.oxfordWord}>
                  {currentWord?.word && currentWord?.word}
                </Text>
                <Text style={styles.oxfordMeaning}>
                  {currentWord?.meaning && currentWord?.meaning}
                </Text>
              </View>
              <View style={styles.oxfordInButtonContainer}>
                <Button
                  icon={{
                    name: "info",
                    type: "font-awesome",
                    size: 25,
                    color: "#208bdca6",
                  }}
                  buttonStyle={{
                    backgroundColor: "transparent",
                    marginRight: 10,
                  }}
                  onPress={() => setModalVisible(true)}
                />
                <Button
                  icon={{
                    name: "youtube-play",
                    type: "font-awesome",
                    size: 25,
                    color: "#208bdca6",
                  }}
                  buttonStyle={{
                    backgroundColor: "transparent",
                    marginRight: 10,
                  }}
                  onPress={() => setModalGlishVisible(true)}
                />
                <Button
                  icon={{
                    name: "volume-up",
                    type: "font-awesome",
                    size: 25,
                    color: "#208bdca6",
                  }}
                  buttonStyle={{
                    backgroundColor: "transparent",
                    marginRight: 10,
                  }}
                  onPress={() => playSound(currentWord.word)}
                  loading={loadingSound}
                />
              </View>
              <View style={styles.oxfordButtonContainer}>
                <Button
                  icon={{
                    name: "close",
                    type: "font-awesome",
                    size: 30,
                    color: "#F44336",
                  }}
                  buttonStyle={styles.buttonStyle}
                  onPress={handleForwardToLearn}
                  disabled={loading}
                />
                <Button
                  icon={{
                    name: "refresh",
                    type: "ionicon",
                    size: 30,
                    color: "#208bdca6",
                  }}
                  buttonStyle={styles.buttonStyle}
                  onPress={handleTemp}
                />
                <Button
                  icon={{
                    name: "check",
                    type: "font-awesome",
                    size: 30,
                    color: "#4CAF50",
                  }}
                  buttonStyle={styles.buttonStyle}
                  onPress={handleDelete}
                />
              </View>
            </View>
          </Card>
          {modalVisible && (
            <WordDetailModal
              visible={modalVisible}
              setVisible={setModalVisible}
              word={currentWord?.word}
            />
          )}
          {modalGlishVisible && (
            <GlishModal
              visible={modalGlishVisible}
              setVisible={setModalGlishVisible}
              word={currentWord?.word}
            />
          )}
        </>
      )}
    </>
  );
}
