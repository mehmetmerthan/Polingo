import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialTopTab from "./MaterialTopTab";
import HomeStack from "./HomeStack";
import TranslateScreen from "../Screens/TranslateScreen";
import ProfileScreen from "../Screens/ProfileScreen";
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Dictinory" component={MaterialTopTab} />
      <Tab.Screen name="Translate" component={TranslateScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
