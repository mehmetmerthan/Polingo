import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import ReadingWebView from "../Screens/ReadingWebView";
import YoutubeStack from "./YoutubeStack";
import VideoList from "../Screens/VideoList";
const Stack = createNativeStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ReadingWebView" component={ReadingWebView} />
      <Stack.Screen name="YoutubeStack" component={YoutubeStack} />
      <Stack.Screen name="VideoList" component={VideoList} />
    </Stack.Navigator>
  );
}
