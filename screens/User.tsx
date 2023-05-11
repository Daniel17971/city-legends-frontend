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
        source={require("../assets/iconCity.png")}
        style={styles.cityLogo}
      />
      {isEnabled ? (
        <View style={styles.discoveryModeOn}>
          <Text style={styles.discoveryModeText}>Discovery mode on</Text>
          <Text style={styles.text}>
            Only see legends when you pass them in real life!
          </Text>
        </View>
      ) : (
        <View style={styles.discoveryModeOff}>
          <Text style={styles.discoveryModeText}>Discovery mode off</Text>
          <Text style={styles.text}>
            See all legends within your set radius on the map!
          </Text>
        </View>
      )}

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "lightblue" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

export default User;
