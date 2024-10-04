import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { translate } from "@vitalets/google-translate-api";
export default function Ex() {
  const [translated, setTranslated] = useState("");
  useEffect(() => {
    async function fetch() {
      try {
        const { text } = await translate("Привет, мир!", {
          to: "tr",
        });
        setTranslated(text);
      } catch (e) {
        if (e.name === "TooManyRequestsError") {
          const agent = createHttpProxyAgent("http://103.152.112.162:80");
          const { text } = await translate("Привет, мир!", {
            to: "tr",
            fetchOptions: { agent },
          });
          setTranslated(text);
        }
      }
    }
    fetch();
  }, []);
  return (
    <View>
      <Text>Ex</Text>
    </View>
  );
}
