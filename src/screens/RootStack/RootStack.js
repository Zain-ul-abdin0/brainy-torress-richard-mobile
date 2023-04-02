//================================ React Native Imported Files ======================================//

import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import * as React from "react";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";

//================================ Local Imported Files ======================================//

import Splash from "../Splash/Splash";
import JobOrder from "../Customer/JobOrder/JobOrder";
import Notifications from "../Notifications/Notifications";
import Messages from "../Customer/Messages/Messages";
import MessageScreen from "../MessageScreen/MessageScreen";
import MessageThreadScreen from "../MessageTabScreen/MessageThreadScreen";
import RequestNewService from "../Customer/RequestNewService/RequestNewService";
import Setting from "../Setting/Setting";
import images from "../../../assets/images";
import OnBoarding from "../OnBoarding/OnBoarding";
import styles from "./style";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import SignUpWith from "../Authentication/SignUpWith/SignUpWith";
import ResetPassword from "../Authentication/ResetPassword/ResetPassword";
import CreateAccount from "../CreateAccount/CreateAccount";
import ReviewComponent from "../../Components/ReviewComponent/ReviewComponent";
import GardenToolComponent from "../../Components/GardenToolComponent/GardenToolComponent";
import BiddersComponent from "../../Components/BiddersComponent/BiddersComponent";
import DriverGardenToolComponent from "../../Components/DriverGardenToolComponent/DriverGardenToolComponent";
import BidderReviewComponent from "../../Components/BidderReviewComponent/BidderReviewComponent";
import ProviderConfirmDelivery from "../ServiceProvider/ProviderConfirmDelivery/ProviderConfirmDelivery";
import SetupPaymentComponent from "../../Components/SetupPaymentComponent/SetupPaymentComponent";
import NotificationComponent from "../../Components/NotificationComponent/NotificationComponent";
import MessageComponent from "../../Components/MessageComponent/MessageComponent";
import ImageListComponent from "../../Components/ImageListComponent/ImageListComponent";
import CollapseComponent from "../../Components/collapse/CollapseComponent";
import BankAccountComponent from "../../Components/BankAccountComponent/BankAccountComponent";
import DocumentComponent from "../../Components/DocumentComponent/DocumentComponent";
import MyDocuments from "../ServiceProvider/MyDocuments/MyDocuments";
import MyWallet from "../ServiceProvider/MyWallet/MyWallet";
import AddCard from "../Customer/AddCard/AddCard";
import SetupPayment from "../Customer/SetupPayment/SetupPayment";
import ConfirmDelivery from "../Customer/ConfirmDelivery/ConfirmDelivery";
import PaymentMethod from "../Customer/PaymentMethod/PaymentMethod";
import SelectLocation from "../Customer/SelectLocation/SelectLocation";
import BidDetails from "../Customer/BidDetails/BidDetails";
import ProviderEditProfile from "../ServiceProvider/ProviderEditProfile/ProviderEditProfile";
import ProviderProfile from "../Customer/ProviderProfile/ProviderProfile";
import EditProfile from "../Customer/EditProfile/EditProfile";
import MyProfile from "../Customer/MyProfile/MyProfile";
import Directions from "../ServiceProvider/Directions/Directions";
import ProviderServiceDetails from "../ServiceProvider/ProviderServiceDetails/ProviderServiceDetails";
import ServiceDetails from "../Customer/ServiceDetails/ServiceDetails";
import Chat from "../Chat/Chat";
import Privacy from "../Privacy/Privacy";
import Terms from "../Terms/Terms";
import Report from "../Report/Report";
import About from "../About/About";
import HomeScreen from "../ServiceProvider/HomeScreen/HomeScreen";
import ProviderJobOrder from "../ServiceProvider/ProviderJobOrder/ProviderJobOrder";
import EnterNewPassword from "../Authentication/EnterNewPassword/EnterNewPassword";
import MenuScreen from "../MenuScreen/MenuScreen";
import CommonDataManager from "../../common/Singleton";
import AddSubscription from "../AddSubscription/AddSubscription";
import UserBan from "../UserBan/UserBan";

//================================ Root Stack ======================================//

