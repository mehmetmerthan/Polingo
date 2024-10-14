import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DictioanryMaterialTop from "./MaterialTop/DictioanryMaterialTop";
import HomeStack from "./Stack/HomeStack";
import TranslateMaterialTop from "./MaterialTop/TranslateMaterialTop";
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
      <Tab.Screen name="Dictinory" component={DictioanryMaterialTop} />
      <Tab.Screen name="Translate" component={TranslateMaterialTop} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
