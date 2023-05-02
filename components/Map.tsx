import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";

function Map() {
  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} />
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
