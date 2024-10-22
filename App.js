import React from "react";
import RootRouter from "./src/Routers/RootRouter";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
Amplify.configure(amplifyconfig);
export default function App() {
  return <RootRouter />;
}
