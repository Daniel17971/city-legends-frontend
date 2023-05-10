import { Text, View, Button, StyleSheet } from "react-native";

const LegendPage = ({ navigation, route }) => {
  const { legend } = route.params;
  console.log(legend, "<-- legend");
  return (
    <View>
      <Button
        title="back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>{legend.title}</Text>
      <Text style={styles.subtitle}>{legend.legendCategory}</Text>
      <Text style={styles.subtitle}>{legend.description}</Text>
    </View>
  );
};



export default LegendPage;


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16
  }
});
