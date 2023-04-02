//================================ React Native Imported Files ======================================//

import React from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from "@react-native-firebase/storage";

//================================ Local Imported Files ======================================//

import AppHeader from "../../../Components/AppHeader";
import Button from "../../../Components/Button/Button";
import AppInput from "../../../Components/AppInput";
import images from "../../../../assets/images";
import styles from "./style";
import colors from "../../../../assets/colors";
import AppLoading from "../../../Components/AppLoading";
import FirebaseHelper from "../../../firebase/FirebaseHelper";
import CommonDataManager from "../../../common/Singleton";
import { launchImageLibrary } from "react-native-image-picker";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      name: "",
      email: "",
      password: "",
      fcmToken: "",
      profileImage: null,
      url: "",
      isProfileImage: true,
      loading: false,
    };
  }

  accept() {
    this.togglePrivacyAlertModal();
    this.onSignUpUser();
  }

  cancel() {
    this.setState({ showAlert: !this.state.showAlert });
  }

  term() {
    this.setState({ showAlert: !this.state.showAlert });
    this.props.navigation.navigate("Terms");
  }

  privacy() {
    this.setState({ showAlert: !this.state.showAlert });
    this.props.navigation.navigate("Privacy");
  }

  togglePrivacyAlertModal = () => {
    this.setState({ showAlert: !this.state.showAlert });
  };

  uploadImage = (ImagesArray, callback) => {
    const item = ImagesArray;
    const image =
      Platform.OS === "android" ? item.uri : item.uri.replace("file:///", ""); //imagePath.uri;
    const imageRef = storage().ref(`ProfileImages/${item.fileName}`);
    imageRef
      .putFile(image)
      .then(() => {
        storage()
          .ref(`ProfileImages/${item.fileName}`)
          .getDownloadURL()
          .then((urli) => {
            if (urli) {
              console.log("urli", urli);
              callback(urli);
            } else {
              this.setState({ loading: false });
              alert("No Image Url found");
            }
          });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  onSignUpUser = async () => {
    this.setState({ loading: true });
    let { email, password, name, profileImage, url } = this.state;
    if (profileImage === null) {
      this.setState({ loading: false });
      alert("Please select Profile Image");
    } else if (name === "") {
      this.setState({ loading: false });
      alert("Please enter name");
    } else if (email === "") {
      this.setState({ loading: false });
      alert("Please enter email");
    } else if (password === "") {
      this.setState({ loading: false });
      alert("Please enter password");
    } else {
      this.setState({ loading: true });
      this.uploadImage(profileImage, (callback) => {
        // console.log("Callback", callback);
        this.setState({ url: callback }, async () => {
          await auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
              if (res) {
                FirebaseHelper.getUserProfile(res.user.uid, (response) => {
                  FirebaseHelper.fcmToken((token) => {
                    if (response._exists !== true) {
                      this.setValue(res.user.uid).then(() => {
                        console.log("URl", this.state.url);
                        this.onSignUp(
                          res.user.uid,
                          res.user._user.email,
                          name,
                          token,
                          this.state.url
                        ).then(() => {
                          this.setState({ loading: false }, () => {
                            CommonDataManager.getInstance().setImage(
                              this.state.url
                            );
                            CommonDataManager.getInstance().setName(name);
                            this.props.navigation.navigate("MenuScreen");
                          });
                        });
                      });
                    } else {
                      this.setState({ loading: false });
                      alert("Account already exists...");
                    }
                  });
                });
              } else {
                this.setState({ loading: false });
                alert("Problem Having Signing Up...");
              }
            })
            .catch((error) => {
              if (error.code === "auth/email-already-in-use") {
                this.setState({ loading: false });
                alert("That email address is already in use!");
              }
              if (error.code === "auth/invalid-email") {
                this.setState({ loading: false });
                alert("That email address is invalid!");
              }
            });
        });
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

  onSignUp = async (id, email, name, token, url) => {
    await firestore().collection("UserRecord").doc(id).set({
      name: name,
      email: email,
      imageUrl: url,
      rating: 1,
      fcmToken: token,
      chatThreads: [],
      userName: name,
      introduction: "My Introduction",
      serviceProvidedDocId: "",
      isBanned: false,
      applicationStatus: "approved",
      isApproved: false,
      isServiceProvider: false,
      rejectedReason: "",
    });
  };

  renderPrivacyAlert() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: wp("80%"),
            height: hp("25%"),
            backgroundColor: "#f7f7f5",
            borderColor: "#f7f7f5",
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          <View
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                flex: 2,
                flexDirection: "row",
                alignItems: "center",
                width: wp("75%"),
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => this.term()}>
                <Text
                  style={{
                    color: "#218bfd",
                    fontSize: wp("4%"),
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  Terms of Service
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: wp("4%"),
                  fontWeight: "bold",
                  color: colors.black,
                }}
              >
                {" "}
                and{" "}
              </Text>
              <TouchableOpacity onPress={() => this.privacy()}>
                <Text
                  style={{
                    color: "#218bfd",
                    fontSize: wp("4%"),
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: wp("4%"),
                fontWeight: "bold",
                marginTop: wp("-10%"),
                color: colors.black,
              }}
            >
              by signing in you agree on above
            </Text>
          </View>

          {/*Buttons*/}
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ marginLeft: wp("2%") }}>
              <TouchableOpacity
                onPress={() => this.accept()}
                style={{
                  width: wp("36%"),
                  height: hp("7%"),
                  backgroundColor: colors.white,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#d0d0d0",
                  borderWidth: 1,
                }}
              >
                <Text style={{ color: "#218bfd", fontSize: wp("4%") }}>
                  Agree
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginRight: wp("2%") }}>
              <TouchableOpacity
                onPress={() => this.cancel()}
                style={{
                  width: wp("36%"),
                  height: hp("7%"),
                  backgroundColor: colors.white,
                  borderColor: "#d0d0d0",
                  borderRadius: 5,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#218bfd", fontSize: wp("4%") }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  selectFile = () => {
    let options = {
      mediaType: "photo",
    };

    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.errorMessage) {
        console.log("ImagePicker Error: ", res.errorMessage);
      } else {
        this.setState({ profileImage: res, isProfileImage: false });
      }
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {AppLoading.renderLoading(this.state.loading)}

        <View style={styles.container}>
          <AppHeader
            title={"Sign Up"}
            leftIconPath={images.ic_back}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
          <View style={styles.imageView}>
            <TouchableOpacity onPress={this.selectFile}>
              <Image
                style={styles.imgStyle}
                source={
                  this.state.isProfileImage
                    ? images.avatar
                    : this.state.profileImage
                }
              />
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback
            style={styles.mainContainer}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={styles.inputView}>
              <AppInput
                placeholder={"Enter Name"}
                borderWidth={1}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
              />
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
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                secureTextEntry={true}
              />

              {/*<Text style={styles.text}>Password Strength:<Text style={{fontSize:hp(1.9),fontWeight:'bold'}}> Medium</Text></Text>*/}

              {/*<View style={styles.viewTick}>*/}
              {/*    <TickCircle img={images.icn_check_small} title={'At least 6 characters long.'}/>*/}
              {/*    <TickCircle img={images.icn_check_small} title={'Contains a letter.'}/>*/}
              {/*    <TickCircle img={images.icn_check_small} title={'Contains a number.'}/>*/}
              {/*    <TickCircle img={images.icn_error_small} title={'Contains a special character.'}/>*/}
              {/*</View>*/}
            </View>
          </TouchableWithoutFeedback>
          <Modal
            visible={this.state.showAlert}
            transparent={true}
            animationType="fade"
            onRequestClose={this.togglePrivacyAlertModal}
          >
            {this.renderPrivacyAlert()}
          </Modal>
          <View style={styles.btnView}>
            <Button
              buttonText={"Start"}
              onPress={this.togglePrivacyAlertModal}
            />
            <Text style={{ paddingTop: "2%", paddingBottom: "2%" }}>
              Already have an account?
            </Text>
            <Button
              height={hp(2)}
              buttonText={"Login here"}
              onPress={() => this.props.navigation.navigate("Login")}
              bgColor={"transparent"}
              fontSize={15}
              decorationLine={"underline"}
              textColor={colors.app_color}
            />
          </View>
        </View>
      </View>
    );
  }
}
