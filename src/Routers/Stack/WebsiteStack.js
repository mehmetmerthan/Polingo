import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import WebsiteList from "../../Screens/Home/WebSources/Website/WebsiteList";
import WebsiteWebView from "../../Screens/Home/WebSources/Website/WebsiteWebView";

const Stack = createNativeStackNavigator();

export default function WebsiteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WebsiteList"
        component={WebsiteList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WebsiteWebView"
        component={WebsiteWebView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
