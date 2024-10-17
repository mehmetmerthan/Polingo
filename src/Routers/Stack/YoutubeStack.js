import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import YoutubeWebView from "../../Screens/Home/WebSources/Youtube/YoutubeWebView";
import VideoPlayer from "../../Screens/Home/WebSources/Youtube/VideoPlayer";
import YoutubeList from "../../Screens/Home/WebSources/Youtube/YoutubeList";
const Stack = createNativeStackNavigator();
export default function YoutubeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="YoutubeList"
        component={YoutubeList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="YoutubeWebView"
        component={YoutubeWebView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
