import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { Amplify } from "aws-amplify";
import config from "../aws-exports";
import Auth from "../Auth";
Amplify.configure(config);
export default function RootRouter() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <NavigationContainer>
          <Auth />
        </NavigationContainer>
      </Authenticator>
    </Authenticator.Provider>
  );
}
