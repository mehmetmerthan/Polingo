import { React } from "react";
import {
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Pressable
            style={styles.section}
            onPress={() => navigation.navigate("ReadingWebView")}
          >
            <Image
              source={require("../../assets/web.png")}
              style={styles.image}
            />
            <Text style={styles.overlayText}>
              Web{"\n"}
              <Text style={styles.overlayDescription}>
                Explore web resources
              </Text>
            </Text>
          </Pressable>
          <Pressable
            style={styles.section}
            onPress={() => navigation.navigate("YoutubeStack")}
          >
            <Image
              source={require("../../assets/web.png")}
              style={styles.image}
            />
            <Text style={styles.overlayText}>
              Youtube{"\n"}
              <Text style={styles.overlayDescription}>
                Find educational videos
              </Text>
            </Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable
            style={styles.section}
            onPress={() => navigation.navigate("")}
          >
            <Image
              source={require("../../assets/web.png")}
              style={styles.image}
            />
            <Text style={styles.overlayText}>
              Word{"\n"}
              <Text style={styles.overlayDescription}>
                Improve your vocabulary
              </Text>
            </Text>
          </Pressable>
          <Pressable
            style={styles.section}
            onPress={() => navigation.navigate("")}
          >
            <Image
              source={require("../../assets/web.png")}
              style={styles.image}
            />
            <Text style={styles.overlayText}>
              Word{"\n"}
              <Text style={styles.overlayDescription}>
                Strengthen your word skills
              </Text>
            </Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable
            style={styles.section}
            onPress={() => navigation.navigate("")}
          >
            <Image
              source={require("../../assets/web.png")}
              style={styles.image}
            />
            <Text style={styles.overlayText}>
              Scenario{"\n"}
              <Text style={styles.overlayDescription}>
                Practice real-life situations
              </Text>
            </Text>
          </Pressable>
          <Pressable
            style={styles.section}
            onPress={() => navigation.navigate("")}
          >
            <Image
              source={require("../../assets/web.png")}
              style={styles.image}
            />
            <Text style={styles.overlayText}>
              Scenario{"\n"}
              <Text style={styles.overlayDescription}>
                Simulate conversations
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  section: {
    flex: 1,
    height: 250,
    width: "100%",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlayText: {
    position: "absolute",
    top: "70%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    color: "white",
    letterSpacing: 1,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 1)",
    padding: 5,
  },
  overlayDescription: {
    fontSize: 14,
    fontWeight: "300",
    color: "#ffffff",
    textAlign: "center",
  },
});

export default HomeScreen;
