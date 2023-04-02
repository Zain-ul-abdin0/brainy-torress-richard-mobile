//================================ React Native Imported Files ======================================//

import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

//================================ Local Imported Files ======================================//

import Button from "../../../Components/Button/Button";
import styles from "./style";
import AppInput from "../../../Components/AppInput";
import FirebaseHelper from "../../../firebase/FirebaseHelper";
import TextButton from "../../../Components/TextButton";
import images from "../../../../assets/images";
import CheckBox from "../../../Components/CheckBox";
import AppHeader from "../../../Components/AppHeader";
import CommonDataManager from "../../../common/Singleton";
import AppLoading from "../../../Components/AppLoading";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  onLogin = async () => {
    this.setState({ loading: true });
    let { email, password } = this.state;
    if (email === "") {
      this.setState({ loading: false });
      alert("Please enter email");
    } else if (password === "") {
      this.setState({ loading: false });
      alert("Please enter password");
    } else {
      await auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          if (res.additionalUserInfo.isNewUser === false) {
            try {
              const userId = auth().currentUser.uid;
              FirebaseHelper.getUserProfile(userId, (response) => {
                if (response) {
                  if (response._data.isBanned === false) {
                    this.setValue(userId).then(() => {
                      FirebaseHelper.fcmToken((token) => {
                        FirebaseHelper.updateProfileForFcmToken(
                          userId,
                          token
                        ).then(() => {
                          // console.log("Response",response)
                          CommonDataManager.getInstance().setImage(
                            response._data.imageUrl
                          );
                          CommonDataManager.getInstance().setName(
                            response._data.name
                          );
                          this.setState({ loading: false }, () => {
                            this.props.navigation.navigate("MenuScreen");
                          });
                        });
                      });
                    });
                  } else {
                    this.setState({ loading: false });
                    alert(
                      "User is banned by admin. Please contact at admin@getitdone.com"
                    );
                  }
                } else {
                  this.setState({ loading: false });
                  alert("SignUp First!");
                }
              });
            } catch (error) {
              this.setState({ loading: false });
              alert(error);
            }
          } else {
            this.setState({ loading: false });
            alert("No User Found");
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          if (
            error.message ===
            "[auth/wrong-password] The password is invalid or the user does not have a password."
          ) {
            alert("Wrong Password");
          } else {
            alert(error);
          }
        });
    }
  };

  setValue = async (value) => {
    try {
      await AsyncStorage.setItem("Uid", value).then(() => {
        CommonDataManager.getInstance().setUser(value);
      });
    } catch (e) {
      console.log(e);
    }
    console.log("Done.");
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {AppLoading.renderLoading(this.state.loading)}
        <AppHeader
          title={"Login"}
          leftIconPath={images.ic_back}
          onLeftIconPress={() => this.props.navigation.goBack()}
        />
        <TouchableWithoutFeedback
          style={styles.mainContainer}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.mainContainerInput}>
            <AppInput
              placeholder={"Enter Email"}
              borderWidth={1}
              keyboardType={"email-address"}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />

            <AppInput
              placeholder={"Enter Password"}
              borderWidth={1}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
            <View
              style={{
                alignSelf: "flex-start",
                paddingTop: hp(2.5),
                paddingLeft: wp(9),
              }}
            >
              <CheckBox checkTitle={"Remember Me"} />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.btnView}>
          <Button buttonText={"Login"} onPress={this.onLogin} />

          <View style={styles.textBtn}>
            <TextButton
              onPress={() => this.props.navigation.navigate("Reset")}
              title={"Forgot Password?"}
            />
          </View>
        </View>
      </View>
    );
  }
}
