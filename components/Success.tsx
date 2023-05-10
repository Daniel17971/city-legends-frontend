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
      <Text>All done! Thank you!</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({});
