import { createDrawerNavigator } from "@react-navigation/drawer";
import VideoList from "../Screens/VideoList";
import WordDetail from "../Screens/WordDetail";
const Drawer = createDrawerNavigator();

export default function DrawerNaw() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Videos" component={VideoList} />
      <Drawer.Screen name="Words" component={WordDetail} />
    </Drawer.Navigator>
  );
}
