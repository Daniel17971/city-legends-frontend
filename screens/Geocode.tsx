import { useState } from "react";
import { Button, TextInput, View, Text } from "react-native";
import * as Location from "expo-location";
function Geocode() {
  const [address, setAddress] = useState("");
  const [display, setDisplay] = useState(null);
  const geocode = () => {
    Location.geocodeAsync(address).then((data) => {
      setDisplay(data);
    });
  };
  console.log(display);
  return (
    <View>
      <TextInput
        placeholder="enter address"
        onChangeText={setAddress}
        value={address}
      />
      <Button onPress={geocode} title="geo" />
      <Text>hello</Text>
    </View>
  );
}

export default Geocode;
