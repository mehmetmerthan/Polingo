import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DrawerNaw from "./DrawerNav";
import PersonalDictionary from "../Screens/PersonalDictionary";
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={DrawerNaw}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Dictinory" component={PersonalDictionary} />
    </Tab.Navigator>
  );
}
