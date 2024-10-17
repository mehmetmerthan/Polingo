import { React, useState } from "react";
import { FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Card, Button } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Dev() {
  const [loading, setLoading] = useState(false);
  const websites = [
    {
      id: 1,
      title: "Easy Stories in English",
      description:
        "Simple English stories for different levels, with audio and transcripts.",
      image:
        "https://yt3.googleusercontent.com/6pw8YF3c0ZGAYzPfEe6ZoUO0yxoa5_ymOSB1_-dkgvS1WWWM3PmRwHV_JK6dLdpJzypGnh3qeQ=s160-c-k-c0x00ffffff-no-rj",
    },

    {
      id: 2,
      title: "Britishcouncil Story zone",
      description:
        "Stories for learners, with activities to build vocabulary and understanding.",
      image:
        "https://cdn.iconscout.com/icon/free/png-256/free-bbc-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-4-pack-icons-282627.png?f=webp",
    },
    {
      id: 3,
      title: "Thefablecottage",
      description: "Classic fairy tales in easy English, with text and audio.",
      image: "https://ichef.bbci.co.uk/images/ic/1920xn/p0j6jtqt.png",
    },
    {
      id: 4,
      title: "Indie Hackers",
      description: "Real-world startup stories and tips for entrepreneurs.",
      image: "https://ichef.bbci.co.uk/images/ic/1920xn/p0j6jtqt.png",
    },
    {
      id: 5,
      title: "TechCrunch",
      description: "Latest news and trends in tech and startups.",
      image: "https://ichef.bbci.co.uk/images/ic/1920xn/p0j6jtqt.png",
    },
    {
      id: 6,
      title: "Yahoo News",
      description: "Global news updates and current events",
      image: "https://ichef.bbci.co.uk/images/ic/1920xn/p0j6jtqt.png",
    },
    {
      id: 7,
      title: "VOA Learning English",
      description: "Simplified news and articles for English learners.",
      image: "https://ichef.bbci.co.uk/images/ic/1920xn/p0j6jtqt.png",
    },
  ];
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
      />
    </Card>
  );
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={websites}
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
