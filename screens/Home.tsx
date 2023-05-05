import { StyleSheet, Text, View } from "react-native";
import React from "react";

import {UserContext} from "../contexts/user"
import { useContext } from "react";

function Home() {
  const {userEmail} = useContext(UserContext);
  return (
    <View>
      <Text>Welcome {userEmail}</Text>
    </View>
  );
}

export default Home;
