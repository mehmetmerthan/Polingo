import { React, useState, useEffect } from "react";
import { FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Card, Button } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchWebsiteList } from "../../../../Utils/Service/WebSource/WebsiteService";
import { useNavigation } from "@react-navigation/native";
export default function WebsiteList() {
  const [loading, setLoading] = useState(false);
  const [websiteList, setWebsiteList] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const websites = await fetchWebsiteList();
      setWebsiteList(websites);
      setLoading(false);
    }
    fetchData();
  }, []);
  async function handleNavigate(url) {
    navigation.navigate("WebsiteWebView", { url });
  }
  const renderItem = ({ item }) => (
    <Card containerStyle={styles.itemContainer}>
      <Card.Title>{item.title}</Card.Title>
      <Card.Divider />
      <Card.Image
        source={{
          uri: item.image,
        }}
        resizeMode="contain"
      />

      <Text style={styles.description}>{item.description}</Text>
      <Card.Divider />
      <Button
        containerStyle={{
          alignItems: "flex-end",
          alignSelf: "flex-end",
          marginTop: 10,
        }}
        buttonStyle={{
          backgroundColor: "#ffffff00",
        }}
        icon={{
          name: "arrow-right-circle",
          type: "feather",
          size: 25,
          color: "gray",
        }}
        onPress={() => handleNavigate(item.url)}
      />
    </Card>
  );
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={websiteList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-around", flex: 1 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  itemContainer: {
    flex: 1,
  },
  title: {},
  description: {
    fontSize: 14,
    color: "#333",
    marginVertical: 10,
  },
});
