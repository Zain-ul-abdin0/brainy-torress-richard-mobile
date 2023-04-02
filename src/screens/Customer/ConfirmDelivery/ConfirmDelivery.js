//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Text, Image, Keyboard, TouchableWithoutFeedback, Alert, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {AirbnbRating} from "react-native-ratings";
import auth from '@react-native-firebase/auth';

//================================ Local Imported Files ======================================//

import images from '../../../../assets/images';
import styles from './style';
import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import colors from '../../../../assets/colors';
import AppInput from '../../../Components/AppInput';
import AppLoading from '../../../Components/AppLoading';
import FirebaseHelper from '../../../firebase/FirebaseHelper';



export default class ConfirmDelivery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            id: this.props.route.params.id,
            service:this.props.route.params.service,

            loading:false,
            rating:1,
            review:'',

            userRating:'',
            name:'',
            image:'',
            serviceProviderId:'',
            ClientId:'',

            totalReviews:0,
        }
    }

    componentDidMount() {
        if(this.state.service === true) {
           this.getUserInfo();
           // this.getUserReview();
        }else if(this.state.service === false){
            this.getUserInformation();
            // this.getServiceReview();
        }
    }


    getUserInfo = () => {
            this.setState({loading:true})
            let { id } = this.state;
            FirebaseHelper.getServiceDocument(id,(response) => {
                if (response === undefined) {
                    this.setState({
                        loading: false,
                    });
                } else {
                    response._data.bidding.map((bid) => {
                    FirebaseHelper.getUserProfile(response._data.userId, (resp) => {
                        this.setState({
                            serviceProviderId:bid.userId,
                            ClientId:response._data.userId,
                            image: resp._data.imageUrl,
                            name: resp._data.name,
                            userRating: resp._data.rating,
                        },() => this.getUserReview())
                    })
                })
                }

            })
        }


    getUserReview = () => {
        let { ClientId } = this.state;
        FirebaseHelper.getUserReviews(ClientId,(response) => {
            if ((response === undefined) || (response._docs.length < 1)) {
                this.setState({
                    loading: false,
                });
            }else {
              this.setState({
                  totalReviews: response._docs.length,
                  loading:false,
              })
            }
        })
    }


    getUserAverageReview = () => {
        const { ClientId } = this.state;
        let avgRating = [];

        FirebaseHelper.getUserReviews(ClientId,(resp) => {
            if ((resp === undefined) || (resp._docs.length < 1)) {
                this.setState({
                    loading: false,
                });
            } else {
                resp.forEach((response) => {
                    let data = response._data.rating;
                    avgRating.push(data);
                });

                const sum = avgRating.reduce((a, b) => a + b, 0);
                const avg = (sum / avgRating.length) || 0;
                const round = Math.round(avg)
                console.log(`The sum is: ${sum}. The average is: ${avg}.  The Round is: ${round}`);

                this.setState({
                    loading:false,
                },() => {
                    if(round === 0)
                    {
                        FirebaseHelper.updateAverageRating(ClientId, 1);
                    }else if(round > 0){
                        FirebaseHelper.updateAverageRating(ClientId, round);
                    }
                })
            }
        });
    };


    getUserInformation = () => {
        this.setState({loading:true})
        let { id } = this.state;
        FirebaseHelper.getServiceDocument(id,(response) => {
            if (response === undefined) {
                this.setState({
                    loading: false,
                });
            }else {
                response._data.bidding.map((bid) => {
                    FirebaseHelper.getUserProfile(bid.userId,(resp) => {
                        this.setState({
                            serviceProviderId:resp.id,
                            ClientId: resp._data.userId,
                            image: resp._data.imageUrl,
                            name:  resp._data.name,
                            userRating: resp._data.rating,
                        },() => this.getServiceReview())
                    })
                })

            }

        })
    }


    getServiceReview = () => {
        let { serviceProviderId } = this.state;
        FirebaseHelper.getServiceProviderReviews(serviceProviderId,(resp) => {
            if ((resp === undefined) || (resp._docs.length < 1)) {
                this.setState({
                    loading: false,
                });
            } else {
                this.setState({totalReviews: resp._docs.length,loading:false})
            }
        })
    }


    getServiceProviderReview = () => {
        const { serviceProviderId } = this.state;
        let avgRating = [];

        FirebaseHelper.getServiceProviderReviews(serviceProviderId,(resp) => {
            if ((resp === undefined) || (resp._docs.length < 1)) {
                this.setState({
                    loading: false,
                });
            } else {
                resp.forEach((response) => {
                    let data = response._data.rating;
                    avgRating.push(data);
                });

                const sum = avgRating.reduce((a, b) => a + b, 0);
                const avg = (sum / avgRating.length) || 0;
                const round = Math.round(avg)
                console.log(`The sum is: ${sum}. The average is: ${avg}.  The Round is: ${round}`);

                this.setState({
                    loading:false,
                },() => {
                    if(round === 0)
                    {
                        FirebaseHelper.updateAverageRating(serviceProviderId, 1);
                    }else if(round > 0){
                        FirebaseHelper.updateAverageRating(serviceProviderId, round);
                    }
                })
            }
        });
    };


    onReview = () => {
        let { service } = this.state;
           if(service === true){
               this.providerToClientReview();
           }else if(service === false){
               this.clientToProviderReview();
           }
    }


    providerToClientReview = () => {
        this.setState({loading:true})
        let { id,serviceProviderId,review,rating,ClientId } = this.state;
        FirebaseHelper.onSendNotifications(
            this.props.route.params.item.userFcmToken,
            "Review",
            `Review has been added`,
            () => {
                let object = {
                    createdAt: new Date(),
                    message: `Review has been added`,
                    title: 'Review',
                    receiverId: serviceProviderId,
                };
                FirebaseHelper.createNotification(object).then(() => {
                    FirebaseHelper.addReviewForServiceProvider(id, review, rating, serviceProviderId, ClientId).then(() => {
                        this.setState({loading: false},() => this.getUserAverageReview(),
                            Alert.alert(
                                "Review",
                                "Review Added",
                                [
                                    { text: "Okay", onPress: () =>  this.props.navigation.navigate('HomeScreen') }
                                ]
                            ),
                        )
                    })
                })
            })
    };


    clientToProviderReview = () => {
        this.setState({loading:true})
        let { id,serviceProviderId,review,rating,userId } = this.state;
        FirebaseHelper.onSendNotifications(
            this.props.route.params.item.otherPersonFcmToken,
            "Review",
            // `${this.props.route.params.item.userName} added review`,
            `Review has been added`,
            () => {
                let object = {
                    createdAt: new Date(),
                    message: `Review has been added`,
                    title: 'Review',
                    receiverId: this.props.route.params.item.otherPersonUserId,
                };
                FirebaseHelper.createNotification(object).then(() => {
                    FirebaseHelper.addReviewForCustomer(id, review, rating, userId, serviceProviderId).then(() => {
                        this.setState({loading: false},() => this.getServiceProviderReview(),
                            Alert.alert(
                                "Review",
                                "Review Added",
                                [
                                    { text: "Okay", onPress: () => this.props.navigation.navigate('JobOrder') }
                                ]
                            ),
                        )
                    })
                })
            })
    }


    render() {
        return(
            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}
                <AppHeader
                    title={'Confirm Job'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />

                <View style={styles.upperView}>

                    <View>
                        <Image style={styles.imgUpperView}
                               source={{uri: this.state.image}}
                        />
                    </View>


                </View>
                <TouchableWithoutFeedback
                    style={styles.mainContainer}
                    onPress={() => Keyboard.dismiss()}>
                <View style={styles.bottomView}>

                    <Text style={styles.numberTextUpperView}>{this.state.name}</Text>

                    <Text style={styles.textDetail}>
                        Please leave a rating to let us know about your experience in this service.
                    </Text>

                    <View style={styles.starView}>
                        <AirbnbRating
                            count={5}
                            style={{alignItems:'center'}}
                            reviewSize={0}
                            defaultRating={this.state.userRating}
                            size={24}
                            isDisabled={true}
                            showRating={false}
                        />
                        <Text style={{fontSize:hp(1.8),paddingLeft:'2%'}}>{this.state.totalReviews} Reviews</Text>
                    </View>

                    <View style={styles.line}/>

                    <View style={styles.starViewBottom}>
                        <AirbnbRating
                            count={5}
                            style={{alignItems:'center'}}
                            reviewSize={0}
                            defaultRating={this.state.rating}
                            size={24}
                            isDisabled={false}
                            showRating={false}
                            onFinishRating={(rating) => this.setState({rating})}
                        />
                    </View>

                    {/*<View style={styles.bottomViewText}>*/}
                        <AppInput
                            height={150}
                            multiline={true}
                            textAlignVertical={'top'}
                            placeholder={'Leave a text feedback here'}
                            borderWidth={1}
                            marginTop={20}
                            onChangeText={(review) => this.setState({review})}
                            value={this.state.value}
                        />
                    {/*</View>*/}

                    <View style={styles.btnView}>
                        <Button
                            height={hp(5)}
                            width={wp(90)}
                            buttonText={'Submit Review'}
                            bgColor={colors.app_color}
                            onPress={() =>  this.onReview()}
                        />
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </View>

        );
    }
}






