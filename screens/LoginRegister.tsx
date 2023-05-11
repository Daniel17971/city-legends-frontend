import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { app } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { UserContext } from "../contexts/user";
import { useContext } from "react";

const LoginRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const { setUserEmail, setUid } = useContext(UserContext);

  const navigation = useNavigation();
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home" as never, {} as never);
      }
    });
  }, []);

  const handleSingUp = () => {
    setEmail("");
    setPassword("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { email, uid } = userCredential.user;
        setUserEmail(email);
        setUid(uid);
      })
      .catch((err) => alert(err.message));
  };

  const handleLogin = () => {
    setEmail("");
    setPassword("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { email, uid } = userCredential.user;
        setUserEmail(email);
        setUid(uid);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>City Legends</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      {isRegistering ? (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSingUp}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.span}>Already have an account?</Text>
          <Text style={styles.link} onPress={() => setIsRegistering(false)}>
            {" "}
            Login here!
          </Text>
        </>
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.span}>Don't have an account?</Text>
          <Text style={styles.link} onPress={() => setIsRegistering(true)}>
            Register here!
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default LoginRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2e2e9f",
  },
  title: {
    fontSize: 45,
    color: "#ffe11b",
    fontWeight: "700",
    marginTop: -50,
    marginBottom: 50,
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 2,
    fontFamily: "Poppins-Light",
  },
  inputContainer: {
    width: "80%",
  },
  span: {
    color: "white",
    marginTop: 15,
    fontSize: 18,
    padding: 5,
  },
  link: {
    color: "#ff7700",
    fontSize: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#ffe11b",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  buttonOutline: {
    backgroundColor: "#2e2e9f",
    borderColor: "#ffe11b",
    borderWidth: 4,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonOutlineText: {
    color: "#ffe11b",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
