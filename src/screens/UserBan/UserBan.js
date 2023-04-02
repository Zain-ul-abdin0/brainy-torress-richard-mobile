import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import auth from "@react-native-firebase/auth";
import { CommonActions, NavigationContainer } from "@react-navigation/native";

import AppLoading from "../../Components/AppLoading";
import FirebaseHelper from "../../firebase/FirebaseHelper";
import images from "../../../assets/images";
import styles from "./style";
import AppHeader from "../../Components/AppHeader";
import AppInput from "../../Components/AppInput";
import Button from "../../Components/Button/Button";
import colors from "../../../assets/colors";

export default class UserBan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: auth().currentUser.uid,
      otherPersonId: this.props.route.params,
      report: "",
      loading: false,
    };
  }
  banUser = () => {
    this.setState({ loading: true });

    let { report, otherPersonId, userId } = this.state;
    if (report === "") {
      this.setState({ loading: false });
      alert("Enter report");
    } else {
      FirebaseHelper.userReport(userId, otherPersonId, report, (callback) => {
        this.setState({ loading: false });

        // console.log(callback);
        Alert.alert("Alert", "Your Report has been submitted", [
          {
            text: "OK",
            onPress: () => this.props.navigation.goBack(),
          },
        ]);
      });
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {AppLoading.renderLoading(this.state.loading)}

        <AppHeader
          title={"User Report"}
          leftIconPath={images.ic_back}
          onLeftIconPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.textInput}>
          <AppInput
            height={hp(8)}
            multiline={true}
            paddingTop={"2%"}
            placeholder={"Enter report"}
            borderWidth={1}
            onChangeText={(report) => this.setState({ report })}
            value={this.state.report}
          />
        </View>
        <View style={styles.button}>
          <Button
            height={hp(7)}
            width={wp(85)}
            buttonText={"Send"}
            bgColor={colors.app_color}
            onPress={this.banUser}
          />
        </View>
      </View>
    );
  }
}
