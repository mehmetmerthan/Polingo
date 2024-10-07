import { React, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { Input, Icon, Button, Divider } from "@rneui/themed";
import { useHeaderHeight } from "@react-navigation/elements";
export default function TranslateScreen() {
  const [trainingText, setTrainingText] = useState("");
  const [mainText, setMainText] = useState("");
  const [change, setChange] = useState(true);
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [inputResponseText, setInputResponseText] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "model", parts: [{ text: "Hello, how can I help you?" }] },
    { role: "user", parts: [{ text: "I want to know about the weather" }] },
    { role: "model", parts: [{ text: "Sure, where are you located?" }] },
    { role: "user", parts: [{ text: "I am in New York" }] },
    { role: "model", parts: [{ text: "The weather in New York is 75°F" }] },
  ]);
  const flatListRef = useRef(null);
  const sendMessage = async () => {
    if (!mainText || loadingTranslate) {
      return;
    }
    setLoadingTranslate(true);
    setChatHistory([]);
    try {
      const text = "response.text();";
      setChatHistory([{ role: "model", parts: [{ text }] }]);
    } catch (error) {
      console.error(error);
    }
    setLoadingTranslate(false);
  };
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };
  const handlePress = () => {
    setChange(!change);
  };
  /*

*/

  const responseToAi = async () => {
    if (!inputResponseText) {
      return;
    }
    setLoadingAi(true);
    const userMessage = { role: "user", parts: [{ text: inputText }] };
    const updatedChatHistory = [...chatHistory, userMessage];
    setChatHistory(updatedChatHistory);
    setInputResponseText("");
    try {
      const result = await sendMessage(inputResponseText);
      const response = result;
      const text = response;
      const botMessage = { role: "model", parts: [{ text }] };
      const finalChatHistory = [...updatedChatHistory, botMessage];
      setChatHistory(finalChatHistory);
    } catch (error) {
      console.error(error);
    }
    setLoadingAi(false);
  };
  const refreshChat = () => {
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

  const height = useHeaderHeight();
  const handleInputFocus = () => {
    setTimeout(() => {
      scrollToEnd();
    }, 300);
  };

  const rightIcon = (
    <Pressable onPress={responseToAi}>
      <Icon name="send" size={35} color="#2089dc" style={{ marginRight: 10 }} />
    </Pressable>
  );

  const leftIcon = (
    <Pressable onPress={refreshChat}>
      <Icon name="delete" size={20} color="#2089dc" />
    </Pressable>
  );
  /*
    
    */
  const renderChatItem = ({ item, index }) => {
    return (
      <Text
        key={Math.random()}
        selectable={true}
        style={item.role === "user" ? styles.userMessage : styles.botMessage}
      >
        {item.parts[0].text}
      </Text>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
        <>
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
          <FlatList
            ref={flatListRef}
            data={chatHistory}
            removeClippedSubviews={false}
            renderItem={renderChatItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.chatContainer}
            extraData={chatHistory}
            onContentSizeChange={scrollToEnd}
            onLayout={scrollToEnd}
          />
        </>
      </TouchableWithoutFeedback>
      <Input
        clearButtonMode="always"
        inputContainerStyle={styles.input}
        onChangeText={setInputResponseText}
        placeholder={"Response to AI"}
        value={inputResponseText}
        rightIcon={rightIcon}
        onFocus={handleInputFocus}
        leftIcon={leftIcon}
        loading={loadingAi}
      />
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
