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
import { Input, Icon, Button } from "@rneui/themed";
import { useHeaderHeight } from "@react-navigation/elements";
import WordDetailModal from "../../../components/WordDetailModal";
import {
  SendFirst,
  sendAIMessage,
} from "../../../Utils/Service/AIService/AIScenarioService";

export default function ScenarioChat({ route }) {
  const { role, firstMessage } = route.params;
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef(null);
  const sendMessage = async () => {
    if (!inputText || loading) {
      return;
    }
    setLoading(true);
    try {
      const userMessage = { role: "user", parts: [{ text: inputText }] };
      setChatHistory((prev) => [...prev, userMessage]);
      const result = await sendAIMessage({
        input: inputText,
        chatHistory,
        role,
      });
      const botMessage = { role: "model", parts: [{ text: result }] };
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
    //console.log(JSON.stringify(chatHistory, null, 2));
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
      const modelMessage = { role: "model", parts: [{ text: result }] };
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
          word={{}}
          definition={{}}
        />
      )}
      <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
        <FlatList
          ref={flatListRef}
          data={chatHistory.slice(1)}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => (
            <Text
              key={index}
              selectable={true}
              style={
                item.role === "user" ? styles.userMessage : styles.botMessage
              }
            >
              {item.parts[0].text ? item.parts[0].text : item.parts[0].result}
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
