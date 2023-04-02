//================================ React Native Imported Files ======================================//

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Keyboard,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { launchImageLibrary } from "react-native-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import { CommonActions, NavigationContainer } from "@react-navigation/native";

//================================ Local Imported Files ======================================//

import AppHeader from "../../../Components/AppHeader";
import AppInput from "../../../Components/AppInput";
import images from "../../../../assets/images";
import styles from "./style";
import FirebaseHelper from "../../../firebase/FirebaseHelper";
import CommonDataManager from "../../../common/Singleton";
import AppLoading from "../../../Components/AppLoading";
import Picker from "../../../Components/ImagePickerView/Picker";
import LicensePick from "../../../Components/ShowCaseImages/License";

export default class ProviderEditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: auth().currentUser.uid,
      name: "",
      image: "",
      userName: "",
      introduction: "",
      filePath: "",

      profileTitle: "",
      skills: "",
      qualification: "",
      serviceOffered: "",

      showCase: [],
      certificates: [],
      showCaseUrl: [],
      licenseUrl: [],
    };
  }

  componentDidMount() {
    this.getUserProfile();
  }

  removeShowCaseImages = (item) => {
    if (this.state.showCase.length > 1) {
      this.setState({
        showCase: this.state.showCase.filter((img) => img.uri !== item.uri),
      });
    } else {
      alert("Minimum one image required");
    }
  };

  removeImages = (item) => {
    if (this.state.certificates.length > 1) {
      this.setState({
        certificates: this.state.certificates.filter(
          (img) => img.uri !== item.uri
        ),
      });
    } else {
      alert("Minimum one image required");
    }
  };

  getUserProfile = () => {
    this.setState({ loading: true });
    let { userId } = this.state;
    FirebaseHelper.getUserProfile(userId, (response) => {
      if (response === undefined) {
        this.setState({ loading: false });
      } else {
        if (response._data.profileTitle === undefined) {
          this.setState({
            name: response._data.name,
            image: response._data.imageUrl,
            userName: response._data.name,
            introduction: response._data.introduction,
            loading: false,
          });
        } else {
          this.setState({
            name: response._data.name,
            image: response._data.imageUrl,
            userName: response._data.name,
            introduction: response._data.introduction,
            profileTitle: response._data.profileTitle,
            skills: response._data.skills,
            qualification: response._data.qualification,
            serviceOffered: response._data.serviceOffered,
            loading: false,
          });
        }
      }
    });
  };

  chooseFile = () => {
    let options = {
      mediaType: "photo",
    };

    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
      } else if (res.errorMessage) {
      } else {
        this.setState({ filePath: res });
      }
    });
  };

  chooseShowCaseWork = () => {
    let options = {
      mediaType: "photo",
    };

    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
      } else if (res.errorMessage) {
      } else {
        this.setState({ showCase: [...this.state.showCase, res] });
      }
    });
  };

  chooseLicense = () => {
    let options = {
      mediaType: "photo",
    };

    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
      } else if (res.errorMessage) {
      } else {
        this.setState({ certificates: [...this.state.certificates, res] });
      }
    });
  };

  uploadShowCaseWork = (ImagesArray, callback) => {
    let imagesUrlArray = [];
    ImagesArray.map((item) => {
      if (item) {
        const image =
          Platform.OS === "android"
            ? item.uri
            : item.uri.replace("file:///", ""); //imagePath.uri;
        const imageRef = storage().ref(`showCaseWork/${item.fileName}`);
        imageRef
          .putFile(image)
          .then(() => {
            storage()
              .ref(`showCaseWork/${item.fileName}`)
              .getDownloadURL()
              .then((url) => {
                if (url) {
                  imagesUrlArray.push(url);
                  if (ImagesArray.length === imagesUrlArray.length) {
                    callback(imagesUrlArray);
                  }
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
      } else {
        this.setState({ loading: false });
        alert("Please Select Image.");
      }
    });
  };

  uploadLicensePhotos = (ImagesArray, callback) => {
    let imagesUrlArray = [];
    ImagesArray.map((item) => {
      if (item) {
        const image =
          Platform.OS === "android"
            ? item.uri
            : item.uri.replace("file:///", ""); //imagePath.uri;
        const imageRef = storage().ref(`licenseImages/${item.fileName}`);
        imageRef
          .putFile(image)
          .then(() => {
            storage()
              .ref(`licenseImages/${item.fileName}`)
              .getDownloadURL()
              .then((url) => {
                if (url) {
                  imagesUrlArray.push(url);
                  if (ImagesArray.length === imagesUrlArray.length) {
                    callback(imagesUrlArray);
                  }
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
      } else {
        this.setState({ loading: false });
        alert("Please Select Image.");
      }
    });
  };

  onPressSave = () => {
    this.setState({ loading: true });
    let {
      certificates,
      showCase,
      name,
      userName,
      introduction,
      filePath,
      profileTitle,
      skills,
      qualification,
      serviceOffered,
    } = this.state;
    if (name === "") {
      this.setState({ loading: false });
      alert("Please Enter Your name");
    }
    if (userName === "") {
      this.setState({ loading: false });
      alert("Please Enter Username");
    }
    if (introduction === "") {
      this.setState({ loading: false });
      alert("Please Enter Your introduction");
    } else if (profileTitle === "") {
      this.setState({ loading: false });
      alert("Please Enter Profile Title");
    } else if (skills === "") {
      this.setState({ loading: false });
      alert("Please Enter Your Skills");
    } else if (qualification === "") {
      this.setState({ loading: false });
      alert("Please Enter Your Skills");
    } else if (serviceOffered === "") {
      this.setState({ loading: false });
      alert("Please Enter Your Services");
    } else if (certificates.length === 0) {
      this.setState({ loading: false });
      alert("Please Select minimum one image of your licenses");
    } else if (showCase.length === 0) {
      this.setState({ loading: false });
      alert("Please Select minimum one image for your show case work");
    } else if (filePath !== "" || showCase.length > 0) {
      if (filePath !== "") {
        this.uploadImage(filePath, (callback) => {
          this.setState({ image: callback }, () => {
            this.updateProfileData();
          });
        });
      } else {
        this.uploadShowCaseWork(this.state.showCase, (resp) => {
          this.uploadLicensePhotos(this.state.certificates, (response) => {
            this.setState({ showCaseUrl: resp, licenseUrl: response }, () => {
              this.updateProfileData();
            });
          });
        });
      }
    } else {
      this.updateProfileData();
    }
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

  updateProfileData = () => {
    let {
      licenseUrl,
      showCaseUrl,
      userId,
      name,
      userName,
      introduction,
      image,
      profileTitle,
      skills,
      qualification,
      serviceOffered,
    } = this.state;
    FirebaseHelper.updateProviderProfile(
      licenseUrl,
      showCaseUrl,
      userId,
      name,
      userName,
      introduction,
      image,
      profileTitle,
      skills,
      qualification,
      serviceOffered
    ).then(() => {
      CommonDataManager.getInstance().setImage(image);
      CommonDataManager.getInstance().setName(name);
      this.setState({ loading: false }, () => {
        Alert.alert("Alert", "Your request has been submitted", [
          {
            text: "OK",
            onPress: () =>
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: "MenuScreen" }],
                })
              ),
          },
        ]);
        // this.props.navigation.navigate('drawerNavProvider')
      });
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {AppLoading.renderLoading(this.state.loading)}
        <AppHeader
          title={"Edit Profile"}
          leftIconPath={images.ic_back}
          onLeftIconPress={() => this.props.navigation.goBack()}
          rightText={"Save"}
          onRightIconPress={() => this.onPressSave()}
        />

        <View style={styles.upperView}>
          <TouchableOpacity onPress={this.chooseFile.bind(this)}>
            <Image
              style={styles.imgUpperView}
              source={
                this.state.filePath
                  ? { uri: this.state.filePath.uri }
                  : { uri: this.state.image }
              }
            />
          </TouchableOpacity>
        </View>
        {/*<TouchableWithoutFeedback*/}
        {/*    // style={{flex:1}}*/}
        {/*    onPress={() => Keyboard.dismiss()}>*/}
        <KeyboardAwareScrollView
          contentContainerStyle={{ paddingBottom: hp(7) }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.appInputs}>
            <AppInput
              placeholder={"Enter Name"}
              borderWidth={1}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
            />

            <AppInput
              placeholder={"Username"}
              borderWidth={1}
              onChangeText={(userName) => this.setState({ userName })}
              value={this.state.userName}
            />

            <AppInput
              placeholder={"Profile Title"}
              borderWidth={1}
              onChangeText={(profileTitle) => this.setState({ profileTitle })}
              value={this.state.profileTitle}
            />
            <AppInput
              placeholder={"Skills"}
              height={130}
              multiline={true}
              textAlignVertical={"top"}
              borderWidth={1}
              onChangeText={(skills) => this.setState({ skills })}
              value={this.state.skills}
            />

            <AppInput
              placeholder={"Qualifications"}
              height={150}
              multiline={true}
              textAlignVertical={"top"}
              borderWidth={1}
              onChangeText={(qualification) => this.setState({ qualification })}
              value={this.state.qualification}
            />

            <AppInput
              placeholder={"Service Offered"}
              height={150}
              multiline={true}
              textAlignVertical={"top"}
              borderWidth={1}
              onChangeText={(serviceOffered) =>
                this.setState({ serviceOffered })
              }
              value={this.state.serviceOffered}
            />
          </View>
          <View style={{ height: hp(18), width: wp(100) }}>
            <View style={{ height: hp(5), width: wp(100) }}>
              <Text style={styles.textShowCase}>Showcase your work</Text>
            </View>

            <View
              style={{ height: hp(13), width: wp(100), flexDirection: "row" }}
            >
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => this.chooseShowCaseWork()}
              >
                <Text style={styles.textButton}>Add Photo</Text>
              </TouchableOpacity>

              {this.state.showCase && (
                <View style={styles.imageSelected}>
                  <FlatList
                    data={this.state.showCase}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(val) => val.uri}
                    renderItem={({ item }) => {
                      return (
                        <Picker
                          item={item}
                          remove={this.removeShowCaseImages}
                        />
                      );
                    }}
                  />
                </View>
              )}
            </View>
          </View>

          <View style={{ height: hp(18), width: wp(100) }}>
            <View style={{ height: hp(5), width: wp(100) }}>
              <Text style={styles.textShowCase}>Certificates and Licences</Text>
            </View>
            <View
              style={{ height: hp(13), width: wp(100), flexDirection: "row" }}
            >
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => this.chooseLicense()}
              >
                <Text style={styles.textButton}>Add Photo</Text>
              </TouchableOpacity>
              {this.state.certificates && (
                <View style={styles.imageSelected}>
                  <FlatList
                    data={this.state.certificates}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(val) => val.uri}
                    renderItem={({ item }) => {
                      return (
                        <LicensePick item={item} remove={this.removeImages} />
                      );
                    }}
                  />
                </View>
              )}
            </View>
          </View>

          <View style={styles.btnView}>
            <Text style={styles.textProfileDetails}>
              Profile information, Pictures and Documents will be shared with
              others. It is recommended to block out any sensitive information
              that might appear in your certifications and licenses.
            </Text>
          </View>
        </KeyboardAwareScrollView>
        {/*</TouchableWithoutFeedback>*/}
      </View>
    );
  }
}
