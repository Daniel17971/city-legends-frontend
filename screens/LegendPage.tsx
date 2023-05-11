
import React from "react";

import { Text, View, Button, StyleSheet } from "react-native";

const LegendPage = ({ navigation, route }) => {
  const { legend } = route.params;

  return (
    <View style={styles.container}>
      <Button
        title="back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>{legend.title}</Text>
      <Text style={styles.category}>{legend.legendCategory}</Text>
      <Text style={styles.description}>{legend.description}</Text>
    </View>
  );
};

export default LegendPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2e2e9f",
    height: "100%",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    marginVertical: 5,
    marginHorizontal: 2.5,
  },
  category: {
    fontSize: 16,
    backgroundColor: '#ffe11b',
    color: "#d9480f",
    alignSelf: "center",
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: "#ff7700",
    textShadowColor: 'black',
    marginBottom: 15,
    marginTop: 4
  },

  description: {
    color: "#ffffff",
    fontSize: 18,
    marginHorizontal: 15,
  }
});
