import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

const PostLegend = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.textThing}>Create a new Legend</Text>
        <Text>Dont understand</Text>
        <TextInput placeholder="Legend Title" />
        <TextInput placeholder="Legeng Description " />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <Text>Where</Text>
      </View>
    </SafeAreaView>
  );
};

export default PostLegend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid black",
  },
  inputContainer: {
    width: "80%",
  },
  textThing: {
    display: "none",
  },
});
