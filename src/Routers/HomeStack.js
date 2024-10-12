import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../Screens/Home/HomeScreen";
import WebMaterialTop from "./MaterialTop/WebMaterialTop";
import CreateSentence from "../Screens/Home/Training/CreateSentence";
import ScenarioStack from "./ScenarioStack";
const Stack = createNativeStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="WebMaterialTop" component={WebMaterialTop} />
      <Stack.Screen name="CreateSentence" component={CreateSentence} />
      <Stack.Screen
        name="ScenarioStack"
        component={ScenarioStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
