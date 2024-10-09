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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, Icon, Button } from "@rneui/themed";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  sendAIMessage,
  SendFirst,
} from "../../../Utils/Service/AIService/AICreateService";
export default function CreateSentence({ trainingWords }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  const loadChatHistory = async () => {
    try {
      const savedChatHistory = await AsyncStorage.getItem("chatHistory");
      if (savedChatHistory) {
        setChatHistory(JSON.parse(savedChatHistory));
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };
  const saveChatHistory = async () => {
    try {
      await AsyncStorage.setItem("chatHistory", JSON.stringify(newChatHistory));
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  };
  const sendMessage = async () => {
    if (!inputText || loading) {
      return;
    }
    setLoading(true);
    if (chatHistory.length === 0) {
      try {
        const result = await SendFirst({
          input: inputText,
          trainingWords,
          setChatHistory,
        });
        const modelMessage = { role: "model", parts: [{ text: result }] };
        setChatHistory((prev) => [...prev, modelMessage]);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    } else {
      try {
        const userMessage = { role: "user", parts: [{ text: inputText }] };
        setChatHistory((prev) => [...prev, userMessage]);
        const result = await sendAIMessage({ inputText, chatHistory });
        const botMessage = { role: "model", parts: [{ result }] };
        setChatHistory((prev) => [...prev, botMessage]);
        await saveChatHistory();
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const refreshChat = async () => {
    setChatHistory([]);
    try {
      await AsyncStorage.removeItem("chatHistory");
    } catch (error) {
      console.error("Failed to clear chat history:", error);
    }
  };

  useEffect(() => {
    console.log(trainingWords);
    getWords();
    loadChatHistory();
  }, []);

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

  const ListHeaderComponent = () => (
    <Text style={styles.botMessage}>
      Create sentence from your vocabulary words:{"\n"}
      {" \n"}
      {trainingWords.map((word, index) => (
        <Text key={index}>
          {word.word}: {word.translation}
          {"\n"}
        </Text>
      ))}
    </Text>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={height}
      enabled
    >
      <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
        <FlatList
          ref={flatListRef}
          data={chatHistory}
          removeClippedSubviews={false}
          renderItem={({ item }) => (
            <Text
              key={Math.random()}
              selectable={true}
              style={
                item.role === "user" ? styles.userMessage : styles.botMessage
              }
            >
              {item.parts[0].text}
            </Text>
          )}
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
});
