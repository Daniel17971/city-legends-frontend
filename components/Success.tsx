import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Success = ({ setSubmited }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    setSubmited(false);
    navigation.navigate("LegendForm" as never, {} as never);
  };
  return (
    <View>
      <Text style={styles.createdLegend}>Your Legend has been created! 🎉</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  createdLegend: {
    color: "#FF7700",
    textAlign:"center",
    fontSize: 30,
    fontWeight: "700",
    padding: 20,
    maxWidth: "70%"
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#FFE11B"
    ,
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  backButtonText: {
    color:"black",
    fontWeight: "700",
    fontSize: 16,
  },
});
