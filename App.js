import React from "react";
import RootRouter from "./src/Routers/RootRouter";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
import Dev from "./src/Dev";
import DevC from "./src/DevC";
import VideoList from "./src/Screens/VideoList";
Amplify.configure(amplifyconfig);
export default function App() {
  return <RootRouter />;
}
