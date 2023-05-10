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
    textAlign:"center",
    fontSize: 30,
    fontWeight: "700",
    padding: 15,
  },
  button: {
    color: "blue",
    alignSelf: "center",
    backgroundColor: "blue",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  backButtonText: {
    color:"white",
    fontWeight: "500",
    fontSize: 16,
  },
});
