import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DictioanryMaterialTop from "./MaterialTop/DictioanryMaterialTop";
import DrawerNav from "./DrawerNav";
import TranslateMaterialTop from "./MaterialTop/TranslateMaterialTop";
import Ionicons from "@expo/vector-icons/Ionicons";
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DrawerNav"
        component={DrawerNav}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Translate"
        component={TranslateMaterialTop}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="language" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Dictinory"
        component={DictioanryMaterialTop}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
