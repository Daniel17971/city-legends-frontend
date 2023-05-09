import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Success = ({ setSubmited }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    setSubmited(false);
    navigation.navigate("Home" as never, {} as never);
  };
  return (
    <View>
      <Text>All done! Thank you!</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Home Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({});
