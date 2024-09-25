import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";

export default function WordDetail() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.word}>Example</Text>
        <Text style={styles.translation}>Örnek</Text>
        <Divider style={styles.divider} />
        <Text style={styles.definitionHeader}>Definition:</Text>
        <Text style={styles.definition}>
          An individual instance taken to be representative of a general
          pattern.
        </Text>
        <Divider style={styles.divider} />
        <Text style={styles.sentenceHeader}>Sentences:</Text>
        <View style={styles.sentenceItem}>
          <Text style={styles.sentence}>
            • This is an example of how to use this word.
          </Text>
          <TouchableOpacity style={styles.playIcon}>
            <AntDesign name="playcircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.translation}>
          Bu kelimenin nasıl kullanılacağına dair bir örnek.
        </Text>
        <Divider style={styles.divider} />
        <Text style={styles.synonymHeader}>Synonyms:</Text>
        <View style={styles.synonymItem}>
          <Text style={styles.synonym}>• Sample</Text>
          <TouchableOpacity style={styles.playIcon}>
            <AntDesign name="playcircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.synonymItem}>
          <Text style={styles.synonym}>• Model</Text>
          <TouchableOpacity style={styles.playIcon}>
            <AntDesign name="playcircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.synonymItem}>
          <Text style={styles.synonym}>• Instance</Text>
          <TouchableOpacity style={styles.playIcon}>
            <AntDesign name="playcircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.askAIButton}>
        <Text style={styles.askAIButtonText}>Ask AI</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  word: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  definitionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },

  definition: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  translation: {
    fontSize: 18,
    color: "#777",
    fontWeight: "300",
  },
  synonymHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  synonymItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  synonym: {
    fontSize: 16,
    color: "#333",
  },
  sentenceHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sentenceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  sentence: {
    fontSize: 18,
    color: "#333",
    flex: 1,
  },
  playIcon: {
    paddingLeft: 10,
  },
  askAIButton: {
    backgroundColor: "#28A745",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
  },
  askAIButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 15,
  },
});
