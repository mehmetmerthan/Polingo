import React, { useRef } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

export default function YouTubeWebView() {
  const webviewRef = useRef(null);
  const navigation = useNavigation();

  const onNavigationStateChange = (navState) => {
    const url = navState.url;
    console.log(url);

    // Hem www hem de mobil YouTube domain'lerini kontrol et
    if (
      url.startsWith("https://www.youtube.com/watch") ||
      url.startsWith("https://m.youtube.com/watch")
    ) {
      console.log("video found");

      // Video ID'sini bulmaya çalış
      const videoIdMatch = url.match(/v=([a-zA-Z0-9_-]{11})/);
      if (videoIdMatch && videoIdMatch[1]) {
        console.log("entered");
        console.log(videoIdMatch[1]);
        const videoId = videoIdMatch[1];
        navigation.navigate("VideoPlayer", { videoId });
        webviewRef.current.stopLoading();
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{ uri: "https://www.youtube.com/" }}
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  );
}
