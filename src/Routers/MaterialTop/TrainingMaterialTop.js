import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import CreateSentence from "../../Screens/Home/Training/CreateSentence";
const Tab = createMaterialTopTabNavigator();

export default function TrainingMaterialTop() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="CreateSentence" component={CreateSentence} />
    </Tab.Navigator>
  );
}
