import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/Home/HomeScreen";
import YoutubeStack from "./Stack/YoutubeStack";
import WebsiteStack from "./Stack/WebsiteStack";
import CreateSentence from "../Screens/Home/Training/CreateSentence";
import ScenarioStack from "./Stack/ScenarioStack";
import ProfileScreen from "../Screens/Home/ProfileScreen";
const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="WebsiteStack"
        component={WebsiteStack}
        options={{
          title: "Reading List",
        }}
      />
      <Drawer.Screen
        name="YoutubeStack"
        component={YoutubeStack}
        options={{
          title: "Video List",
        }}
      />
      <Drawer.Screen
        name="CreateSentence"
        component={CreateSentence}
        options={{
          title: "Training Words",
        }}
      />
      <Drawer.Screen
        name="ScenarioStack"
        component={ScenarioStack}
        options={{
          title: "Scenarios",
        }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
        }}
      />
    </Drawer.Navigator>
  );
}
