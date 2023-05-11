import { Text, View, Image, StyleSheet, Switch } from "react-native";
import { useContext, useEffect, useState } from "react";
import { DiscoveryContext } from "../contexts/discovery";
import { styles } from "../styles/userStyles";
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
        <Text>Discovery mode off</Text>
      )}

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "lightblue" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text>Only see legends when you pass them in real life!</Text>
    </View>
  );
}

export default User;
