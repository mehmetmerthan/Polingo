import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { Button, Card, ListItem } from "@rneui/themed";
import { DefaultTheme } from "@react-navigation/native";

const HomeScreen = () => {
  const wordsOfTheDay = [
    { word: "Benevolent", meaning: "İyi niyetli" },
    { word: "Courage", meaning: "Cesaret" },
    { word: "Persevere", meaning: "Azmetmek" },
    { word: "Exemplary", meaning: "Örnek niteliğinde" },
    { word: "Resilient", meaning: "Dayanıklı" },
  ];
  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.cartTitle}>Words of the Day</Card.Title>
        <Card.Divider />
        <View style={styles.listItemContainer}>
          {wordsOfTheDay.map((item, index) => (
            <ListItem
              key={index}
              bottomDivider
              containerStyle={styles.listItem}
            >
              <Button
                icon={{
                  name: "plus",
                  type: "font-awesome",
                  size: 24,
                  color: "#4CAF50",
                }}
                buttonStyle={styles.buttonStyle}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>
                  {item.word}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listItemSubtitle}>
                  {item.meaning}
                </ListItem.Subtitle>
              </ListItem.Content>
              <FontAwesome
                name="info"
                size={20}
                color={DefaultTheme.colors.primary}
              />
              <FontAwesome
                name="youtube-play"
                size={20}
                color={DefaultTheme.colors.primary}
              />
              <FontAwesome
                name="volume-up"
                size={20}
                color={DefaultTheme.colors.primary}
              />
            </ListItem>
          ))}
        </View>
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.cartTitle}>
          Do you know this word ?
        </Card.Title>
        <Card.Divider />
        <View style={styles.listItemContainer}>
          <View style={styles.oxfordWordsContainer}>
            <Text style={styles.oxfordWord}>Evelotion</Text>
            <Text style={styles.oxfordMeaning}>Evrim</Text>
          </View>
          <View style={styles.oxfordButtonContainer}>
            <Button
              icon={{
                name: "check",
                type: "font-awesome",
                size: 30,
                color: "#4CAF50",
              }}
              buttonStyle={styles.buttonStyle}
            />
            <Button
              icon={{
                name: "close",
                type: "font-awesome",
                size: 30,
                color: "#F44336",
              }}
              buttonStyle={styles.buttonStyle}
            />
          </View>
        </View>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.cartTitle}>
          Do you remember the words?
        </Card.Title>
        <Card.Divider />
        <View style={styles.listItemContainer}>
          {wordsOfTheDay.map((item, index) => (
            <ListItem
              key={index}
              bottomDivider
              containerStyle={styles.listItem}
            >
              <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>
                  {item.word}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listItemSubtitle}>
                  {item.meaning}
                </ListItem.Subtitle>
              </ListItem.Content>
              <AntDesign name="checkcircle" size={24} color="green" />
              <AntDesign name="closecircle" size={24} color="red" />
            </ListItem>
          ))}
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
  },
  cardContainer: {
    marginBottom: 10,
    borderRadius: 10,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listItemContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: DefaultTheme.colors.border,
    padding: 5,
    //backgroundColor: "#242424",
  },
  listItem: {},
  listItemTitle: {},
  listItemSubtitle: {},
  readingListitemContainer: {
    flex: 1,
  },
  oxfordWordsContainer: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: DefaultTheme.colors.border,
    borderRadius: 10,
    padding: 10,
    backgroundColor: DefaultTheme.colors.card,
    marginTop: 10,
  },
  oxfordWord: {
    fontSize: 20,
    fontWeight: "bold",
  },
  oxfordMeaning: {
    fontSize: 18,
  },
  oxfordButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
  },
  buttonStyle: {
    backgroundColor: DefaultTheme.colors.border,
    borderRadius: 10,
  },
});

export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#f2f2f2",
//   },
//   cardContainer: {
//     marginBottom: 10,
//     borderRadius: 10,
//   },
//   listItemContainer: {
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 5,
//   },
//   readingListitemContainer: {
//     flex: 1,
//   },
//   oxfordWordsContainer: {
//     flexDirection: "column",
//     alignItems: "center",
//     alignSelf: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 10,
//     backgroundColor: "#f2f2f2",
//     marginTop: 10,
//   },
//   oxfordWord: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   oxfordMeaning: {
//     fontSize: 18,
//   },
//   oxfordButtonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     marginTop: 30,
//   },
//   buttonStyle: {
//     backgroundColor: "#f2f2f2",
//     borderRadius: 10,
//     padding: 10,
//   },
