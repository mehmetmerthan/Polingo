import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ScenarioList from "../../Screens/Home/Scenario/ScenarioList";
import ScenarioChat from "../../Screens/Home/Scenario/ScenarioChat";
const Stack = createNativeStackNavigator();
export default function ScenarioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScenarioList"
        component={ScenarioList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScenarioChat"
        component={ScenarioChat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
