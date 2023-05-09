import { Pressable, Text, View } from "react-native";
import React from "react";

import { UserContext } from "../contexts/user";
import { useContext } from "react";

function Home() {
  const { userEmail } = useContext(UserContext);
  return (
    <View>
      <Text className="mt-2 text-lg text-black dark:text-white">
        Welcome {userEmail}
      </Text>
    </View>
  );
}

export default Home;
