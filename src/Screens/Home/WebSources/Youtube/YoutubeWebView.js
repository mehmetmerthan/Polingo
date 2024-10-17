import React, { useRef } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

export default function YoutubeWebView({ route }) {
  const { url } = route.params;
  const webviewRef = useRef(null);
  const navigation = useNavigation();

  const onNavigationStateChange = (navState) => {
    const url = navState.url;
    if (
      url.startsWith("https://www.youtube.com/watch") ||
      url.startsWith("https://m.youtube.com/watch")
    ) {
      const videoIdMatch = url.match(/v=([a-zA-Z0-9_-]{11})/);
      if (videoIdMatch && videoIdMatch[1]) {
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
        source={{ uri: url }}
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  );
}
