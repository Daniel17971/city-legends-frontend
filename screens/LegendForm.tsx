import React from "react";
import { useState, useContext } from "react";
import Map from "./Map";
import { styles } from "../styles/legendFormStyles";

import {
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
          <View style={styles.formContainer}>
            <View style={styles.inputsContainer}>
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
              <DropDownPicker
                style={styles.input}
                open={open}
                value={legendCategory}
                items={items}
                placeholder="Select a Legend category"
                setOpen={setOpen}
                setValue={setLegendCategory}
                setItems={setItems}
                bottomOffset={100}
              />
            </View>
            <View>
              <Text style={styles.chooseLocation}>
                Choose your Legend Location
              </Text>
              <View style={styles.mapContainer}>
                <View>
                  <FormMap
                    setUserSelectedLocation={setUserSelectedLocation}
                    userSelectedLocation={userSelectedLocation}
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Create Legend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default LegendForm;
