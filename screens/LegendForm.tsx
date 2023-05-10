import { useState, useContext } from "react";
import Map from "./Map";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../contexts/user";
import { postLegend } from "../db/api";
import { useNavigation } from "@react-navigation/native";
import Success from "../components/Success";
import FormMap from "./FormMap";

const LegendForm = ({ navigation }) => {
  const { uid } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [legendCategory, setLegendCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([
    { label: "Recent History", value: "recent_history" },
    { label: "Myth", value: "myth" },
    { label: "Personal", value: "personal" },
    { label: "Further Back History", value: "further_back_history" },
  ]);
  const [userSelectedLocation, setUserSelectedLocation] = useState(null);
  const [submited, setSubmited] = useState(false);
  const handleSubmit = () => {
    if (!description.trim() || !title.trim() || !userSelectedLocation) {
      alert("Please fill in required fields.");
    } else {
      setDescription("");
      setTitle("");
      setLegendCategory(null);
      setUserSelectedLocation(null);
      postLegend({
        title,
        description,
        legendCategory,
        author: uid,
        location: userSelectedLocation,
      });
      setSubmited(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {submited ? (
        <Success setSubmited={setSubmited} />
      ) : (
        <>
          <Text>Create a new Legend</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Title"
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              placeholder="Description"
              multiline
              numberOfLines={8}
              style={styles.input}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <Text>Choose your Legend Location</Text>

            <Text>Choose your Legend Category</Text>
            <DropDownPicker
              dropDownContainerStyle={{
                backgroundColor: "#dfdfdf",
              }}
              open={open}
              value={legendCategory}
              items={items}
              setOpen={setOpen}
              setValue={setLegendCategory}
              setItems={setItems}
              bottomOffset={100}
            />
            <View style={styles.mapContainer}>
              <FormMap setUserSelectedLocation={setUserSelectedLocation} userSelectedLocation={userSelectedLocation}/>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Create</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default LegendForm;

const styles = StyleSheet.create({
  mapContainer: {
    height: "30%",
    width: "100%",
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid black",
  },
  inputContainer: {
    width: "90%",
  },
  map: {
    width: "100%",
    height: "30%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  inputDesc: {
    height: "40%",
  },
  textThing: {
    display: "none",
  },
  button: {
    backgroundColor: "#21aa8a",
    width: "90%",
    padding: 15,
    borderRadius: 10,
  },
  dropdown: {},
});
