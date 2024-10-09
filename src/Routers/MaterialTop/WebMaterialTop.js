import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import ReadingWebView from "../../Screens/Home/Web/ReadingWebView";
import YoutubeStack from "../YoutubeStack";
const Tab = createMaterialTopTabNavigator();

export default function WebMaterialTop() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Web" component={ReadingWebView} />
      <Tab.Screen name="Youtube" component={YoutubeStack} />
    </Tab.Navigator>
  );
}
