import { React, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Input, Icon, Button, Divider } from "@rneui/themed";
import { translateText } from "../../Utils/Service/translateService";
import WordDetailModal from "../../components/WordDetailModal";
import { addWord, searchWord } from "../../Utils/Service/wordService";
import { getUserId } from "../../Utils/Service/authService";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
export default function AITranslate() {
  const [text, setText] = useState("");
  const [translateTo, setTranslateTo] = useState("tr");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isWordExist, setIsWordExist] = useState(false);
  const [isWordExistAlertVisible, setIsWordExistAlertVisible] = useState(false);
  const [loadingAddWord, setLoadingAddWord] = useState(false);

  const sendMessage = async () => {
    if (!text || loading) {
      return;
    }
    setTranslatedText("");
    setLoading(true);
    setError("");
    setIsWordExist(false);
    setIsWordExistAlertVisible(false);
    try {
      const response = await translateText({
        text,
        setError,
        translateTo,
      });
      setTranslatedText(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handlePress = () => {
    setTranslateTo(translateTo === "tr" ? "en" : "tr");
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };
  async function addWordToDb() {
    setLoadingAddWord(true);
    const myWord = translateTo === "tr" ? text : translatedText;
    const myWordTranslation = translateTo === "tr" ? translatedText : text;
    const userId = await getUserId();
    const result = await searchWord({ userId, searchWord: myWord });
    if (result.length === 0) {
      await addWord({
        userId: userId,
        newWord: myWord,
        newWordTranslation: myWordTranslation,
      });
      setIsWordExist(true);
    } else {
      setIsWordExist(true);
      setIsWordExistAlertVisible(true);
    }
    setLoadingAddWord(false);
  }
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <View style={styles.container}>
        <View style={styles.textInputWrapper}>
          {translateTo === "tr" ? (
            <Text style={styles.title}>EN to TR</Text>
          ) : (
            <Text style={styles.title}>TR to EN</Text>
          )}
          <Pressable style={styles.icon} onPress={handlePress}>
            <Icon name="change-circle" size={50} color={"rgb(32, 137, 220)"} />
          </Pressable>
        </View>
        <View style={styles.textInputContainer}>
          <Input
            placeholder="Enter text to translate"
            value={text}
            onChangeText={setText}
          />
        </View>
        <Button
          onPress={sendMessage}
          title={"Send"}
          style={styles.button}
          loading={loading}
          disabled={loading}
        />
        <Divider width={1} style={{ marginTop: 50 }} />
        {translatedText && (
          <View style={styles.wordContainer}>
            {loadingAddWord ? (
              <ActivityIndicator style={styles.activityIndicator} />
            ) : (
              <TouchableOpacity
                style={styles.addWordButton}
                onPress={addWordToDb}
              >
                {isWordExist ? (
                  <>
                    <AntDesign name="check" size={30} color="green" />
                    {isWordExistAlertVisible && (
                      <Text style={styles.existAlert}>Word already exist</Text>
                    )}
                  </>
                ) : (
                  <MaterialIcons name="add" size={30} color="green" />
                )}
              </TouchableOpacity>
            )}
            <Text style={styles.translateText}>{translatedText}</Text>
            <View style={styles.translatedTextContainer}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon name="info" color={"rgb(32, 137, 220)"} size={35} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Text style={styles.errorText}>{error}</Text>
        {modalVisible && (
          <WordDetailModal
            setVisible={setModalVisible}
            visible={modalVisible}
            word={translateTo === "tr" ? text : translatedText}
            definition={translateTo === "tr" ? translatedText : text}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
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
  icon: {
    marginLeft: 150,
  },
  wordContainer: {
    marginTop: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
  },
  translatedTextContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  translateText: {
    fontSize: 20,
    //textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 20,
  },
  existAlert: {
    color: "green",
    fontSize: 14,
    fontWeight: "200",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addWordButton: {
    marginRight: 10,
  },
});
