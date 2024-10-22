import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
const videos = [
  {
    id: "1",
    title: "Video One",
    thumbnail: "https://via.placeholder.com/150",
    description: "This is the first video content.",
    date: "2023-09-01",
    watched: true,
  },
  {
    id: "2",
    title: "Video Two",
    thumbnail: "https://via.placeholder.com/150",
    description: "This is the second video content.",
    date: "2023-09-02",
    watched: false,
  },
  {
    id: "3",
    title: "Video Three",
    thumbnail: "https://via.placeholder.com/150",
    description: "This is the third video content.",
    date: "2023-09-03",
    watched: true,
  },
  {
    id: "4",
    title: "Video Four",
    thumbnail: "https://via.placeholder.com/150",
    description: "This is the fourth video content.",
    date: "2023-09-04",
    watched: false,
  },
];

const VideoList = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.videoContainer}
      onPress={() => alert(`You clicked on ${item.title}`)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.videoThumbnail} />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoDescription}>{item.description}</Text>
        <Text style={styles.videoDate}>Published on: {item.date}</Text>
        <Text
          style={[
            styles.videoStatus,
            item.watched ? styles.watched : styles.notWatched,
          ]}
        >
          {item.watched ? "Watched" : "Not Watched"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  videoContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  videoThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  videoInfo: {
    flex: 1,
    justifyContent: "center",
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  videoDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  videoDate: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
  },
  videoStatus: {
    fontSize: 14,
    fontWeight: "bold",
  },
  watched: {
    color: "green",
  },
  notWatched: {
    color: "red",
  },
});

export default VideoList;
