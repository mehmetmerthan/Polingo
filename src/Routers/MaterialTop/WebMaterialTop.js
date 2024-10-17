import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import YoutubeStack from "../Stack/YoutubeStack";
import WebsiteStack from "../Stack/WebsiteStack";
const Tab = createMaterialTopTabNavigator();

export default function WebMaterialTop() {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
    >
      <Tab.Screen name="Web" component={WebsiteStack} />
      <Tab.Screen name="Youtube" component={YoutubeStack} />
    </Tab.Navigator>
  );
}
