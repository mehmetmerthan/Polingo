import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  searchBar: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 20,
  },
  wordItemContainer: {
    backgroundColor: "#f2f2f2",
    padding: 12,
  },
  wordItem: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  wordTextContainer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  englishText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "600",
    padding: 10,
  },
  turkishText: {
    fontSize: 16,
    color: "#888",
    padding: 10,
  },
  evenItem: {
    backgroundColor: "#efefef",
  },
  oddItem: {
    backgroundColor: "#ffffff",
  },
  playIcon: {
    marginLeft: "auto",
  },
  addButton: {
    borderRadius: 8,
    marginTop: 10,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  inputContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  errorMessageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffcccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  errorMessage: {
    color: "#cc0000",
    fontSize: 14,
  },
  closeButton: {
    position: "absolute",
    top: -40,
    right: 0,
    borderRadius: 50,
    padding: 5,
  },
  listHeader: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    padding: 10,
    position: "absolute",
  },
});