function CustomDrawerContentUser(props) {
  return (
    <View {...props} style={styles.drawerMainContainer}>
      <ImageBackground style={styles.backgroundImageContainer}>
        <View style={styles.userInfoContainer}>
          <TouchableOpacity
            style={styles.userImageContainer}
            onPress={() => props.navigation.navigate("MyProfile")}
          >
            <Image
              source={{ uri: CommonDataManager.getInstance().getImage() }}
              style={styles.userProfileImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.userTextContainer}>
            <Text style={styles.userNameText}>
              {CommonDataManager.getInstance().getName()}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={[styles.drawerItemLabelText]}>{"Home"}</Text>
            )}
            icon={() => (
              <Image
                source={images.ic_Home2}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => {
              props.navigation.navigate("JobOrder");
            }}
          />

          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={[styles.drawerItemLabelText]}>{"Messages"}</Text>
            )}
            icon={() => (
              <Image
                source={images.icn_messages}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => {
              props.navigation.navigate("Messages");
            }}
          />

          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={[styles.drawerItemLabelText]}>
                {"Notifications"}
              </Text>
            )}
            icon={() => (
              <Image source={images.ic_BELL} style={[styles.drawerItemImage]} />
            )}
            onPress={() => {
              props.navigation.navigate("Notifications");
            }}
          />

          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={[styles.drawerItemLabelText]}>{"Settings"}</Text>
            )}
            icon={() => (
              <Image
                source={images.icn_settings}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => {
              props.navigation.navigate("Setting");
            }}
          />

          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={[styles.drawerItemLabelText]}>
                {"Switch to Service Provider"}
              </Text>
            )}
            icon={() => (
              <Image
                source={images.ic_steringWheel}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => {
              props.navigation.navigate("MenuScreen");
            }}
          />

          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={[styles.drawerItemLabelText]}>{"Logout"}</Text>
            )}
            icon={() => (
              <Image
                source={images.icn_logout}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => {
              Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                  { text: "No", style: "destructive" },
                  {
                    text: "Yes",
                    onPress: async () => {
                      props.navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [{ name: "SignUpWith" }],
                        })
                      );
                      try {
                        await AsyncStorage.clear().then(() => {
                          CommonDataManager.getInstance().setUser(null);
                          auth().signOut();
                        });
                      } catch (error) {
                        console.log("Error While Signing Out");
                      }
                      console.log("Done.");
                    },
                  },
                ],
                { cancelable: true }
              );
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

function CustomDrawerContentProvider(props) {
  return (
    <View {...props} style={styles.drawerMainContainer}>
      <ImageBackground style={styles.backgroundImageContainer}>
        <View style={styles.userInfoContainer}>
          <TouchableOpacity
            style={styles.userImageContainer}
            onPress={() => props.navigation.navigate("ProviderProfile")}
          >
            <Image
              source={{ uri: CommonDataManager.getInstance().getImage() }}
              style={styles.userProfileImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.userTextContainer}>
            <Text style={styles.userNameText}>
              {CommonDataManager.getInstance().getName()}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={[styles.drawerItemLabelText]}>{"Home"}</Text>
            )}
            icon={() => (
              <Image
                source={images.icn_home}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => {
              props.navigation.navigate("HomeScreen");
            }}
          />

          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={[styles.drawerItemLabelText]}>
                {"My Job Orders"}
              </Text>
            )}
            icon={() => (
              <Image
                source={images.ic_terms2}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => {
              props.navigation.navigate("ProviderJobOrder", {
                markerValue: false,
              });
            }}
          />

          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={[styles.drawerItemLabelText]}>{"Messages"}</Text>
            )}
            icon={() => (
              <Image
                source={images.icn_messages}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => {
              props.navigation.navigate("Messages");
            }}
          />

          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={[styles.drawerItemLabelText]}>{"Settings"}</Text>
            )}
            icon={() => (
              <Image
                source={images.icn_settings}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => {
              props.navigation.navigate("Setting");
            }}
          />

          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={[styles.drawerItemLabelText]}>
                {"Switch to User Account"}
              </Text>
            )}
            icon={() => (
              <Image
                source={images.ic_JobAccount}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => {
              props.navigation.navigate("MenuScreen");
            }}
          />

          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={[styles.drawerItemLabelText]}>{"Logout"}</Text>
            )}
            icon={() => (
              <Image
                source={images.icn_logout}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => {
              Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                  { text: "No", style: "destructive" },
                  {
                    text: "Yes",
                    onPress: async () => {
                      props.navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [{ name: "SignUpWith" }],
                        })
                      );
                      try {
                        await AsyncStorage.clear().then(() => {
                          CommonDataManager.getInstance().setUser(null);
                          auth().signOut();
                        });
                      } catch (error) {
                        console.log("Error While Signing Out");
                      }
                      console.log("Done.");
                    },
                  },
                ],
                { cancelable: true }
              );
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const DrawerUser = createDrawerNavigator();
function drawerNavUser() {
  return (
    <DrawerUser.Navigator
      initialRouteName="JobOrder"
      drawerContent={(props) => CustomDrawerContentUser(props)}
    >
      <DrawerUser.Screen name="JobOrder" component={JobOrder} />
      {/*<DrawerUser.Screen name="HomeScreen" component={HomeScreen} />*/}
      <DrawerUser.Screen name="Notifications" component={Notifications} />
      {/*<DrawerUser.Screen name="Messages" component={Messages} />*/}
      <DrawerUser.Screen name="Messages" component={MessageThreadScreen} />
      <DrawerUser.Screen name="Setting" component={Setting} />
    </DrawerUser.Navigator>
  );
}

