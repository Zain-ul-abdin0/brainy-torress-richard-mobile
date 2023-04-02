import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  textInput: {
    flex: 0.2,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 0.6,
    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
