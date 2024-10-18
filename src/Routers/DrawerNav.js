import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/Home/HomeScreen";
import YoutubeStack from "./Stack/YoutubeStack";
import WebsiteStack from "./Stack/WebsiteStack";
import CreateSentence from "../Screens/Home/Training/CreateSentence";
import ScenarioStack from "./Stack/ScenarioStack";
const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="WebsiteStack" component={WebsiteStack} />
      <Drawer.Screen name="YoutubeStack" component={YoutubeStack} />
      <Drawer.Screen name="CreateSentence" component={CreateSentence} />
      <Drawer.Screen name="ScenarioStack" component={ScenarioStack} />
    </Drawer.Navigator>
  );
}
