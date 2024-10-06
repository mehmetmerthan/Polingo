import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { getSubtitles } from "youtube-captions-scraper";
import { WebView } from "react-native-webview";

const Ex = () => {
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState("");
  const [previousCaption, setPreviousCaption] = useState("");
  const [nextCaption, setNextCaption] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCaptionsLoading, setIsCaptionLoading] = useState(true);
  const playerRef = useRef(null);
  const videoId = "cTfpAI02cG4";
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    async function fetchCaptions() {
      try {
        const fetchedCaptions = await getSubtitles({
          videoID: videoId,
          lang: "en",
        });
        setCaptions(fetchedCaptions);
        setIsCaptionLoading(false);
      } catch (error) {
        console.error(error);
        setIsCaptionLoading(false);
      }
    }
    fetchCaptions();
  }, []);

  const handleProgress = (currentTime) => {
    if (!playerRef.current) return;
    if (captions.length === 0) return;

    const current = captions.find(
      (caption) =>
        currentTime >= parseFloat(caption.start) &&
        currentTime < parseFloat(caption.start) + parseFloat(caption.dur)
    );
    if (current) {
      setCurrentCaption(current.text);
      setNextCaption(captions[captions.indexOf(current) + 1]?.text || "");
      setPreviousCaption(captions[captions.indexOf(current) - 1]?.text || "");
    } else {
      setCurrentCaption("");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && playerRef.current) {
        playerRef.current.getCurrentTime().then((time) => {
          setCurrentTime(time);
          handleProgress(time);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, captions]); // captions'ı bağımlılıklara ekleyin

  const handleCaptionClick = (time) => {
    playerRef.current.seekTo(time);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && playerRef.current) {
        playerRef.current.getCurrentTime().then((time) => {
          setCurrentTime(time);
          handleProgress(time);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);
  const htmlContent = `
  <html>
  <head>
    <style>
      body {
        background-color: transparent;
        color: black;
        font-family: Arial, sans-serif;
        font-size: 36px;
      }
      .container {
        border: 4px solid #c6c6c6; 
        border-radius: 50px; 
        padding: 20px; 
        margin: 20px; 
        }
      .current {
        font-size: 64px;
        font-weight: bold;
        border-radius: 25px;
        padding: 20px;
        margin: 0 20px;
      }
      .previous {
        font-size: 36px;
        opacity: 0.7;
        cursor: pointer;
        margin-bottom: 80px;
        margin-left: 60px;    
      }
      .next {
        font-size: 36px;
        opacity: 0.7;
        cursor: pointer;
        margin-top: 80px;
        margin-left: 60px;      }
    </style>
  </head>
  <body>
    <div class="container">
        <div class="previous" onclick="window.ReactNativeWebView.postMessage('${
          captions[captions.findIndex((c) => c.text === previousCaption)]?.start
        }')">${previousCaption}</div>
        <div class="current">${currentCaption}</div>
        <div class="next" onclick="window.ReactNativeWebView.postMessage('${
          captions[captions.findIndex((c) => c.text === nextCaption)]?.start
        }')">${nextCaption}</div>
    </div>
  </body>
  </html>
  `;
  return (
    <View style={styles.container}>
      {captions.length > 0 && !isCaptionsLoading ? (
        <>
          <YoutubePlayer
            ref={playerRef}
            height={300}
            play={isPlaying}
            videoId={videoId}
            onChangeState={(event) => {
              if (event === "playing") {
                setIsPlaying(true);
              }
            }}
          />
          <View style={styles.captionContainer}>
            <WebView
              originblacklist={["*"]}
              source={{
                html: htmlContent,
              }}
              onMessage={(event) => {
                const time = parseFloat(event.nativeEvent.data);
                if (!isNaN(time)) {
                  handleCaptionClick(time);
                }
              }}
              style={styles.webView}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={togglePlayPause}>
            <Text style={styles.buttonText}>
              {isPlaying ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>
        </>
      ) : captions.length === 0 && !isCaptionsLoading ? (
        <Text>No captions found</Text>
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  captionContainer: {
    flex: 1,
  },
  webView: {
    width: "100%",
    height: "auto",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

export default Ex;