const DrawerDriver = createDrawerNavigator();
function drawerNavProvider() {
  return (
    <DrawerDriver.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => CustomDrawerContentProvider(props)}
    >
      <DrawerDriver.Screen name="HomeScreen" component={HomeScreen} />
      <DrawerDriver.Screen
        name="ProviderJobOrder"
        component={ProviderJobOrder}
      />
      <DrawerUser.Screen name="Messages" component={MessageThreadScreen} />
      <DrawerDriver.Screen name="Setting" component={Setting} />
    </DrawerDriver.Navigator>
  );
}

const RootStack = createStackNavigator();
export default function myStack() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={"Splash"}
        headerMode={"none"}
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <RootStack.Screen name="Splash" component={Splash} />
        <RootStack.Screen name="On" component={OnBoarding} />
        <RootStack.Screen name="SignUpWith" component={SignUpWith} />
        <RootStack.Screen name="SignUp" component={SignUp} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="MenuScreen" component={MenuScreen} />
        <RootStack.Screen name="Reset" component={ResetPassword} />
        <RootStack.Screen name="CreateAccount" component={CreateAccount} />
        <RootStack.Screen name="About" component={About} />
        <RootStack.Screen name="Report" component={Report} />
        <RootStack.Screen name="Terms" component={Terms} />
        <RootStack.Screen name="Privacy" component={Privacy} />
        <RootStack.Screen name="Chat" component={Chat} />
        <RootStack.Screen name="UserServiceDetail" component={ServiceDetails} />
        <RootStack.Screen
          name="ProviderServiceDetails"
          component={ProviderServiceDetails}
        />
        <RootStack.Screen name="DirectionsView" component={Directions} />
        <RootStack.Screen name="MyProfile" component={MyProfile} />
        <RootStack.Screen name="EditProfile" component={EditProfile} />
        <RootStack.Screen name="ProviderProfile" component={ProviderProfile} />
        <RootStack.Screen
          name="ProviderEditProfile"
          component={ProviderEditProfile}
        />
        <RootStack.Screen name="BidDetails" component={BidDetails} />
        <RootStack.Screen name="SelectLocation" component={SelectLocation} />
        <RootStack.Screen name="PaymentMethod" component={PaymentMethod} />
        <RootStack.Screen name="ConfirmDelivery" component={ConfirmDelivery} />
        <RootStack.Screen name="SetupPayment" component={SetupPayment} />
        <RootStack.Screen name="AddCard" component={AddCard} />
        <RootStack.Screen name="MyWallet" component={MyWallet} />
        <RootStack.Screen name="MyDocuments" component={MyDocuments} />
        <RootStack.Screen
          name="EnterNewPassword"
          component={EnterNewPassword}
        />
        <RootStack.Screen name="messageScreen" component={MessageScreen} />
        <RootStack.Screen name="UserBan" component={UserBan} />
        {/*<RootStack.Screen name="MessageThreads" component={MessageThreadScreen} />*/}

        <RootStack.Screen name="RequestService" component={RequestNewService} />
        <RootStack.Screen name="drawerNavUser" component={drawerNavUser} />
        <RootStack.Screen
          name="drawerNavProvider"
          component={drawerNavProvider}
        />

        {/* //================================ Component ======================================// */}

        <RootStack.Screen name="ReviewComponent" component={ReviewComponent} />
        <RootStack.Screen name="GardenTool" component={GardenToolComponent} />
        <RootStack.Screen
          name="BiddersComponent"
          component={BiddersComponent}
        />
        <RootStack.Screen
          name="DriverGardenToolComponent"
          component={DriverGardenToolComponent}
        />
        <RootStack.Screen
          name="Bidder Component"
          component={BidderReviewComponent}
        />
        <RootStack.Screen
          name="DriverConfirmDelivery"
          component={ProviderConfirmDelivery}
        />
        <RootStack.Screen
          name="SetupPaymentComponent"
          component={SetupPaymentComponent}
        />
        <RootStack.Screen
          name="NotificationComponent"
          component={NotificationComponent}
        />
        <RootStack.Screen
          name="MessageComponent"
          component={MessageComponent}
        />
        <RootStack.Screen
          name="ImageListComponent"
          component={ImageListComponent}
        />
        <RootStack.Screen name="Collapse" component={CollapseComponent} />
        <RootStack.Screen
          name="BankAccountComponent"
          component={BankAccountComponent}
        />
        <RootStack.Screen
          name="DocumentComponent"
          component={DocumentComponent}
        />
        <RootStack.Screen name="AddSubscription" component={AddSubscription} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
