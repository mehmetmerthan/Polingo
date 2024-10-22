import { React } from "react";
import { ScrollView } from "react-native";
import styles from "../../styles/homeScreenStyles";
import QuoteCard from "../../components/HomeComponents/QuoteCard";
import OxfordWordCard from "../../components/HomeComponents/OxfordWordCard";
const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <QuoteCard />
      <OxfordWordCard />
    </ScrollView>
  );
};

export default HomeScreen;
