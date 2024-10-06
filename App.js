import React from "react";
import RootRouter from "./src/Routers/RootRouter";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
import Ex from "./src/Ex";
Amplify.configure(amplifyconfig);
export default function App() {
  return <Ex />;
}
