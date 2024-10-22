import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import { Button } from "@rneui/themed";
import YoutubePlayer from "react-native-youtube-iframe";
import { getSubtitles } from "youtube-captions-scraper";
import { WebView } from "react-native-webview";
import AntDesign from "@expo/vector-icons/AntDesign";
import injectScript from "../../../../components/WebViewComponents/injectScript";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { translateText } from "../../../../Utils/Service/translateService";
import { addWord, searchWord } from "../../../../Utils/Service/wordService";
import WordDetailModal from "../../../../components/WordDetailModal";
import GlishModal from "../../../../components/GlishModal";
export default function VideoPlayer({ route }) {
  const { videoId } = route.params;
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState("");
  const [previousCaption, setPreviousCaption] = useState("");
  const [nextCaption, setNextCaption] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCaptionsLoading, setIsCaptionLoading] = useState(true);
  const playerRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalGlishVisible, setModalGlishVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [isWordExist, setIsWordExist] = useState(false);
  const [isWordExistAlertVisible, setIsWordExistAlertVisible] = useState(false);
  const [loadingAddWord, setLoadingAddWord] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCaptions() {
      try {
        const fetchedCaptions = await getSubtitles({
          videoID: videoId,
          lang: "en",
        });
        setCaptions(fetchedCaptions);
        setIsCaptionLoading(false);
      } catch (error) {
        console.error(error);
        setIsCaptionLoading(false);
      }
    }
    fetchCaptions();
  }, []);

  const handleProgress = (currentTime) => {
    if (!playerRef.current) return;
    if (captions.length === 0) return;

    const current = captions.find(
      (caption) =>
        currentTime >= parseFloat(caption.start) &&
        currentTime < parseFloat(caption.start) + parseFloat(caption.dur)
    );
    if (current) {
      setCurrentCaption(current.text);
      setNextCaption(captions[captions.indexOf(current) + 1]?.text || "");
      setPreviousCaption(captions[captions.indexOf(current) - 1]?.text || "");
    } else {
      setCurrentCaption("");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && playerRef.current) {
        playerRef.current.getCurrentTime().then((time) => {
          handleProgress(time);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, captions]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && playerRef.current) {
        playerRef.current.getCurrentTime().then((time) => {
          handleProgress(time);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);
  const htmlContent = `
  <html>
  <head>
    <style>
      body {
        background-color: transparent;
        color: black;
        font-family: Arial, sans-serif;
        font-size: 36px;
      }
      .container {
        border: 4px solid #c6c6c6; 
        border-radius: 50px; 
        padding: 20px; 
        margin: 20px; 
        }
      .current {
        font-size: 64px;
        font-weight: bold;
        border-radius: 25px;
        padding: 20px;
        margin: 0 20px;
      }
      .previous {
        font-size: 50px;
        opacity: 0.7;
        cursor: pointer;
        margin-bottom: 20px;
        margin-left: 60px;    
      }
      .next {
        font-size: 50px;
        opacity: 0.7;
        cursor: pointer;
        margin-top: 20px;
        margin-left: 60px;      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="previous">${previousCaption}</div>
      <div class="current">${
        captions.length > 0 ? currentCaption : "No Captions Found"
      }</div>
      <div class="next">${nextCaption}</div>
    </div>
  </body>
  </html>
  `;
  async function onMessage(event) {
    setIsWordExist(false);
    setIsWordExistAlertVisible(false);
    setLoading(true);
    const word = event.nativeEvent.data;
    setSelectedWord(word);
    const translated = await translateText({ text: word, setError });
    setTranslatedWord(translated);
    setLoading(false);
  }
  async function addWordToDb() {
    setLoadingAddWord(true);
    const result = await searchWord({ searchWord: selectedWord });
    if (result.length === 0) {
      await addWord({
        newWord: selectedWord,
        newWordTranslation: translatedWord,
      });
      setIsWordExist(true);
    } else {
      setIsWordExist(true);
      setIsWordExistAlertVisible(true);
    }
    setLoadingAddWord(false);
  }
  function handleBack() {}
  return (
    <View style={styles.container}>
      <Pressable />
      <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
      <Pressable />
      {!isCaptionsLoading ? (
        <>
          <YoutubePlayer
            ref={playerRef}
            height={220}
            play={isPlaying}
            videoId={videoId}
            onChangeState={(event) => {
              if (event === "playing") {
                setIsPlaying(true);
              }
            }}
          />
          <View style={styles.captionContainer}>
            <WebView
              originblacklist={["*"]}
              source={{
                html: htmlContent,
              }}
              onMessage={onMessage}
              style={styles.webView}
              injectedJavaScript={injectScript}
              containerStyle={styles.webviewContainer}
            />
            {modalVisible && selectedWord && translatedWord && (
              <WordDetailModal
                visible={modalVisible}
                setVisible={setModalVisible}
                word={selectedWord}
              />
            )}
            {modalGlishVisible && selectedWord && (
              <GlishModal
                visible={modalGlishVisible}
                setVisible={setModalGlishVisible}
                word={selectedWord}
              />
            )}
          </View>
          {/* <></> */}
          {selectedWord ? (
            <View style={styles.wordContainer}>
              {loading ? (
                <ActivityIndicator style={styles.activityIndicator} />
              ) : (
                <>
                  {loadingAddWord ? (
                    <ActivityIndicator style={styles.activityIndicator} />
                  ) : (
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={addWordToDb}
                    >
                      {isWordExist ? (
                        <>
                          <AntDesign name="check" size={30} color="green" />
                          {isWordExistAlertVisible && (
                            <Text style={styles.existAlert}>
                              Word already exist
                            </Text>
                          )}
                        </>
                      ) : (
                        <MaterialIcons name="add" size={30} color="green" />
                      )}
                    </TouchableOpacity>
                  )}
                  <View style={styles.selectedWordContainer}>
                    <Text style={styles.selectedWordText}>{selectedWord}</Text>
                    <Text style={styles.translatedText}>{translatedWord}</Text>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      icon={{
                        name: "youtube",
                        type: "feather",
                        size: 35,
                      }}
                      buttonStyle={{
                        backgroundColor: "#ffffff00",
                      }}
                      onPress={() => {
                        setModalGlishVisible(true);
                      }}
                    />
                    <Button
                      icon={{
                        name: "info",
                        color: "green",
                        size: 30,
                      }}
                      buttonStyle={{
                        backgroundColor: "#ffffff00",
                      }}
                      onPress={() => {
                        setModalVisible(true);
                      }}
                    />
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => {
                        setSelectedWord("");
                        setTranslatedWord("");
                        setIsWordExist(false);
                        setIsWordExistAlertVisible(false);
                      }}
                    >
                      <MaterialIcons name="cancel" size={30} color="black" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ) : null}
          {/* <></> */}
          <TouchableOpacity style={styles.button} onPress={togglePlayPause}>
            {isPlaying ? (
              <AntDesign name="pause" size={100} color="black" />
            ) : (
              <AntDesign name="play" size={100} color="black" />
            )}
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  captionContainer: {
    flex: 1,
  },
  webView: {
    width: "100%",
    height: "auto",
    backgroundColor: "transparent",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 30,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#c6c6c6",
  },
  selectedWordContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },
  selectedWordText: {
    fontSize: 16,
    color: "#000",
    textAlignVertical: "center",
    fontWeight: "500",
  },
  translatedText: {
    fontSize: 14,
    color: "#000",
    textAlignVertical: "center",
    fontWeight: "300",
  },
  closeButton: {
    justifyContent: "center",
    marginRight: 10,
  },
  wordButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  existAlert: {
    color: "green",
    fontSize: 14,
    fontWeight: "200",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: "200",
  },
});
