import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/successPageStyles";

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
