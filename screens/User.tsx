import { Text, View, Image, StyleSheet, Switch } from "react-native";
import { useContext, useEffect, useState } from "react";
import { DiscoveryContext } from "../contexts/discovery";
function User() {
  const [isEnabled, setIsEnabled] = useState(false);
  const { setDiscoveryModeStatus } = useContext(DiscoveryContext);
  const toggleSwitch = () =>
    setIsEnabled((previousState) => {
      return !previousState;
    });
  useEffect(() => {
    setDiscoveryModeStatus(isEnabled);
  }, [isEnabled]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/image1.png")}
        style={styles.userImage}
      />
      {isEnabled ? (
        <Text>Discovery mode on</Text>
      ) : (
        <Text>Disovery mode off</Text>
      )}

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "lightblue" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text>List of Created Legends</Text>
      <Text>List of Created Routes</Text>
    </View>
  );
}

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    width: "25%",
    height: "25%",
    borderRadius: 20,
  },
});
