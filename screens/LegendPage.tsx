import React from "react";
import { Text, View, Button } from "react-native";

const LegendPage = ({ navigation, route }) => {
  const { id, legend } = route.params;
  return (
    <View>
      <Button
        title="back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text>{legend.title}</Text>
      <Text>{legend.body}</Text>
    </View>
  );
};

export default LegendPage;
