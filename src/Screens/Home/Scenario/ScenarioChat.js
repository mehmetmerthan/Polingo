import { React, useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Text,
} from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  SendFirst,
  sendAIMessage,
} from "../../../Utils/Service/AIService/AIScenarioService";
import Markdown from "react-native-markdown-display";
import { translateText } from "../../../Utils/Service/translateService";
export default function ScenarioChat({ route }) {
  const { role, firstMessage } = route.params;
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  const sendMessage = async () => {
    if (!inputText || loading) {
      return;
    }
    setLoading(true);
    try {
      const userMessage = { role: "user", content: inputText };
      setChatHistory((prev) => [...prev, userMessage]);
      const result = await sendAIMessage({
        chatHistory,
      });
      const botMessage = { role: "assistant", content: result };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setInputText("");
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const refreshChat = async () => {
    setChatHistory([]);
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
  async function handleStartConversation() {
    setLoading(true);
    try {
      const result = await SendFirst({
        setChatHistory,
        firstMessage,
        role,
      });
      const modelMessage = { role: "assistant", content: result };
      setChatHistory((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
  const ListHeaderComponent = () => {
    return (
      chatHistory.length === 0 && (
        <Button
          title={"Start conversation"}
          onPress={handleStartConversation}
          loading={loading}
        />
      )
    );
  };
  const [isTranslatingList, setIsTranslatingList] = useState([]);
  const [translatedTexts, setTranslatedTexts] = useState([]);
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
        key={index}
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
      {chatHistory.length > 0 && (
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
          multiline
        />
      )}
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
  },
  icon: {
    marginLeft: 50,
  },
});
