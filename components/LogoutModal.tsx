import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/modalStyles";

const LogoutModal = ({ modalVisible, setModalVisible }) => {
  const navigation = useNavigation();
  const logoutUser = () => {
    setModalVisible(false);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("Logout" as never, {} as never);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Please Confirm Logout</Text>
            <View style={styles.flexContainer}>
              <Pressable style={[styles.button]} onPress={() => logoutUser()}>
                <Text style={styles.textStyle}>Logout</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.closeBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LogoutModal;
