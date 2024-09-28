import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DrawerNaw from "./DrawerNav";
import MaterialTopTab from "./MaterialTopTab";
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={DrawerNaw}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Dictinory" component={MaterialTopTab} />
    </Tab.Navigator>
  );
}
