import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalView: {
    marginTop: "70%",
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "49%",
    backgroundColor: "#ffe11b",
    marginBottom: 8
  },
  closeBtn: {
    backgroundColor: "red",
    marginLeft: 5
  },
  textStyle: {
    color: "black",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  }
});
