import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { getSubtitles } from "youtube-captions-scraper";

export default function VideoPlayer({ route }) {
  const { videoId } = route.params;
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState("");
  const [isCaptionExist, setIsCaptionExist] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    async function getCaption() {
      try {
        const captions = await getSubtitles({
          videoID: videoId,
          lang: "en",
        });
        setCaptions(captions);
        setIsCaptionExist(true);
      } catch (error) {
        console.log(error);
        setIsCaptionExist(false);
      }
    }
    getCaption();
  }, [videoId]);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isPlaying) {
      const currentTime = status.positionMillis / 1000; // Milisaniyeleri saniyeye çevirdik
      const caption = captions.find(
        (c) => currentTime >= c.start && currentTime <= c.start + c.dur
      );
      if (caption) {
        setCurrentCaption(caption.text);
      } else {
        setCurrentCaption("");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: `https://www.youtube.com/watch?v=${videoId}` }}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        style={styles.video}
      />
      <Text style={styles.caption}>{currentCaption}</Text>
      {/* {!isCaptionExist && <Text style={styles.captionError}>No Caption</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  caption: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "white",
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  captionError: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "red",
    color: "white",
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
});
