//================================ React Native Imported Files ======================================//

import React from "react";
import { View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonDataManager from "../../common/Singleton";
import FirebaseHelper from "../../firebase/FirebaseHelper";

//================================ Local Imported Files ======================================//

import images from "../../../assets/images";
import styles from "./style";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.getValue();
    }, 2000);
  }

  getValue = async () => {
    try {
      await AsyncStorage.getItem("Uid").then((resp) => {
        if (resp) {
          FirebaseHelper.getUserProfile(resp, (resp) => {
            if (resp._data.isBanned === true) {
              alert(
                "User is banned by admin. Please contact at admin@getitdone.com"
              );
            } else {
              if (resp !== undefined) {
                CommonDataManager.getInstance().setImage(resp._data.imageUrl);
                CommonDataManager.getInstance().setName(resp._data.name);
                CommonDataManager.getInstance().setUser(resp.id);
                this.props.navigation.navigate("MenuScreen");
              }
            }
          });
        } else {
          this.props.navigation.navigate("On");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.viewStyle}>
        <Image style={styles.logo} source={images.splash} />
      </View>
    );
  }
}
