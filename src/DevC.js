import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function DevC() {
  const injectedJS = `
    const removeAdsAndPopups = () => {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        iframe.style.display = 'none';
      });
      const divs = document.querySelectorAll('div');
      divs.forEach(div => {
        if (div.style.position === 'fixed' || div.style.position === 'absolute') {
          div.style.display = 'none';
        }
      });
    };
    document.addEventListener('DOMContentLoaded', removeAdsAndPopups);
    setInterval(removeAdsAndPopups, 1000); // Her saniye kontrol et
    true; 
  `;

  return (
    <WebView
      source={{
        uri: `https://techcrunch.com/`,
      }}
      injectedJavaScript={injectedJS}
      style={styles.webview}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
