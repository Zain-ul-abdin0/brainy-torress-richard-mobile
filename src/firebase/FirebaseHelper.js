// import AsyncStorage from "@react-native-community/async-storage";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "@react-native-community/google-signin";
import config from "../../assets/config";
import { Platform } from "react-native";

import CommonDataManager from "./Singleton";
import UtilityHelper from "./UtilityMethods";
import moment, { now } from "moment";
import { statusCodes } from "@react-native-community/google-signin";
import images from "../../assets/images";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import messaging from "@react-native-firebase/messaging";
import { EventRegister } from "react-native-event-listeners";

class firebaseServices {
  constructor(props) {}

  // ---------------------------- Authentication ----------------------------//

  signUpWith(email, password, callback) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // AsyncStorage.setItem('CURRENT_USER', JSON.stringify(user.user));
        callback({
          isSuccess: true,
          response: user.user,
          message: "user logged in successfully.",
        }); // user.user;
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error.message });
      });
  }

  loginWithEmailPass(email, password, callback) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // AsyncStorage.setItem('CURRENT_USER', JSON.stringify(user.user));
        callback({
          isSuccess: true,
          response: user.user,
          message: "user logged in successfully.",
        }); // user.user;
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error.message });
      });
  }

  // ---------------------------- Social Media Authentication ----------------------------//

  loginWithFacebook = (facebookCallback) => {
    LoginManager.logInWithPermissions(["public_profile", "email"])
      .then((result) => {
        console.log("Facebook Result: --->>> ", result);
        if (result.isCancelled) {
          facebookCallback({
            isSuccess: false,
            response: null,
            message: "User cancelled the process",
          });
        } else {
          console.log(
            "Access Token is-->?",
            AccessToken.getCurrentAccessToken()
          );
          return AccessToken.getCurrentAccessToken();
        }
      })
      .then((data) => {
        console.log("Facebook Data: --->>> ", data);
        if (data !== undefined) {
          console.log("Data Token-->?", data.accessToken);
          return auth.FacebookAuthProvider.credential(data.accessToken);
        }
      })
      .then((res) => {
        console.log("Facebook Response: --->>> ", res);
        if (res) {
          this._loginWithSocialMediaCredentials(res, facebookCallback);
        }
      })
      .catch((err) => {
        console.log("Login with Facebook Error: ===>>", err);
        facebookCallback({
          isSuccess: false,
          response: null,
          message: err.message,
        });
      });
  };

  loginWithGoogle = async (googleCallback) => {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
      webClientId:
        "1007639637793-oe674h00mb1en7ve3g85p2lrstl1kvn0.apps.googleusercontent.com",
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken
      );
      const firebaseUserCredential = await auth().signInWithCredential(
        credential
      );

      console.log("Response", firebaseUserCredential);

      // FirebaseHelper.fetchUserData(
      //     firebaseUserCredential.user._user.uid,
      //     (response) => {
      //         if (response._data !== undefined) {
      //             if(response._data.isBanned === false){
      //                 this.setValue(firebaseUserCredential.user._user.uid).then(() => {
      //                     this.props.navigation.navigate('HomeScreen');
      //                 })
      //             }
      //             else if(response._data.isBanned === true){
      //                 alert("User is Banned by the admin")
      //             }
      //         } else {
      //             let str = firebaseUserCredential.user._user.displayName;
      //             let value = this.createUserName(str);
      //             let value1 = '@${value}';
      //             this.setState(
      //                 {
      //                     newName: value1,
      //                 },
      //                 () => {
      //                     this.setValue(firebaseUserCredential.user._user.uid)
      //                         .then(() => {
      //                             this.createUserDatabase(firebaseUserCredential);
      //                         })
      //                 },
      //             );
      //         }
      //     },
      // );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      }
    }
  };

  //
  // GoogleSignin.hasPlayServices().then(res => {
  //         console.log("res--->?",res);
  //         GoogleSignin.signIn().then(data => {
  //             console.log("data--->?",data);
  //             GoogleSignin.getTokens().then((res) => {
  //                 const credential = auth.GoogleAuthProvider.credential(res.idToken, res.accessToken)
  //                 this._loginWithSocialMediaCredentials(credential, googleCallback);
  //                 // console.log("_loginWithSocialMediaCredentials",JSON.stringify(this._loginWithSocialMediaCredentials(credential, googleCallback)))
  //             });
  //         }).catch(error => {
  //             googleCallback({isSuccess: false, response: null, message: this.returnErrorMessage(error)});
  //
  //         });
  //     }).catch(error => {
  //
  //         googleCallback({isSuccess: false, response: null, message: this.returnErrorMessage(error)});
  //
  //     });

  returnErrorMessage = (error) => {
    let errorMesssage = "There is an unknown error.";
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      errorMesssage = "The user canceled the sign-in flow";
    } else if (error.code === statusCodes.IN_PROGRESS) {
      errorMesssage = "The sign-in flow is still in progress";
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      errorMesssage = "Play services are not available";
    }

    return errorMesssage;
  };

  _loginWithSocialMediaCredentials(socialCredentials, callback) {
    auth()
      .signInWithCredential(socialCredentials)
      .then((user) => {
        callback({
          isSuccess: true,
          response: user.user,
          message: "user logged in successfully.",
        }); // user.user;
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error.message });
      });
  }

  // ---------------------------- Profile Methods ----------------------------//

  setProfileForUser(user, profileData, callback) {
    // return
    firestore()
      .collection("userProfile")
      .doc(user.uid)
      .set(profileData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
          message: "Profile created successfully successfully",
        });
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error });
      });
  }

  // updateProfileForUser(userId, profileData, callback) {
  //     let firebaseRef = firestore().collection("userProfile").doc(userId)
  //     firebaseRef.update(profileData).then(response => {
  //         callback({isSuccess: true, response: response, message: "Profile updated successfully"});
  //     }).catch(error => {
  //         callback({isSuccess: false, response: null, message: error});
  //     });
  // }

  getProfileForUser = (user, callback) => {
    firestore()
      .collection("userProfile")
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        if (snapshot._data) {
          callback({
            isSuccess: true,
            response: snapshot,
            message: "User Profile fetched successfully",
          });
        } else {
          callback({
            isSuccess: false,
            response: null,
            message: "Profile Not found",
          });
        }
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error });
      });
  };

  // getLiveProfileForUser = (user, callback) =>{
  //     let collection = firestore().collection('userProfile').doc(user.uid);
  //     let unsubscribe = this.firebaseLiveFetch(collection, (liveCallback)=>{
  //         callback(liveCallback);
  //     });
  //     return unsubscribe;
  // }

  getProfilesOfAllDrivers = (callback) => {
    let firebaseCollection = firestore()
      .collection("userProfile")
      .where("driver", "==", true);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  getProfilesOfAllUsers = (callback) => {
    let firebaseCollection = firestore()
      .collection("userProfile")
      .where("driver", "==", false);
    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  uploadImage(imagePath, imageName, callback) {
    console.log("image Path ===>> ", imagePath);
    console.log("image imageName ===>> ", imageName);

    const image =
      Platform.OS === "android"
        ? imagePath.uri
        : imagePath.uri.replace("file:///", ""); //imagePath.uri;
    // const uid = firebase.auth().currentUser.uid;
    const imageRef = storage().ref(`profileImage/${imageName}.png`);
    imageRef
      .putFile(image)
      .then(() => {
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        callback({
          isSuccess: true,
          response: url,
          message: "Image uploaded successfully",
        });
        return url;
      })
      .catch((error) => {
        callback({
          isSuccess: false,
          response: null,
          message: "Image uploading failed",
        });
        console.log(error);
      });
  }

  // ---------------------------- Notification FCM Settings ----------------------------//

  checkAndUpdateFCMTokenForUser = () => {
    console.log("Notification - checkAndUpdateFCMTokenForUser ===>> ");
    let user = CommonDataManager.getInstance().getUser();
    messaging()
      .hasPermission()
      .then((isEnable) => {
        if (isEnable) {
          this.getFCMToken(user);
        } else {
          this.requestPermission(user);
        }
      })
      .catch((error) => {
        console.log(
          "Notification - checkAndUpdateFCMTokenForUser (Error) ===>> ",
          error
        );
      });
  };

  requestPermission = (user) => {
    messaging()
      .requestPermission()
      .then((response) => {
        console.log("Notification - requestPermission ===>> ", response);
        this.getFCMToken(user);
      })
      .catch((error) => {
        console.log("Notification - requestPermission (Error) ===>> ", error);
      });
  };

  getFCMToken = async (user) => {
    // messaging().registerDeviceForRemoteMessages();
    await messaging()
      .getToken()
      .then((response) => {
        console.log("Notification - getFCMToken ===>> ", response);
        this.updateFCMTokenForUser(user, response);
      })
      .catch((error) => {
        console.log("Notification - getFCMToken (Error) ===>> ", error);
      });
  };

  updateFCMTokenForUser = (user, fcmToken, callback) => {
    let firebaseRef = firestore().collection("userProfile").doc(user.uid);
    firebaseRef
      .update({ fcmToken: fcmToken })
      .then((response) => {
        callback({
          isSuccess: true,
          response: null,
          message: "FCM token updated successfully",
        });
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error });
      });
  };

  sendNotificationToFCMTokens = (tokens, title, body, type, callback) => {
    let url = "https://fcm.googleapis.com/fcm/send";
    const notificationBody = {
      priority: "HIGH",
      notification: { title: title, body: body, type: type, sound: "default" },
      data: { channelId: "e7eee0aa8551c5e" },
      registration_ids: tokens,
      icon: images.icon,
    };

    let fetchProperties = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${config.fcmServerKey}`,
      },
      body: JSON.stringify(notificationBody),
    };

    fetch(url, fetchProperties)
      .then((res) => {
        console.log("Fetch Response ====>>> ", res);
        callback(true);
      })
      .catch((error) => {
        console.log("Fetch Error ====>>> ", error);
        callback(false);
      });
  };

  sendNotificationOfNewRideToAllDrivers = (callback) => {
    this.getProfilesOfAllDrivers((response) => {
      if (response.isSuccess) {
        console.log("response  notificaton ", response);
        let arrayDrivers = response.response._docs;
        let arrayFcmTokens = [];
        let arrayUids = [];
        arrayDrivers.map((driverSnapshot, index) => {
          if (driverSnapshot._data.fcmToken.length > 0) {
            arrayFcmTokens.push(driverSnapshot._data.fcmToken);
            arrayUids.push(driverSnapshot.id);
          }
        });

        let title = "New Ride";
        let message =
          "There is a new ride near you. Would you like to pick it up?";
        this.sendNotificationToFCMTokens(
          arrayFcmTokens,
          title,
          message,
          UtilityHelper.notificationType_NewRide,
          (callback) => {
            let notificationData = {
              createdAt: firestore.Timestamp.now(),
              receiverIDs: arrayUids,
              title: title,
              message: message,
            };

            this.addNewNotification(notificationData, () => {});
          }
        );
      }
    });
  };

  // addNotificationListener = () => {
  //     this.messageForeGround();
  //     this.messageBackGround();
  //
  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //         console.log('onNotificationOpenedApp', remoteMessage)
  //
  //         // this.moveToSpecificScreen(remoteMessage.data,true)
  //     });
  //
  //     // Check whether an initial notification is available
  //     messaging().getInitialNotification()
  //         .then(remoteMessage => {
  //             // if (remoteMessage) {
  //             //     this.moveToSpecificScreen(remoteMessage.data,false)
  //             // }
  //             // alert(' notification');
  //             console.log('getInitialNotification', remoteMessage)
  //
  //         });
  // }
  //
  // messageForeGround = () => {
  //
  //     return messaging().onMessage(async (remoteMessage) => {
  //
  //         EventRegister.emit("InAppNotification", remoteMessage)
  //
  //         // alert('foreground notification');
  //         console.log("onMessage====>", remoteMessage);
  //         console.log('onMessage', remoteMessage)
  //
  //     });
  //
  // };
  //
  //
  // messageBackGround = () => {
  //     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //         // alert('background notification');
  //         console.log('setBackgroundMessageHandler', remoteMessage)
  //     });
  // };

  // ------------------------------- Ride Requests -------------------------------//

  ridesTable = "rides";

  requestNewRide = (rideData, callback) => {
    let firebaseRef = firestore().collection(this.ridesTable);

    firebaseRef
      .add(rideData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
          message: "Your ride request has been submitted successfully",
        });
      })
      .catch((error) => {
        console.log(error.message);
        callback({ isSuccess: false, response: null, message: error });
      });
  };

  updateRideWithData = (documentID, orderData, callback) => {
    let firebaseRef = firestore().collection(this.ridesTable).doc(documentID);
    firebaseRef
      .update(orderData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: null,
          message: "Order updated Successfully",
        });
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error });
      });
  };

  fetchAllRideRequests_once = (callback) => {
    let firebaseCollection = firestore().collection(this.ridesTable);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchAllUpComingRidesForUser_once = (userID, isDriver, callback) => {
    let firebaseCollection = firestore().collection(this.ridesTable);
    firebaseCollection = firebaseCollection.where(
      "status",
      "==",
      UtilityHelper.orderStatus_Requested
    );
    if (isDriver) {
      firebaseCollection = firebaseCollection.where("driverID", "==", "");
    } else {
      console.log(
        "firebase      ======>>>>",
        firebaseCollection.where("userID", "==", userID)
      );
      firebaseCollection = firebaseCollection.where("userID", "==", userID);
    }

    // firebaseCollection      = firebaseCollection.orderBy("pickupDateAndTime", "desc");

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchAllHistoryRidesForUser_once = (userID, isDriver, callback) => {
    let firebaseCollection = firestore().collection(this.ridesTable);
    firebaseCollection = firebaseCollection.where(
      "status",
      "==",
      UtilityHelper.orderStatus_Closed
    );
    if (isDriver) {
      firebaseCollection = firebaseCollection.where("driverID", "==", userID);
    } else {
      firebaseCollection = firebaseCollection.where("userID", "==", userID);
    }

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  // fetchRunningRideRequestFor = (user, isDriver, callback) =>{
  //     let firebaseCollection  = firestore().collection(this.ridesTable);
  //
  //     let date                = new Date();
  //     let stringDate          = moment(date).format('YYYY-MM-DD');
  //
  //     if (isDriver){//DRIVER
  //         firebaseCollection = firebaseCollection.where('driverID','==',user.uid);
  //         firebaseCollection = firebaseCollection.where('isRunningForDriver','==',true);
  //     }else { //RIDER (Customer)
  //         firebaseCollection = firebaseCollection.where('isRunningForRider','==',true);
  //         firebaseCollection = firebaseCollection.where('userID','==',user.uid);
  //         firebaseCollection = firebaseCollection.where('pickupDateOnly','==',stringDate);
  //
  //     }
  //
  //     let unsubscribe =  this.firebaseLiveFetch(firebaseCollection, (liveCallback)=>{
  //         callback(liveCallback);
  //     });
  //     return unsubscribe;
  // }

  // fetchWaitingForDriverRideRequest = (callback) =>{
  //     let date                = new Date();
  //     let stringDate          = moment(date).format('YYYY-MM-DD');
  //
  //     let firebaseCollection  = firestore().collection(this.ridesTable);
  //
  //     firebaseCollection = firebaseCollection.where('isRunningForDriver','==',true);
  //     firebaseCollection = firebaseCollection.where('driverID','==','');
  //     firebaseCollection = firebaseCollection.where('pickupDateOnly','==',stringDate);
  //
  //     let unsubscribe =  this.firebaseLiveFetch(firebaseCollection, (liveCallback)=>{
  //         callback(liveCallback);
  //     });
  //     return unsubscribe;
  // }

  // fetchLiveAllRidesForStatuses = (arrayStatuses, user, isDriver, callback) =>{
  //     let firebaseCollection = firestore().collection(this.ridesTable);
  //
  //     firebaseCollection = firebaseCollection.where('status','==','DroppedOff');
  //
  //
  //     if (user){
  //         if (isDriver){
  //             firebaseCollection = firebaseCollection.where('driverID','==',user.uid);
  //         }else {
  //             firebaseCollection = firebaseCollection.where('userID','==',user.uid);
  //         }
  //     }
  //
  //     console.log('Firebase Collection ====>>> ', firebaseCollection);
  //     let unsubscribe =  this.firebaseLiveFetch(firebaseCollection, (liveCallback)=>{
  //         callback(liveCallback);
  //     });
  //     return unsubscribe;
  // }

  fetchAllRidesForStatus = (status, callback) => {
    let firebaseCollection = firestore()
      .collection(this.ridesTable)
      .where("status", "==", status);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchRidesForUser = (user, status, callback) => {
    let firebaseCollection = firestore()
      .collection(this.ridesTable)
      .where("status", "==", status)
      .where("userID", "==", user.uid);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchRideForDocumentID = (documentID, callback) => {
    let firebaseCollection = firestore()
      .collection(this.ridesTable)
      .doc(documentID);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  // fetchLiveRideForDocumentID = (documentID, callback) =>{
  //     let firebaseCollection = firestore().collection(this.ridesTable).doc(documentID);
  //     let unsubscribe =  this.firebaseLiveFetch(firebaseCollection, callback);
  //     return unsubscribe;
  // }

  // ----------------------------------- NOTIFICATIONS -----------------------------------//
  notificationsTable = "notifications";

  fetchAllNotifications = (callback) => {
    let firebaseCollection = firestore().collection(this.notificationsTable);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchAllNotificationsReceivedToUser = (userID, callback) => {
    let firebaseCollection = firestore().collection(this.notificationsTable);
    firebaseCollection = firebaseCollection.where(
      "receiverIDs",
      "array-contains",
      userID
    );

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  addNewNotification = (notificationData, callback) => {
    let firebaseRef = firestore().collection(this.notificationsTable);
    firebaseRef
      .add(notificationData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: null,
          message: "Thank you for your review",
        });
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error });
      });
  };

  // ----------------------------------- COMMENTS -----------------------------------//
  commentsTable = "comments";

  fetchAllComments = (callback) => {
    let firebaseCollection = firestore().collection(this.commentsTable);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchAllCommentsReceivedToUser = (userID, callback) => {
    let firebaseCollection = firestore().collection(this.commentsTable);
    firebaseCollection = firebaseCollection.where("receiverID", "==", userID);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  getCommentSenderProfile = (userID) => {
    firestore()
      .collection("userProfile")
      .doc(userID)
      .get()
      .then((snapshot) => {
        if (snapshot._data) {
          return snapshot._data;
        } else {
          return null;
        }
      })
      .catch((error) => {
        return null;
      });
  };

  addNewCustomerComment = (commentData, callback) => {
    let firebaseRef = firestore().collection(this.commentsTable);
    firebaseRef
      .add(commentData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: null,
          message: "Thank you for your review",
        });
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error });
      });
  };

  //----------------------------------- Chat -----------------------------------//
  chatMessages = "chatMessages";

  sendChatMessage = (messageData, callback) => {
    let firebaseRef = firestore().collection(this.chatMessages);
    firebaseRef
      .add(messageData)
      .then((response) => {
        callback({ isSuccess: true, response: null, message: "Message sent" });
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error });
      });
  };

  // fetchLiveChatMessages = (riderID, driverID, callback) => {
  //
  //     let firebaseCollection  = firestore().collection(this.chatMessages);
  //
  //     firebaseCollection = firebaseCollection.where('participants','==',riderID+'/'+driverID);
  //     // firebaseCollection = firebaseCollection.orderBy('createdAt',"DESC");
  //     // firebaseCollection = firebaseCollection.limit(100);
  //
  //     let unsubscribe =  this.firebaseLiveFetch(firebaseCollection, (liveCallback)=>{
  //         callback(liveCallback);
  //     });
  //     return unsubscribe;
  // }

  fetchUserInfo(uid) {
    console.log("UID ===>>>", uid);
    return firestore()
      .collection("userProfile")
      .doc(uid)
      .get()
      .then((snapshot) => {
        return snapshot.data();
      })
      .catch((error) => {
        return error;
      });
  }

  addToUserCart(userCart, uid) {
    let userCarts = [];
    firestore()
      .collection("userProfile")
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.data().userCartList !== undefined) {
          userCarts = snapshot.data().userCartList;
          let arr = [...userCarts, ...userCart];
          return firestore().collection("userProfile").doc(uid).update({
            userCartList: arr,
          });
        } else {
          // User Create his cart list first time

          return firestore().collection("userProfile").doc(uid).update({
            userCartList: userCart,
          });
        }
      });
  }

  setImageNameToUserFirestore = (imageName) => {
    return firestore()
      .collection("userProfile")
      .doc(auth().currentUser.uid)
      .update({
        profileImage: `${imageName}.png`,
      });
  };

  makeOrder(amount, userCartList, uid) {
    return firestore().collection("orderQueue").add({
      userUID: uid,
      total_amount: amount,
      status: "Requested",
      cart_list: userCartList,
    });
  }

  clearUserCart(uid) {
    return firestore().collection("userProfile").doc(uid).update({
      userCartList: "",
    });
  }

  addOrderReference(referenceId, uid) {
    let array = [];
    let orderArray = [];
    array.push({
      order_id: referenceId,
      // stripe_resp: stripeResponse.data,
    });
    firestore()
      .collection("userProfile")
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.data().orders !== undefined) {
          orderArray = [...snapshot.data().orders, ...array];
          return firestore()
            .collection("userProfile")
            .doc(uid)
            .set({ orders: orderArray }, { merge: true });
        } else {
          return firestore()
            .collection("userProfile")
            .doc(uid)
            .set({ orders: [{ order_id: referenceId }] }, { merge: true });
        }
      });
  }

  fetchRequestedOrdersId(uid) {
    return firestore()
      .collection("userProfile")
      .doc(uid)
      .get()
      .then((snapshot) => {
        return snapshot.data();
      })
      .catch((error) => {
        return error;
      });
  }

  fetchRequestedOrders(orderId) {
    return firestore()
      .collection("orderQueue")
      .doc(orderId)
      .get()
      .then((snapshot) => {
        return snapshot.data();
      })
      .catch((error) => {
        return error;
      });
  }

  fetchOrderDelivery() {
    return firestore()
      .collection("OrderDelivery")
      .get()
      .then((response) => {
        return response;
      });
  }

  orderDeliveryCart(orderId) {
    return firestore()
      .collection("orderQueue")
      .doc(orderId.trim())
      .get()
      .then((snapshot) => {
        return snapshot.data();
      })
      .catch((error) => {
        return error;
      });
  }

  getOrderHistory() {
    return firestore()
      .collection("orderHistory")
      .get()
      .then((snapshot) => {
        return snapshot;
      })
      .catch((error) => {
        return error;
      });
  }

  commentHandler = (comments) => {
    return firestore().collection("comments").doc(auth().currentUser.uid).set({
      comment: comments,
    });
  };

  addComments = (review, rating, date) => {
    let Comments = [];
    let data;
    return firestore()
      .collection("comments")
      .get()
      .then((response) => {
        response.forEach((response) => {
          console.log("response===>", response.data());
          data = response.data();
          console.log("data reso--->", data);
        });
        console.log("data--->", data);
        if (data !== undefined) {
          Comments = data.comment;
          let arr = [...Comments, review];
          return firestore().collection("comments").doc().update({
            comment: arr,
            rating: rating,
            date: date,
          });
        } else {
          return firestore().collection("comments").doc().set({
            comment: review,
            rating: rating,
            date: date,
          });
        }
      });
  };
  getComment = () => {
    return firestore()
      .collection("comments")
      .doc()
      .get()
      .then((resp) => {
        return resp;
      });
  };

  // Helping Methods
  firebaseFetch(collection, callback) {
    collection
      .get()
      .then((snapshot) => {
        callback({
          isSuccess: true,
          response: snapshot,
          message: "Data collected successfully",
        });
      })
      .catch((error) => {
        console.log("Fetch Error ====>>> ", error.message);
        callback({ isSuccess: false, response: null, message: error });
      });
  }

  // firebaseLiveFetch(collection, callback){
  //     let unsubscribe = collection.onSnapshot((snapshot)=>{
  //         if (snapshot){
  //             callback({isSuccess: true, response: snapshot, reference:unsubscribe, message: "Live Data fetched successfully"});
  //         }else {
  //             callback({isSuccess:false, response: snapshot, reference:unsubscribe, message: 'Live Data Not found'});
  //         }
  //     });
  //
  //     return unsubscribe;
  // }

  // ---------------------------- HASSAN WRITTEN FUNCTIONS ---------------------------- //

  // ---------------------------- Get User Record ---------------------------- //

  getUserProfile = async (userId, callback) => {
    await firestore()
      .collection("UserRecord")
      .doc(userId)
      .get()
      .then((resp) => {
        callback(resp);
      });
  };

  // ---------------------------- Get Categories ---------------------------- //

  getCategories = async (callback) => {
    await firestore()
      .collection("Categories")
      .get()
      .then((resp) => {
        callback(resp);
      });
  };

  // ---------------------------- Get Category Id ---------------------------- //

  getCatId = async (name, callback) => {
    await firestore()
      .collection("Categories")
      .where("name", "==", name)
      .get()
      .then((resp) => {
        callback(resp);
      });
  };

  // ---------------------------- Get Sub-Categories ---------------------------- //

  getSubCategory = async (id, callback) => {
    await firestore()
      .collection("subCategories")
      .where("catId", "==", id)
      .get()
      .then((resp) => {
        callback(resp);
      });
  };

  // ---------------------------- Get Sub-Categories Id ---------------------------- //

  getSubCategoryId = async (value, callback) => {
    await firestore()
      .collection("subCategories")
      .where("name", "==", value)
      .get()
      .then((resp) => {
        callback(resp);
      });
  };

  // ---------------------------- Add Service ---------------------------- //

  addService = async (
    time,
    date,
    location,
    title,
    description,
    tagWords,
    catId,
    subCatId,
    price,
    userId,
    url,
    status,
    paymentId,
    createdAt,
    catName,
    subCatName,
    latitude,
    longitude,
    bidding,
    callback
  ) => {
    await firestore()
      .collection("Services")
      .add({
        time: time,
        date: date,
        location: location,
        title: title,
        description: description,
        tagWords: tagWords,
        catId: catId,
        subCatId: subCatId,
        price: price,
        userId: userId,
        imageUrl: url,
        status: status,
        paymentId: paymentId,
        createdAt: createdAt,
        catName: catName,
        subCatName: subCatName,
        latitude: latitude,
        longitude: longitude,
        bidding: bidding,
        isDecline: false,
      })
      .then((response) => {
        callback(response);
      });
  };

  // ---------------------------- Get Specific Jobs ---------------------------- //

  getMyJobs = async (userId, callback) => {
    await firestore()
      .collection("Services")
      .where("userId", "==", userId)
      .onSnapshot((response) => {
        callback(response);
      });
    // .get()
    // .then((response) => {
    //     callback(response);
    // })
  };

  // ---------------------------- Get Category Name ---------------------------- //

  getCatName = async (catId, callback) => {
    await firestore()
      .collection("Categories")
      .doc(catId)
      .get()
      .then((response) => {
        callback(response);
      });
  };

  // ---------------------------- Get Sub-Category Name ---------------------------- //

  getSubCatName = async (subCatId, callback) => {
    await firestore()
      .collection("subCategories")
      .doc(subCatId)
      .get()
      .then((response) => {
        callback(response);
      });
  };

  // ---------------------------- Cancel Service ---------------------------- //

  cancelService = async (id, status) => {
    await firestore().collection("Services").doc(id).update({
      status: status,
    });
  };

  // ---------------------------- Get All Jobs Except Current User Jobs ---------------------------- //

  getAllJobsExceptMyJobs = async (userId, callback) => {
    await firestore()
      .collection("Services")
      .where("userId", "!=", userId)
      .onSnapshot((response) => {
        callback(response);
      });
    // .get()
    // .then((response) => {
    //     callback(response);
    // })
  };

  // ---------------------------- Accept A Service ---------------------------- //

  acceptServiceForMultipleUsers = async (id, object) => {
    await firestore().collection("Services").doc(id).update({
      bidding: object,
    });
  };

  acceptService = async (id, object, status) => {
    await firestore().collection("Services").doc(id).update({
      status: status,
      bidding: object,
    });
  };

  // ---------------------------- Send Notification ---------------------------- //

  onSendNotifications = (tokens, title, body, callback) => {
    let url = "https://fcm.googleapis.com/fcm/send";
    console.log("body", body, tokens, title);
    let notificationBody = {
      to: tokens,
      notification: {
        priority: "high",
        title: title,
        body: body,
        content_available: true,
        OrganizationId: "2",
        subtitle: "New Message Received",
      },
      data: {
        priority: "high",
        sound: "default",
        contentAvailable: true,
        bodyText: "New Message",
      },
    };
    let fetchProperties = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "key=" + config.fcmServerKey,
      },
      body: JSON.stringify(notificationBody),
    };
    fetch(url, fetchProperties)
      .then((res) => {
        console.log("Fetch Response ====>>> ", res);
        callback(true);
      })
      .catch((error) => {
        console.log("Fetch Error ====>>> ", error);
        callback(false);
      });
  };

  // ---------------------------- Fetch Live Messages ---------------------------- //

  fetchLiveChatMessages = (userId, otherID, callback) => {
    console.log("id", userId + "/" + otherID);
    let firebaseCollection = firestore().collection("ChatMessages");
    firebaseCollection = firebaseCollection.where(
      "participants",
      "==",
      userId + "/" + otherID
    );
    let unsubscribe = this.firebaseLiveFetch(
      firebaseCollection,
      (liveCallback) => {
        callback(liveCallback);
      }
    );
    return unsubscribe;
  };
  firebaseLiveFetch(collection, callback) {
    let unsubscribe = collection.onSnapshot((snapshot) => {
      if (snapshot) {
        callback({
          isSuccess: true,
          response: snapshot,
          reference: unsubscribe,
          message: "Live Data fetched successfully",
        });
      } else {
        callback({
          isSuccess: false,
          response: snapshot,
          reference: unsubscribe,
          message: "Live Data Not found",
        });
      }
    });
    return unsubscribe;
  }

  // ---------------------------- Send Message ---------------------------- //

  onSendMessage = async (messageData, callback) => {
    await firestore()
      .collection("ChatMessages")
      .add(messageData)
      .then((resp) => {
        callback(resp);
      });
  };

  // ---------------------------- Update User Profile ---------------------------- //

  updateProfileForUser = async (userId, profileData, callback) => {
    await firestore()
      .collection("UserRecord")
      .doc(userId)
      .update(profileData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
          message: "Profile Thread Updated successfully",
        });
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error });
      });
  };

  // ---------------------------- Fetch Specific User Chat Messages ---------------------------- //

  fetchChatMessageOfOneId = (userId, otherID, callback) => {
    let value = 0;
    let query1 = firestore()
      .collection("ChatMessages")
      .where("participants", "==", userId + "/" + otherID);
    query1.onSnapshot((resp) => {
      if (resp._docs.length > 0) {
        value = 1;
      }
    });

    let query2 = firestore()
      .collection("ChatMessages")
      .where("participants", "==", otherID + "/" + userId);

    query2.onSnapshot((res) => {
      if (res._docs.length > 0) {
        value = 2;
      }
    });

    setTimeout(() => {
      if (value === 1) {
        callback(1);
      } else if (value === 2) {
        callback(2);
      } else if (value === 0) {
        callback(3);
      }
    }, 1000);
  };

  // ---------------------------- Get Chat Messages ---------------------------- //

  fetchChat = async (callback) => {
    await firestore()
      .collection("ChatMessages")
      .get()
      .then((resp) => {
        callback(resp);
      });
  };

  // ---------------------------- Update Chat Messages Avatar ---------------------------- //

  updateAvatar = async (id, user) => {
    await firestore().collection("ChatMessages").doc(id).update({
      user: user,
    });
  };

  // ---------------------------- Get Fcm Token ---------------------------- //

  fcmToken = async (callback) => {
    await messaging()
      .getToken()
      .then((resp) => {
        callback(resp);
      });
  };

  // ---------------------------- Update Fcm Token ---------------------------- //

  updateProfileForFcmToken = async (userId, fcmToken) => {
    await firestore()
      .collection("UserRecord")
      .doc(userId)
      .update({ fcmToken: fcmToken });
  };

  // ---------------------------- ForGround/Background Notifications ---------------------------- //

  addNotificationListener = () => {
    this.messageForeGround();
    this.messageBackGround();

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("onNotificationOpenedApp", remoteMessage.notification);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log("getInitialNotification", remoteMessage);
      });
  };

  messageForeGround = () => {
    return messaging().onMessage(async (remoteMessage) => {
      EventRegister.emit("InAppNotification", remoteMessage);

      console.log("onMessageForGround====>", remoteMessage);
    });
  };

  messageBackGround = () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("setBackgroundMessageHandler", remoteMessage);
    });
  };

  // ---------------------------- Create Notifications ---------------------------- //

  createNotification = async (data) => {
    await firestore().collection("notifications").add(data);
  };

  // ---------------------------- Update User Profile ---------------------------- //

  updateUserProfile = async (userId, name, userName, introduction, url) => {
    await firestore().collection("UserRecord").doc(userId).update({
      name: name,
      userName: userName,
      introduction: introduction,
      imageUrl: url,
    });
  };

  // ---------------------------- Update Service Provider Profile ---------------------------- //

  updateProviderProfile = async (
    certificates,
    showCase,
    userId,
    name,
    userName,
    introduction,
    url,
    profileTitle,
    skills,
    qualification,
    serviceOffered
  ) => {
    await firestore().collection("UserRecord").doc(userId).update({
      licenseCertificates: certificates,
      shoeCaseWork: showCase,
      name: name,
      userName: userName,
      introduction: introduction,
      imageUrl: url,
      profileTitle: profileTitle,
      skills: skills,
      qualification: qualification,
      serviceOffered: serviceOffered,
      serviceProvidedDocId: "Done",
      isApproved: false,
    });
  };

  // ---------------------------- Update Bidding ---------------------------- //

  updateBidding = async (id, value) => {
    await firestore().collection("Services").doc(id).update({ bidding: value });
  };

  // ---------------------------- Update Bidding on Decline ---------------------------- //

  updateBiddingOnDecline = async (id, value) => {
    await firestore().collection("Services").doc(id).update({
      bidding: value,
      isDecline: true,
      status: "Waiting for Service Provider",
    });
  };

  // ---------------------------- Get Specific Service Document ---------------------------- //

  getServiceDocument = async (id, callback) => {
    await firestore()
      .collection("Services")
      .doc(id)
      .get()
      .then((response) => {
        callback(response);
      });
  };

  // ---------------------------- Add Review For Service Provider ---------------------------- //

  addReviewForServiceProvider = async (
    id,
    review,
    rating,
    ProviderId,
    ClientId
  ) => {
    await firestore().collection("ServiceProviderReviews").add({
      ServiceDocumentId: id,
      review: review,
      rating: rating,
      ServiceProviderId: ProviderId,
      CustomerId: ClientId,
    });
  };

  // ---------------------------- Add Review For Customer ---------------------------- //

  addReviewForCustomer = async (id, review, rating, ProviderId, ClientId) => {
    await firestore().collection("CustomerReviews").add({
      ServiceDocumentId: id,
      review: review,
      rating: rating,
      CustomerId: ProviderId,
      ServiceProviderId: ClientId,
    });
  };

  // ---------------------------- Get Notifications ---------------------------- //

  getNotifications = async (userId, callback) => {
    await firestore()
      .collection("notifications")
      .where("receiverId", "==", userId)
      .get()
      .then((response) => {
        callback(response);
      });
  };

  // ---------------------------- Update Service Document ---------------------------- //

  updateService = async (Id, charge) => {
    await firestore().collection("Services").doc(Id).update({
      paymentId: charge,
    });
  };

  // ---------------------------- Get User Completed Services ---------------------------- //

  completeServices = async (callback) => {
    await firestore()
      .collection("Services")
      .get()
      .then((response) => {
        callback(response);
      });
  };

  // ---------------------------- Get User Reviews ---------------------------- //

  getUserReviews = async (Id, callback) => {
    await firestore()
      .collection("ServiceProviderReviews")
      .where("CustomerId", "==", Id)
      .get()
      .then((response) => {
        callback(response);
      });
  };

  // ---------------------------- Get Service Provider Reviews ---------------------------- //

  getServiceProviderReviews = async (Id, callback) => {
    await firestore()
      .collection("CustomerReviews")
      .where("ServiceProviderId", "==", Id)
      .get()
      .then((response) => {
        callback(response);
      });
  };

  // ---------------------------- Update Document Average Reviews ---------------------------- //

  updateAverageRating = async (id, rating) => {
    await firestore().collection("UserRecord").doc(id).update({
      rating: rating,
    });
  };

  getAllServiceProvidersProfile = async (callback) => {
    await firestore()
      .collection("UserRecord")
      .where("serviceProvidedDocId", "==", "Done")
      .get()
      .then((response) => {
        callback(response);
      });
  };

  userReport = async (id, otherPersonId, report, callback) => {
    await firestore()
      .collection("Reports")
      .add({
        userIdWhoReport: id,
        userIdThatReported: otherPersonId,
        message: report,
        createdAt: new Date(),
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  };
}

const apiService = new firebaseServices();

export default apiService;
