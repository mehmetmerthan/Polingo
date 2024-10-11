import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import CreateSentence from "../../Screens/Home/Training/CreateSentence";
const Tab = createMaterialTopTabNavigator();

export default function TrainingMaterialTop({ route }) {
  const { trainingWords } = route?.params ?? {};
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="CreateSentence"
        children={() => <CreateSentence trainingWords={trainingWords} />}
      />
    </Tab.Navigator>
  );
}
