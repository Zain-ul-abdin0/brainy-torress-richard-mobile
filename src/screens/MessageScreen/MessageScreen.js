//================================ React Native Imported Files ======================================//

import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { now } from "moment";
import { GiftedChat } from "react-native-gifted-chat";

//================================ Local Imported Files ======================================//

import AppHeader from "../../Components/AppHeader";
import FirebaseHelper from "../../firebase/FirebaseHelper";
import AppLoading from "../../Components/AppLoading";
import images from "../../../assets/images";
import styles from "./style";
import auth from "@react-native-firebase/auth";

class MessageScreen extends React.Component {
  focusListner;
  constructor(props) {
    super(props);

    this.state = {
      userId: auth().currentUser.uid,
      userName: "",
      userProfileImage: "",
      thread: [],
      userFcmToken: "",

      otherPersonId: this.props.route.params.id,
      otherPersonName: null,
      otherPersonProfileImage: null,
      otherPersonThreads: [],
      otherPersonFcmToken: "",

      messages1: {},
      messages: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserData();
    this.fetchOtherPersonData();
    this.focusListner = this.props.navigation.addListener("focus", () => {
      this.fetchChatMessages();
    });
  }

  componentWillUnmount() {
    this.focusListner();
  }

  getUserData = () => {
    this.setState({ loading: true });
    FirebaseHelper.getUserProfile(this.state.userId, (resp) => {
      if (resp.length === 0) {
        alert("No Data Found");
      } else {
        this.setState({
          userName: resp._data.name,
          userProfileImage: resp._data.imageUrl,
          thread: resp._data.chatThreads,
          userFcmToken: resp._data.fcmToken,
          loading: false,
        });
      }
    });
  };

  fetchOtherPersonData = () => {
    this.setState({ loading: true });
    FirebaseHelper.getUserProfile(this.state.otherPersonId, (resp) => {
      if (resp.length === 0) {
        alert("No Data Found");
      } else {
        this.setState({
          otherPersonName: resp._data.name,
          otherPersonProfileImage: resp._data.imageUrl,
          otherPersonThreads: resp._data.chatThreads,
          otherPersonFcmToken: resp._data.fcmToken,
          loading: false,
        });
      }
    });
  };

  onSendMessage = (messages = []) => {
    if (messages.length > 0 && messages[0].text.length > 0) {
      let participants = this.state.userId + "/" + this.state.otherPersonId;
      let otherId = this.state.otherPersonId + "/" + this.state.userId;
      let sender = null;
      let receiver = null;

      sender = this.getUserObjectForThread(
        this.state.userId,
        this.state.userName,
        this.state.userProfileImage
      );
      receiver = this.getUserObjectForThread(
        this.state.otherPersonId,
        this.state.otherPersonName,
        this.state.otherPersonProfileImage
      );

      this.setState((previousState) => {
        const sentMessages = [{ ...messages[0] }];
        return {
          messages: GiftedChat.append(previousState.messages, sentMessages),
        };
      });

      let sentMessage = messages[0];
      let message;
      FirebaseHelper.fetchChatMessageOfOneId(
        this.state.userId,
        this.state.otherPersonId,
        (resp) => {
          if (resp) {
            if (resp === 1) {
              message = {
                _id: now(),
                participants: participants,
                text: sentMessage.text,
                createdAt: sentMessage.createdAt,
                user: sentMessage.user,
              };

              let currentThread = {
                id: participants,
                sender: sender,
                receiver: receiver,
                lastMessage: message,
              };

              FirebaseHelper.onSendMessage(message, (resp) => {
                if (resp) {
                  FirebaseHelper.onSendNotifications(
                    this.state.otherPersonFcmToken,
                    this.state.userName,
                    sentMessage.text,
                    () => {
                      let object = {
                        createdAt: new Date(),
                        message: `${this.state.userName} just send you a message`,
                        title: "Message Received",
                        receiverId: this.state.otherPersonId,
                      };
                      FirebaseHelper.createNotification(object).then(() => {
                        //---------------------------- Update Chat Thread for Current User ----------------------------//

                        let checkValue = 0;
                        let span = participants.split("/");
                        let checkId = this.state.thread;
                        if (checkId.length !== 0) {
                          checkId.map((map, index) => {
                            let split = map.id.split("/");
                            if (
                              (span[0] === split[0] && span[1] === split[1]) ||
                              (span[0] === split[1] && span[1] === split[0])
                            ) {
                              checkValue = 1;
                              checkId[index].lastMessage =
                                currentThread.lastMessage;
                              FirebaseHelper.updateProfileForUser(
                                this.state.userId,
                                { chatThreads: checkId },
                                (profileResponse) => {}
                              );
                            }
                          });
                        } else {
                          console.log("Map Thread 1 is empty");
                          checkValue = 0;
                        }

                        //-------------------------- Update Chat Thread for Current User if No value is Updated -------------------------//

                        if (checkValue === 1) {
                          console.log("Updated 1");
                        } else if (checkValue === 0) {
                          checkId.push(currentThread);
                          FirebaseHelper.updateProfileForUser(
                            this.state.userId,
                            { chatThreads: checkId },
                            (profileResponse) => {}
                          );
                        }

                        //---------------------------- Update Chat Thread for Other User ----------------------------//

                        let checkValue2 = 0;
                        let span1 = participants.split("/");
                        let checkId2 = this.state.otherPersonThreads;
                        if (checkId2.length !== 0) {
                          checkId2.map((map, index) => {
                            let split1 = map.id.split("/");
                            if (
                              (span1[0] === split1[0] &&
                                span1[1] === split1[1]) ||
                              (span1[0] === split1[1] && span1[1] === split1[0])
                            ) {
                              checkValue2 = 1;
                              checkId2[index].lastMessage =
                                currentThread.lastMessage;
                              FirebaseHelper.updateProfileForUser(
                                this.state.otherPersonId,
                                { chatThreads: checkId2 },
                                (profileResponse) => {}
                              );
                            } else {
                              console.log("Not Found2");
                            }
                          });
                        } else {
                          console.log("Map Thread 2 is empty");
                          checkValue2 = 0;
                        }

                        //-------------------------- Update Chat Thread for Other User if No value is Updated -------------------------//

                        if (checkValue2 === 1) {
                          console.log("Updated 2");
                        } else if (checkValue2 === 0) {
                          checkId2.push(currentThread);
                          FirebaseHelper.updateProfileForUser(
                            this.state.otherPersonId,
                            { chatThreads: checkId2 },
                            (profileResponse) => {}
                          );
                        }
                      });
                    }
                  );
                }
              });
            } else if (resp === 2) {
              message = {
                _id: now(),
                participants: otherId,
                text: sentMessage.text,
                createdAt: sentMessage.createdAt,
                user: sentMessage.user,
              };
              let currentThread = {
                id: participants,
                sender: sender,
                receiver: receiver,
                lastMessage: message,
              };

              FirebaseHelper.onSendMessage(message, (resp) => {
                if (resp) {
                  FirebaseHelper.onSendNotifications(
                    this.state.otherPersonFcmToken,
                    this.state.userName,
                    sentMessage.text,
                    () => {
                      let object = {
                        createdAt: new Date(),
                        message: `${this.state.userName} just send you a message`,
                        title: "Message Received",
                        receiverId: this.state.otherPersonId,
                      };
                      FirebaseHelper.createNotification(object).then(() => {
                        //---------------------------- Update Chat Thread for Current User ----------------------------//

                        let checkValue = 0;
                        let span = participants.split("/");
                        let checkId = this.state.thread;
                        if (checkId.length !== 0) {
                          checkId.map((map, index) => {
                            let split = map.id.split("/");
                            if (
                              (span[0] === split[0] && span[1] === split[1]) ||
                              (span[0] === split[1] && span[1] === split[0])
                            ) {
                              checkValue = 1;
                              checkId[index].lastMessage =
                                currentThread.lastMessage;
                              FirebaseHelper.updateProfileForUser(
                                this.state.userId,
                                { chatThreads: checkId },
                                (profileResponse) => {}
                              );
                            }
                          });
                        } else {
                          console.log("Map Thread 1 is empty");
                          checkValue = 0;
                        }

                        //-------------------------- Update Chat Thread for Current User if No value is Updated -------------------------//

                        if (checkValue === 1) {
                          console.log("Updated 1");
                        } else if (checkValue === 0) {
                          checkId.push(currentThread);
                          FirebaseHelper.updateProfileForUser(
                            this.state.userId,
                            { chatThreads: checkId },
                            (profileResponse) => {}
                          );
                        }

                        //---------------------------- Update Chat Thread for Other User ----------------------------//

                        let checkValue2 = 0;
                        let span1 = participants.split("/");
                        let checkId2 = this.state.otherPersonThreads;
                        if (checkId2.length !== 0) {
                          checkId2.map((map, index) => {
                            let split1 = map.id.split("/");
                            if (
                              (span1[0] === split1[0] &&
                                span1[1] === split1[1]) ||
                              (span1[0] === split1[1] && span1[1] === split1[0])
                            ) {
                              checkValue2 = 1;
                              checkId2[index].lastMessage =
                                currentThread.lastMessage;
                              FirebaseHelper.updateProfileForUser(
                                this.state.otherPersonId,
                                { chatThreads: checkId2 },
                                (profileResponse) => {}
                              );
                            } else {
                              console.log("Not Found2");
                            }
                          });
                        } else {
                          console.log("Map Thread 2 is empty");
                          checkValue2 = 0;
                        }

                        //-------------------------- Update Chat Thread for Other User if No value is Updated -------------------------//

                        if (checkValue2 === 1) {
                          console.log("Updated 2");
                        } else if (checkValue2 === 0) {
                          checkId2.push(currentThread);
                          FirebaseHelper.updateProfileForUser(
                            this.state.otherPersonId,
                            { chatThreads: checkId2 },
                            (profileResponse) => {}
                          );
                        }
                      });
                    }
                  );
                }
              });
            } else if (resp === 3) {
              message = {
                _id: now(),
                participants: participants,
                text: sentMessage.text,
                createdAt: sentMessage.createdAt,
                user: sentMessage.user,
              };
              let currentThread = {
                id: participants,
                sender: sender,
                receiver: receiver,
                lastMessage: message,
              };

              FirebaseHelper.onSendMessage(message, (resp) => {
                if (resp) {
                  FirebaseHelper.onSendNotifications(
                    this.state.otherPersonFcmToken,
                    this.state.userName,
                    sentMessage.text,
                    () => {
                      let object = {
                        createdAt: new Date(),
                        message: `${this.state.userName} just send you a message`,
                        title: "Message Received",
                        receiverId: this.state.otherPersonId,
                      };
                      FirebaseHelper.createNotification(object).then(() => {
                        //---------------------------- Update Chat Thread for Current User ----------------------------//

                        let checkValue = 0;
                        let span = participants.split("/");
                        let checkId = this.state.thread;
                        if (checkId.length !== 0) {
                          checkId.map((map, index) => {
                            let split = map.id.split("/");
                            if (
                              (span[0] === split[0] && span[1] === split[1]) ||
                              (span[0] === split[1] && span[1] === split[0])
                            ) {
                              checkValue = 1;
                              checkId[index].lastMessage =
                                currentThread.lastMessage;
                              FirebaseHelper.updateProfileForUser(
                                this.state.userId,
                                { chatThreads: checkId },
                                (profileResponse) => {}
                              );
                            }
                          });
                        } else {
                          console.log("Map Thread 1 is empty");
                          checkValue = 0;
                        }

                        //-------------------------- Update Chat Thread for Current User if No value is Updated -------------------------//

                        if (checkValue === 1) {
                          console.log("Updated 1");
                        } else if (checkValue === 0) {
                          checkId.push(currentThread);
                          FirebaseHelper.updateProfileForUser(
                            this.state.userId,
                            { chatThreads: checkId },
                            (profileResponse) => {}
                          );
                        }

                        //---------------------------- Update Chat Thread for Other User ----------------------------//

                        let checkValue2 = 0;
                        let span1 = participants.split("/");
                        let checkId2 = this.state.otherPersonThreads;
                        if (checkId2.length !== 0) {
                          checkId2.map((map, index) => {
                            let split1 = map.id.split("/");
                            if (
                              (span1[0] === split1[0] &&
                                span1[1] === split1[1]) ||
                              (span1[0] === split1[1] && span1[1] === split1[0])
                            ) {
                              checkValue2 = 1;
                              checkId2[index].lastMessage =
                                currentThread.lastMessage;
                              FirebaseHelper.updateProfileForUser(
                                this.state.otherPersonId,
                                { chatThreads: checkId2 },
                                (profileResponse) => {}
                              );
                            } else {
                              console.log("Not Found2");
                            }
                          });
                        } else {
                          console.log("Map Thread 2 is empty");
                          checkValue2 = 0;
                        }

                        //-------------------------- Update Chat Thread for Other User if No value is Updated -------------------------//

                        if (checkValue2 === 1) {
                          console.log("Updated 2");
                        } else if (checkValue2 === 0) {
                          checkId2.push(currentThread);
                          FirebaseHelper.updateProfileForUser(
                            this.state.otherPersonId,
                            { chatThreads: checkId2 },
                            (profileResponse) => {}
                          );
                        }
                      });
                    }
                  );
                }
              });
            }
          }
        }
      );
    } else {
      this.setState({ loading: false });
      alert("Empty");
    }
  };

  getUserObjectForThread = (id, name, image) => {
    return {
      _id: id,
      name: name,
      profileImage: image,
    };
  };

  fetchChatMessages = () => {
    this.setState({ loading: true });
    FirebaseHelper.fetchChatMessageOfOneId(
      this.state.userId,
      this.state.otherPersonId,
      (resp) => {
        if (resp) {
          if (resp === 1) {
            this.liveMessages = FirebaseHelper.fetchLiveChatMessages(
              this.state.userId,
              this.state.otherPersonId,
              (callback) => {
                if (callback.isSuccess) {
                  let rawMessages = callback.response._docs;
                  let messages = [];
                  rawMessages.map((message) => {
                    message._data.createdAt = new Date(
                      message._data.createdAt.seconds * 1000
                    );
                    messages.push(message._data);
                  });
                  messages = messages.sort((a, b) => b.createdAt - a.createdAt);
                  this.setState({ messages: messages, loading: false });
                } else {
                  this.setState({ loading: false });
                  console.log("No Chat Found");
                }
              }
            );
          } else if (resp === 2) {
            this.liveMessages = FirebaseHelper.fetchLiveChatMessages(
              // this.liveMessages = FirebaseHelper.fetchChatMessages(
              this.state.otherPersonId,
              this.state.userId,
              (callback) => {
                if (callback.isSuccess) {
                  let rawMessages = callback.response._docs;
                  console.log("Raw Messages", rawMessages);
                  let messages = [];
                  rawMessages.map((message) => {
                    message._data.createdAt = new Date(
                      message._data.createdAt.seconds * 1000
                    );
                    messages.push(message._data);
                  });
                  messages = messages.sort((a, b) => b.createdAt - a.createdAt);
                  this.setState({ messages: messages, loading: false });
                } else {
                  this.setState({ loading: false });
                  console.log("No Chat Found");
                }
              }
            );
          }
        } else {
          this.setState({ loading: false });
          console.log("No Response");
        }
      }
    );
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.mainContainer}>
          {AppLoading.renderLoading(this.state.loading)}

          {/* //================================ Header ======================================// */}

          <AppHeader
            title={this.state.otherPersonName}
            leftIconPath={images.ic_back}
            rightIconOnePath={images.remove_user}
            onRightIconPress={() =>
              this.props.navigation.navigate(
                "UserBan",
                this.state.otherPersonId
              )
            }
            onLeftIconPress={() => this.props.navigation.goBack()}
          />

          <View style={styles.container}>
            {/* //================================ Gifted Chat View ======================================// */}

            <GiftedChat
              messages={this.state.messages}
              onSend={(messages) => this.onSendMessage(messages)}
              user={{
                _id: this.state.userId,
                name: this.state.userName,
                avatar: this.state.userProfileImage,
              }}
              alwaysShowSend={false}
              showUserAvatar={true}
              showAvatarForEveryMessage={true}
              renderUsernameOnMessage={true}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default MessageScreen;
