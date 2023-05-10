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
          <Text>
            Already have an account? Login{" "}
            <Text style={styles.link} onPress={() => setIsRegistering(false)}>here</Text>!
          </Text>
        </>
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Text>
            Don't have an account? Register{" "}
            <Text style={styles.link} onPress={() => setIsRegistering(true)}>here</Text>!
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
  },
  inputContainer: {
    width: "80%",
  },
  link: {
    color: "blue",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "blue",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "blue",
    borderWidth: 2,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonOutlineText: {
    color: "blue",
    fontWeight: "700",
    fontSize: 16,
  },
});
