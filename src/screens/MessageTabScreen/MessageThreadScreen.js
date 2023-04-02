//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, Text, RefreshControl, FlatList } from "react-native";
import React from "react";

//================================ Local Imported Files ======================================//

import FirebaseHelper from '../../firebase/FirebaseHelper';
import AppLoading from '../../Components/AppLoading';
import styles from "./style";
import moment from "moment";
import AppHeader from '../../Components/AppHeader';
import auth from '@react-native-firebase/auth';
import images from '../../../assets/images';
import MessageComponent from '../../Components/MessageComponent/MessageComponent';


class MessageThreadScreen extends React.Component {
  focusListner;
  constructor(props) {
    super(props);
    this.state = {
      userId: auth().currentUser.uid,
      userName: "",
      userProfileImage: "",
      chatThreads:"",

      loading: false,
      refreshing:false,
      arrayThreads: [],
    };
  }

  componentDidMount() {
    this.focusListner = this.props.navigation.addListener("focus", () => {
      this.fetchProfileOfUser();
    });
    this.getCurrentUserData();
  }


  componentWillUnmount() {
    this.focusListner();
  }


  getCurrentUserData = () => {
    this.setState({loading:true})
    FirebaseHelper.getUserProfile(this.state.userId,(resp) => {

      if(resp.length === 0){
        alert("No Data Found")
      }
      else{
        this.setState({
          userName:         resp._data.name,
          userProfileImage: resp._data.imageUrl,
          chatThreads:      resp._data.chatThreads,
          loading:false,
        });
      }
    })
  }


  fetchProfileOfUser = () => {

    FirebaseHelper.getUserProfile(this.state.userId, (resp) => {
      if (resp) {
        this.setState({ arrayThreads: resp._data.chatThreads, loading: false },() => {console.log("Chat Threads",this.state.chatThreads)});
      }
      else{
        this.setState({loading:false})
        alert("No Profile Found")
      }
    });
  };


  onPressChatThread = (item) => {
    if(item.receiver._id === this.state.userId)
    {
      this.props.navigation.navigate("messageScreen", {
        id:item.sender._id,
      });
    }
    else{
      this.props.navigation.navigate("messageScreen", {
        id:item.receiver._id,
      });
    }
  };


  renderChatThreads = (item) => {
    if(item.receiver._id === this.state.userId)
    {
      return(

          < MessageComponent
              title={item.sender.name}
              text={item.lastMessage.text}
              imageLeft={item.sender.profileImage}
              imageRight={item.imageRight}
              onPress={() => this.onPressChatThread(item)}
          />

      );
    }
    else {
      return (
          < MessageComponent
              title={item.receiver.name}
              text={item.lastMessage.text}
              imageLeft={item.receiver.profileImage}
              imageRight={item.receiver.profileImage}
              onPress={() => this.onPressChatThread(item)}
          />

      );
    }
  };


  onRefresh = () => {
    this.componentDidMount();
  }


  render() {
    return (
      <View style={styles.mainContainer}>

        {AppLoading.renderLoading(this.state.loading)}

        {/* //================================ Header ======================================// */}

        {/*<View style={styles.headerView}>*/}
          <AppHeader
            title={"Messages"}
            leftIconPath={images.ic_back}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        {/*</View>*/}

        {/* //================================ Chat Threads Flatlist ======================================// */}

        {this.state.arrayThreads.length > 0 ? (
          <View style={[styles.viewFlatlist]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.arrayThreads}
              renderItem={({ item }) => this.renderChatThreads(item)}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            />
          </View>
        ) : (
          <View style={styles.chatStyle}>
            <Text style={{ fontSize: hp(3.0) , fontWeight: "bold",alignSelf:'center'}}>No Chat Found</Text>
          </View>
        )}
      </View>
    );
  }
}

export default MessageThreadScreen;
