//================================ React Native Imported Files ======================================//

import React from "react";
import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import firestore from "@react-native-firebase/firestore";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

//================================ Local Imported Files ======================================//

import FirebaseHelper from "../../../firebase/FirebaseHelper";
import images from "../../../../assets/images";
import styles from "./style";
import Button from "../../../Components/Button/Button";
import colors from "../../../../assets/colors";
import CommonDataManager from "../../../common/Singleton";
import AppLoading from "../../../Components/AppLoading";

export default class SignUpWith extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      picUrl: "",
      socialMedia: false,
      socialUserId: "",
      loading: false,
    };
  }

  firebaseGoogleLogin = async () => {
    this.setState({ loading: true });
    try {
      GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
        webClientId:
          "1063346659341-di524njfaphgmgarrto517mql0m97ujl.apps.googleusercontent.com",
        offlineAccess: true,
        forceCodeForRefreshToken: true,
      });
      // await GoogleSignin.configure();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const credential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken
      );
      const firebaseUserCredential = await auth().signInWithCredential(
        credential
      );
      FirebaseHelper.getUserProfile(
        firebaseUserCredential.user.uid,
        (response) => {
          if (response._exists !== true) {
            FirebaseHelper.fcmToken((token) => {
              this.createUserProfileGoogle(
                firebaseUserCredential.user.uid,
                firebaseUserCredential.user._user.displayName,
                firebaseUserCredential.user._user.email,
                firebaseUserCredential.user._user.photoURL,
                token
              );
            });
          } else {
            if (response._data.isBanned === false) {
              this.setValue(firebaseUserCredential.user.uid).then(() => {
                FirebaseHelper.fcmToken((token) => {
                  FirebaseHelper.updateProfileForFcmToken(
                    firebaseUserCredential.user.uid,
                    token
                  ).then(() => {
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
          }
        }
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        this.setState({ loading: false });
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        this.setState({ loading: false });
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        this.setState({ loading: false });
        // play services not available or outdated
      } else {
        this.setState({ loading: false });
        // some other error happened
      }
    }
  };

  onFacebookLogin = () => {
    this.setState({ loading: true });
    FirebaseHelper.loginWithFacebook((user) => {
      if (user.isSuccess) {
        FirebaseHelper.getUserProfile(user.response.uid, (response) => {
          if (response._exists !== true) {
            FirebaseHelper.fcmToken((token) => {
              this.createUserProfileFacebook(
                user.response.uid,
                user.response._user.displayName,
                user.response._user.email,
                user.response._user.photoURL,
                token
              );
            });
          } else {
            if (response._data.isBanned === false) {
              this.setValue(user.response.uid).then(() => {
                FirebaseHelper.fcmToken((token) => {
                  FirebaseHelper.updateProfileForFcmToken(
                    user.response.uid,
                    token
                  ).then(() => {
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
          }
        });
      } else {
        if (
          user.message ===
          "[auth/account-exists-with-different-credential] An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address."
        )
          this.setState({ loading: false });
        alert("Account Already Exists");
      }
    });
  };

  createUserProfileFacebook = async (id, name, email, pic, token) => {
    await firestore()
      .collection("UserRecord")
      .doc(id)
      .set({
        name: name,
        email: email,
        imageUrl: pic,
        rating: 1,
        userName: name,
        introduction: "My Introduction",
        fcmToken: token,
        chatThreads: [],
        serviceProvidedDocId: "",
        isBanned: false,
        applicationStatus: "approved",
        isApproved: false,
        isServiceProvider: false,
        rejectedReason: "",
      })
      .then(() => {
        this.setValue(id).then(() => {
          CommonDataManager.getInstance().setImage(pic);
          CommonDataManager.getInstance().setName(name);
          this.setState({ loading: false }, () => {
            this.props.navigation.navigate("MenuScreen");
          });
        });
      });
  };

  createUserProfileGoogle = async (id, name, email, pic, token) => {
    await firestore()
      .collection("UserRecord")
      .doc(id)
      .set({
        name: name,
        email: email,
        imageUrl: pic,
        rating: 1,
        introduction: "My Introduction",
        userName: name,
        fcmToken: token,
        chatThreads: [],
        serviceProvidedDocId: "",
        isBanned: false,
        applicationStatus: "approved",
        isApproved: false,
        isServiceProvider: false,
        rejectedReason: "",
      })
      .then(() => {
        this.setValue(id).then(() => {
          CommonDataManager.getInstance().setImage(pic);
          CommonDataManager.getInstance().setName(name);
          this.setState({ loading: false }, () => {
            this.props.navigation.navigate("MenuScreen");
          });
        });
      });
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
        <View style={styles.upperContainer}>
          <Image
            style={{ height: hp(20), width: hp(20), resizeMode: "contain" }}
            source={images.ic_logoSplash}
          />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.title}>SIGN UP WITH</Text>

          <Button
            buttonText={"Sign up with Facebook"}
            isImagePath={images.icn_facebook}
            bgColor={"#3b5998"}
            onPress={this.onFacebookLogin}
          />

          {/*<Button*/}
          {/*    buttonText={'Sign up with Apple'}*/}
          {/*    isImagePath={images.icn_appke}*/}
          {/*    onPress={() => this.props.navigation.navigate('MenuScreen')}*/}
          {/*    bgColor={'#000000'}*/}
          {/*    marginTop={hp(1.5)}*/}
          {/*/>*/}
          <Button
            buttonText={"Sign up with Gmail"}
            isImagePath={images.google}
            onPress={this.firebaseGoogleLogin}
            bgColor={colors.white}
            textColor={colors.black}
            isImageStyle={{ width: hp(4), height: hp(4) }}
            marginTop={hp(1.5)}
          />

          <View style={styles.viewOr}>
            <View style={styles.lineView} />
            <Text
              style={{
                fontSize: wp(4.5),
                color: colors.white,
                fontFamily: "Roboto-Bold",
              }}
            >
              OR
            </Text>
            <View style={styles.lineView} />
          </View>

          <Button
            buttonText={"Sign up with Email"}
            isImagePath={images.icn_mail}
            onPress={() => this.props.navigation.navigate("SignUp")}
            bgColor={"#4c4c4c"}
            marginTop={hp(1.5)}
          />

          <Button
            buttonText={"Already have an account?"}
            isImagePath={images.icn_user}
            onPress={() => this.props.navigation.navigate("Login")}
            bgColor={"#0096da"}
            marginTop={hp(1.5)}
          />
        </View>
      </View>
    );
  }
}
