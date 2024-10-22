import { React, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchScenarios } from "../../../Utils/Service/scenarioService";
const ScenarioList = () => {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  async function fetchData() {
    setLoading(true);
    const allScenarios = await fetchScenarios();
    setScenarios(allScenarios);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleScenarioPress = ({ role, firstMessage }) => {
    navigation.navigate("ScenarioChat", { role, firstMessage });
  };

  const renderScenarioItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        handleScenarioPress({
          role: item.role,
          firstMessage: item.firstMessage,
        })
      }
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={scenarios}
          renderItem={renderScenarioItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default ScenarioList;
