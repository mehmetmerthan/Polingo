import { StyleSheet } from "react-native";
import { DefaultTheme } from "@react-navigation/native";
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
  },
  oxfordInButtonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: DefaultTheme.colors.border,
    padding: 5,
    backgroundColor: DefaultTheme.colors.border,
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
    padding: 30,
    backgroundColor: DefaultTheme.colors.card,
    marginTop: 10,
  },
  oxfordWord: {
    fontSize: 30,
    fontWeight: "bold",
  },
  oxfordMeaning: {
    fontSize: 25,
  },
  oxfordButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: DefaultTheme.colors.border,
    borderRadius: 10,
  },
  quote: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    padding: 10,
    fontWeight: "400",
  },
  quoteMeaning: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
    fontWeight: "300",
  },
  author: {
    fontSize: 14,
    textAlign: "right",
    fontWeight: "200",
  },
});

export default styles;
