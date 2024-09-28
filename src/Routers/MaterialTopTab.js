import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DictionaryLearning from "../Screens/Dictionary/DictionaryLearning";
import DictionaryLearned from "../Screens/Dictionary/DictionaryLearned";
import React, { useState } from "react";
const Tab = createMaterialTopTabNavigator();

export default function MaterialTopTab() {
  const [wordListLearning, setWordListLearning] = useState([]);
  const [wordListLearned, setWordListLearned] = useState([]);
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
    >
      <Tab.Screen
        name="Learn"
        children={() => (
          <DictionaryLearning
            wordListLearning={wordListLearning}
            setWordListLearning={setWordListLearning}
            setWordListLearned={setWordListLearned}
          />
        )}
      />
      <Tab.Screen
        name="Learned"
        children={() => (
          <DictionaryLearned
            wordListLearned={wordListLearned}
            setWordListLearned={setWordListLearned}
            setWordListLearning={setWordListLearning}
          />
        )}
      />
    </Tab.Navigator>
  );
}
