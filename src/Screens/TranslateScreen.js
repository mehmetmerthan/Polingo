import { React, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Input, Icon, Button, Divider } from "@rneui/themed";
import { sendAIMessage, SendAITranslate } from "../Utils/Service/AIService";
export default function TranslateScreen() {
  const [trainingText, setTrainingText] = useState("");
  const [mainText, setMainText] = useState("");
  const [change, setChange] = useState(true);
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [inputResponseText, setInputResponseText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const scrollViewRef = useRef(null);
  const sendMessage = async () => {
    if (!mainText || loadingTranslate) {
      return;
    }
    setLoadingTranslate(true);
    setChatHistory([]);
    try {
      const text = await SendAITranslate({
        mainText,
        trainingText,
        change,
        setChatHistory,
      });
      const modelMessage = { role: "model", parts: [{ text }] };
      setChatHistory((prev) => [...prev, modelMessage]);
      console.log("chatHistory", chatHistory);
    } catch (error) {
      console.error(error);
    }
    setLoadingTranslate(false);
  };

  const handlePress = () => {
    setChange(!change);
  };

  const responseToAI = async () => {
    if (!inputResponseText || loadingAI) {
      return;
    }
    setLoadingAI(true);
    const userMessage = { role: "user", parts: [{ text: inputResponseText }] };
    //const updatedChatHistory = [...chatHistory, userMessage];
    setChatHistory((prev) => [...prev, userMessage]);
    setInputResponseText("");
    try {
      const result = await sendAIMessage({
        input: inputResponseText,
        chatHistory: chatHistory,
      });
      const response = result;
      const text = response;
      const botMessage = { role: "model", parts: [{ text }] };
      //const finalChatHistory = [...updatedChatHistory, botMessage];
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    }
    setLoadingAI(false);
  };
  const refreshChat = () => {
    setChatHistory([]);
  };
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatHistory]);

  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };
  const handleInputFocus = () => {
    setTimeout(() => {
      scrollToEnd();
    }, 300);
  };

  const rightIcon = (
    <Pressable onPress={responseToAI}>
      <Icon name="send" size={35} color="#2089dc" style={{ marginRight: 10 }} />
    </Pressable>
  );

  const leftIcon = (
    <Pressable onPress={refreshChat}>
      <Icon name="delete" size={20} color="#2089dc" />
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <View style={styles.textInputWrapper}>
            {change ? (
              <Text style={styles.title}>TR to EN</Text>
            ) : (
              <Text style={styles.title}>EN to TR</Text>
            )}
            <Pressable style={styles.icon} onPress={handlePress}>
              <Icon
                name="change-circle"
                size={50}
                color={"rgb(32, 137, 220)"}
              />
            </Pressable>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.subTitle}>Write to main sentence</Text>
            <Input
              placeholder="Enter text to translate"
              value={mainText}
              onChangeText={setMainText}
            />
            <Text style={styles.subTitle}>Try to training sentence</Text>
            <Input
              placeholder="Enter text to translate"
              value={trainingText}
              onChangeText={setTrainingText}
            />
          </View>

          <Button
            onPress={sendMessage}
            title={"Send"}
            style={styles.button}
            loading={loadingTranslate}
          />

          <Divider width={1} style={{ marginTop: 50 }} />
          <View style={styles.chatContainer}>
            {chatHistory.slice(1).map((item, index) => (
              <Text
                key={Math.random()}
                selectable={true}
                style={
                  item.role === "user" ? styles.userMessage : styles.botMessage
                }
              >
                {item.parts[0].text}
              </Text>
            ))}
          </View>
          {loadingAI ||
            (loadingTranslate && (
              <ActivityIndicator size={"large"} style={{ marginBottom: 10 }} />
            ))}
        </ScrollView>
      </TouchableWithoutFeedback>
      {chatHistory.length > 1 && (
        <Input
          clearButtonMode="always"
          inputContainerStyle={styles.input}
          onChangeText={setInputResponseText}
          placeholder={"Response to AI"}
          value={inputResponseText}
          rightIcon={rightIcon}
          onFocus={handleInputFocus}
          leftIcon={leftIcon}
          loading={loadingAI}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInputContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  icon: {
    marginLeft: 150,
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
