import { createDrawerNavigator } from "@react-navigation/drawer";
import WordDetail from "../Screens/Dictionary/WordDetail";
import ReadingWebView from "../Screens/ReadingWebView";
import YoutubeStack from "./YoutubeStack";
const Drawer = createDrawerNavigator();

export default function DrawerNaw() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Videos" component={YoutubeStack} />
      <Drawer.Screen name="Words" component={WordDetail} />
      <Drawer.Screen name="Webview" component={ReadingWebView} />
    </Drawer.Navigator>
  );
}
