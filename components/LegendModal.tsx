import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/modalStyles";

const LegendModal = ({modalVisible, setModalVisible, selectedLegend}) => {
  const navigation = useNavigation();

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
            <Text style={styles.modalText}>{selectedLegend?.title}</Text>
            <Pressable
              style={[styles.button]}
              onPress={() => {
                setModalVisible(false)
               navigation.navigate("LegendPage" as never, {legend: selectedLegend}  as never);
              }}
            >
              <Text style={styles.textStyle}>View Legend</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.closeBtn]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LegendModal;
