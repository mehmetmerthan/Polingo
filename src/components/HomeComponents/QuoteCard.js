import { View, Text } from "react-native";
import { React, useEffect, useState } from "react";
import { Button, Card } from "@rneui/themed";
import { getQuote } from "../../Utils/Service/homeService";
import { translateText } from "../../Utils/Service/translateService";
import styles from "../../styles/homeScreenStyles";
export default function QuoteCard() {
  const [quote, setQuote] = useState("");
  const [quoteMeaning, setQuoteMeaning] = useState("");
  const [quoteTrasnslateLoading, setQuoteTrasnslateLoading] = useState(false);
  async function fetchDatas() {
    const quote = await getQuote();
    setQuote(quote);
  }
  useEffect(() => {
    setQuoteMeaning("");
    fetchDatas();
  }, []);
  async function translateQuote() {
    if (quoteTrasnslateLoading) {
      return;
    }
    setQuoteMeaning("");
    setQuoteTrasnslateLoading(true);
    const translated = await translateText({
      text: quote.body,
    });
    setQuoteMeaning(translated);
    setQuoteTrasnslateLoading(false);
  }
  return (
    <View>
      {quote && (
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.cartTitle}>Quote of the day</Card.Title>
          <Card.Divider />
          <View style={styles.listItemContainer}>
            <Text style={styles.quote}>{quote.body}</Text>
            {quoteMeaning && (
              <Text style={styles.quoteMeaning}>{quoteMeaning}</Text>
            )}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              icon={{
                name: "language",
                type: "ionicon",
                size: 20,
                color: "#208bdca6",
              }}
              buttonStyle={{ backgroundColor: "transparent" }}
              onPress={translateQuote}
              loading={quoteTrasnslateLoading}
              loadingProps={{ color: "#208bdca6" }}
            />
            <Text style={styles.author}>
              {quote.author ? quote.author : "Unknown"}
            </Text>
          </View>
        </Card>
      )}
    </View>
  );
}
