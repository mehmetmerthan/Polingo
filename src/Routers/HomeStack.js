import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../Screens/Home/HomeScreen";
import WebMaterialTop from "./MaterialTop/WebMaterialTop";
import TrainingMaterialTop from "./MaterialTop/TrainingMaterialTop";
import Scenario from "../Screens/Scenario";
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
      <Stack.Screen
        name="TrainingMaterialTop"
        component={TrainingMaterialTop}
      />
      <Stack.Screen name="Scenario" component={Scenario} />
    </Stack.Navigator>
  );
}
