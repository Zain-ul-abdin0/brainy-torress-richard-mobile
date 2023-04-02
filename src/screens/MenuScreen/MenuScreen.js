//================================ React Native Imported Files ======================================//

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import auth from "@react-native-firebase/auth";

//================================ Local Imported Files ======================================//

import CommonDataManager from "../../common/Singleton";
import images from "../../../assets/images";
import styles from "./style";
import AppLoading from "../../Components/AppLoading";
import FirebaseHelper from "../../firebase/FirebaseHelper";

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: auth().currentUser.uid,
      serviceId: "",
      loading: false,
      isApproved: false,
    };
  }

  componentDidMount() {
    this.focusListner = this.props.navigation.addListener("focus", () => {
      this.getUserProfile();
    });
  }

  componentWillUnmount() {
    this.focusListner();
  }

  getUserProfile = () => {
    this.setState({ loading: true });
    let { userId } = this.state;
    FirebaseHelper.getUserProfile(userId, (response) => {
      if (response === undefined) {
        this.setState({ loading: false });
      } else {
        this.setState(
          {
            serviceId: response._data.serviceProvidedDocId,
            loading: false,
            isApproved: response._data.isApproved,
          },
          () => {
            // console.log("isApproved", this.state.isApproved);
          }
        );
      }
    });
  };

  onPressHire = () => {
    CommonDataManager.getInstance().setIsCustomer(true);
    this.props.navigation.navigate("drawerNavUser");
  };

  onPressToWork = () => {
    let { serviceId, isApproved } = this.state;

    if (serviceId === "") {
      this.props.navigation.navigate("ProviderEditProfile");
    } else {
      if (isApproved === true) {
        CommonDataManager.getInstance().setIsCustomer(false);
        this.props.navigation.navigate("drawerNavProvider");
      } else {
        alert("Your profile has not been approved yet");
      }
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {AppLoading.renderLoading(this.state.loading)}
        <View style={styles.backgroundImageView}>
          <Image style={styles.imageStyle} source={images.ic_logoSplash} />
        </View>

        <View style={styles.viewText}>
          <Text style={styles.textInfo}>
            How can GET IT DONE {"\n"} help you?
          </Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.onPressHire}
          >
            <Text style={styles.textButton}>
              I am looking to HIRE some help
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.onPressToWork}
          >
            <Text style={styles.textButton}>I am looking to do some WORK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
