import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AITranslate from "../../Screens/Translate/AITranslate";
import GTranslate from "../../Screens/Translate/GTranslate";
const Tab = createMaterialTopTabNavigator();

export default function TranslateMaterialTop() {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
    >
      <Tab.Screen
        name="GTranslate"
        component={GTranslate}
        options={{ title: "Google Translate" }}
      />
      <Tab.Screen
        name="AITranslate"
        component={AITranslate}
        options={{ title: "AI Translate" }}
      />
    </Tab.Navigator>
  );
}
