import { React, useState, useRef, useEffect } from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  sendAIMessage,
  SendFirst,
} from "../../../Utils/Service/AIService/AICreateService";
import WordDetailModal from "../../../components/WordDetailModal";
import {
  getTrainingWords,
  changeWord,
} from "../../../Utils/Service/wordService";
import Markdown from "react-native-markdown-display";
import { translateText } from "../../../Utils/Service/translateService";
export default function CreateSentence() {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const [firstInput, setFirstInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [loadingChange, setLoadingChange] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [trainingWords, setTrainingWords] = useState([]);
  const [isTranslatingList, setIsTranslatingList] = useState([]);
  const [translatedTexts, setTranslatedTexts] = useState([]);
  const flatListRef = useRef(null);
  async function fetchTrainingWords() {
    setLoadingState(true);
    try {
      const words = await getTrainingWords();
      if (words.length > 2) {
        setIsShow(true);
        const slicedWords = words.slice(0, 3);
        setTrainingWords(slicedWords);
      } else {
        setIsShow(false);
      }
    } catch (error) {
      console.error(error);
    }
    setLoadingState(false);
  }
  useEffect(() => {
    fetchTrainingWords();
  }, []);

  const sendMessage = async () => {
    if (!inputText || loading) {
      return;
    }
    setLoading(true);
    if (chatHistory.length === 0) {
      try {
        setFirstInput(inputText);
        const result = await SendFirst({
          input: inputText,
          trainingWords,
          setChatHistory,
        });
        const modelMessage = { role: "assistant", content: result };
        setChatHistory((prev) => [...prev, modelMessage]);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const userMessage = { role: "user", content: inputText };
        setChatHistory((prev) => [...prev, userMessage]);
        const result = await sendAIMessage({ chatHistory });
        const botMessage = { role: "assistant", content: result };
        setChatHistory((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
    setInputText("");
  };
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const refreshChat = () => {
    setChatHistory([]);
    setFirstInput("");
  };
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chatHistory]);

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleInputFocus = () => {
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, 300);
  };

  const height = useHeaderHeight();
  const rightIcon = (
    <Button
      onPress={sendMessage}
      icon={{ name: "send", color: "#2089dc" }}
      color={"transparent"}
      loading={loading}
      size="md"
      loadingStyle={{
        backgroundColor: "#2089dc",
        borderRadius: 50,
        width: 25,
        height: 25,
      }}
    />
  );

  const leftIcon = (
    <Pressable onPress={refreshChat}>
      <Icon name="delete" size={20} color="#2089dc" />
    </Pressable>
  );
  async function handleChange() {
    setLoadingChange(true);
    setLoading(true);
    try {
      await Promise.all(
        trainingWords.map(async (word) => {
          await changeWord({ wordId: word.id, isLearned: true });
        })
      );

      await fetchTrainingWords();
    } catch (error) {
      console.error(error);
    }
    setLoadingChange(false);
    setLoading(false);
  }
  const ListHeaderComponent = () => {
    return (
      <>
        {loadingState ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <>
            {!isShow ? (
              <Text style={styles.botMessage}>
                You need at least 5 words in your vocabulary to start training.
              </Text>
            ) : (
              <Text style={styles.botMessage}>
                Create sentence from your vocabulary words:{"\n"}
                {" \n"}
                <View style={{ flexDirection: "column" }}>
                  {trainingWords?.map((word, index) => (
                    <View style={styles.wordContainer} key={index}>
                      <Text key={index} style={styles.word}>
                        {word.word}: {word.translation}
                        {"\n"}
                      </Text>
                      <Button
                        icon={{
                          name: "info",
                          color: "#2089dc",
                          size: 20,
                          style: styles.icon,
                        }}
                        onPress={() => {
                          setWordIndex(index);
                          setModalVisible(true);
                        }}
                        color={"transparent"}
                      />
                    </View>
                  ))}
                  <Button
                    title={"Mark as learned"}
                    containerStyle={styles.markButton}
                    onPress={handleChange}
                    loading={loadingChange}
                    disabled={loadingChange}
                  />
                </View>
              </Text>
            )}
          </>
        )}
        {firstInput && <Text style={styles.userMessage}>{firstInput}</Text>}
      </>
    );
  };
  async function handleTranslate(text, index) {
    try {
      setIsTranslatingList((prev) => {
        const updatedList = [...prev];
        updatedList[index] = true;
        return updatedList;
      });
      const translated = await translateText({ text });
      setTranslatedTexts((prev) => {
        const updatedTexts = [...prev];
        updatedTexts[index] = translated;
        return updatedTexts;
      });
      setIsTranslatingList((prev) => {
        const updatedList = [...prev];
        updatedList[index] = false;
        return updatedList;
      });
    } catch (error) {
      console.error(error);
      setIsTranslatingList((prev) => {
        const updatedList = [...prev];
        updatedList[index] = false;
        return updatedList;
      });
    }
  }

  function renderItem({ item, index }) {
    return (
      <View
        key={Math.random()}
        style={item.role === "user" ? styles.userMessage : styles.botMessage}
      >
        <Markdown style={{ body: { fontSize: 17 } }}>{item.content}</Markdown>
        {item.role === "assistant" && (
          <>
            <Button
              icon={{
                name: "language",
                type: "ionicon",
                size: 20,
                color: "#208bdca6",
              }}
              buttonStyle={{
                backgroundColor: "transparent",
                alignSelf: "flex-end",
              }}
              onPress={() => handleTranslate(item.content, index)}
              loading={isTranslatingList[index] === true}
              loadingProps={{ color: "#208bdca6" }}
            />
            {translatedTexts[index] && (
              <Text style={{ fontSize: 17, fontWeight: 300 }}>
                {translatedTexts[index]}
              </Text>
            )}
          </>
        )}
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={height}
      enabled
    >
      {modalVisible && (
        <WordDetailModal
          visible={modalVisible}
          setVisible={setModalVisible}
          word={trainingWords[wordIndex].word}
        />
      )}
      <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
        <FlatList
          ref={flatListRef}
          data={chatHistory.slice(1)}
          removeClippedSubviews={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.chatContainer}
          extraData={chatHistory}
          onContentSizeChange={scrollToEnd}
          onLayout={scrollToEnd}
          ListHeaderComponent={ListHeaderComponent}
        />
      </TouchableWithoutFeedback>
      <Input
        clearButtonMode="always"
        inputContainerStyle={styles.input}
        onChangeText={setInputText}
        placeholder={"Ask me anything"}
        value={inputText}
        rightIcon={rightIcon}
        onFocus={handleInputFocus}
        leftIcon={leftIcon}
        loading={loading}
        disabled={loading || !isShow}
        multiline
        clearTextOnFocus
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    flexGrow: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#d1e7dd",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    fontSize: 17,
  },
  botMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#f8d7da",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    fontSize: 17,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  word: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 50,
  },
  markButton: {
    borderRadius: 10,
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
});
