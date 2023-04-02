//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Text, Image, FlatList, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import {AirbnbRating} from 'react-native-ratings';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import ReviewComponent from '../../../Components/ReviewComponent/ReviewComponent';
import styles from './style';
import AppLoading from '../../../Components/AppLoading';
import FirebaseHelper from '../../../firebase/FirebaseHelper';


export default class BidDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: this.props.route.params.id,
            price: this.props.route.params.price,
            image:'',
            name:'',
            rating:'',
            bidding:this.props.route.params.bidding,
            newArray:[],
            docId:this.props.route.params.docId,
            profileTitle:'',
            serviceOffered:'',
            complete:null,
            cancel:null,
            items: [],
            fcmToken:'',
            avgProductRating:null,
        }
    }

    componentDidMount() {
        this.focusListner = this.props.navigation.addListener('focus', () => {
           this.getUserProfile();
           this.getUserJobsCompleted();
           this.getUserReviews();
        });
    }


    componentWillUnmount() {
        this.focusListner();
    }


    getUserProfile = () => {
        this.setState({loading:true})
        FirebaseHelper.getUserProfile(this.state.Id,(response) => {
            if (response === undefined) {
                this.setState({
                    loading: false,
                });
            }else {
                this.setState({
                    name:response._data.name,
                    image:response._data.imageUrl,
                    rating:response._data.rating,
                    profileTitle: response._data.profileTitle,
                    fcmToken: response._data.fcmToken,
                    serviceOffered: response._data.serviceOffered,
                })
            }
        })
    }


    getUserJobsCompleted = () => {
        let completed = 0;
        let cancelled = 0;
        FirebaseHelper.completeServices((response) => {
            if ((response === undefined) || (response._docs.length < 1)) {
                this.setState({
                    loading: false,
                });
            }else {
                response.forEach((resp) => {
                    if(resp._data.bidding.length > 0) {
                        resp._data.bidding.map((bid) => {
                            if(bid.userId === this.state.Id){
                                if(resp._data.status === 'Cancelled'){
                                    cancelled = cancelled + 1;
                                }else if(resp._data.status === 'Job Completed'){
                                    completed = completed + 1;
                                }
                            }
                        })
                    }
                })
                this.setState({
                    complete: completed,
                    cancel: cancelled,
                })
            }
        })
    }


    getUserReviews = () => {
        let tempArray = [];
        FirebaseHelper.getServiceProviderReviews(this.state.Id,(response) => {
            if ((response === undefined) || (response._docs.length < 1)) {
                this.setState({
                    loading: false,
                });
            }else {
                response.forEach((resp) => {
                    tempArray.push({
                        id: resp.id,
                        text: resp._data.review,
                        rate: resp._data.rating,
                        image: images.icn_full_star,
                    })
                })
                this.setState({
                    items:tempArray,
                    loading:false
                })
            }
        })
    }


    _renderItem = (item) => {
        return (
            <ReviewComponent
                text={item.text}
                image={item.image}
                rate={item.rate}
                onPress={() => console.log('Pressed')}
            />
        );
    };


    onAccept = () => {
        Alert.alert(
            "Accept Applicant",
            "Are you sure you want to Accept?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => this.acceptApplicant() }
            ]
        );
    }


    acceptApplicant = () => {
        this.setState({loading:true})
        let tempArray=[];
        let { docId,bidding,Id } = this.state;
            bidding.map((bid) => {
                if(bid.userId === Id){
                tempArray.push({
                    name:bid.name,
                    bid:bid.bid,
                    image:bid.image,
                    userId: bid.userId,
                    status:"Accepted"
                })
                }else{
                    tempArray.push(bid)
                }
            })
            this.setState({newArray:tempArray,loading:false},() => {
                FirebaseHelper.onSendNotifications(
                    this.state.fcmToken,
                    "Job Accepted",
                    `${this.props.route.params.item.userName} Accepted the Job`,
                    () => {
                        let object = {
                            createdAt: new Date(),
                            message: `${this.props.route.params.item.userName} Accepted the Job`,
                            title: 'Message Received',
                            receiverId: this.state.Id,
                            // receiverId: this.props.route.params.item.otherPersonUserId,
                        };
                        FirebaseHelper.createNotification(object).then(() => {
                            FirebaseHelper.updateBidding(docId, this.state.newArray).then(() => {
                                alert("Accepted")
                                this.props.navigation.navigate('JobOrder')
                            })

                        })
                    })
            })

    }


    onPressDecline = () => {
        Alert.alert(
            "Decline Applicant",
            "Are you sure you want to decline?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => this.declineApplicant() }
            ]
        );

    }


    declineApplicant = () => {
        this.setState({loading:true})
        let { docId } = this.state;
        if(this.props.route.params.item.isDecline === false){
            this.setState({newArray:[],loading:false},() => {
                FirebaseHelper.updateBiddingOnDecline(docId,this.state.newArray).then(() => {
                    alert("Declined")
                    this.props.navigation.navigate('JobOrder')
                })
            })
        }else if(this.props.route.params.item.isDecline === true){
            this.setState({loading:false},() => {
                alert('You can only decline applicants once per job')
                this.props.navigation.navigate('JobOrder')
            })
        }
    }


    render() {
        return(
            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}
                <AppHeader
                    onLeftIconPress={() => this.props.navigation.goBack()}
                    title={'Job Accepted'}
                    leftIconPath={images.ic_back}
                />

                <View style={styles.upperView}>

                    <View>
                        <Text style={styles.titleUpperView}>Jobs Completed</Text>
                        <Text style={styles.numberTextUpperView}>{this.state.complete}</Text>
                    </View>

                    <View>
                        <Image style={styles.imgUpperView}
                               source={{uri: this.state.image}}
                        />
                    </View>

                    <View>
                        <Text style={styles.titleUpperView}>Jobs Canceled</Text>
                        <Text style={styles.numberTextUpperView}>{this.state.cancel}</Text>
                    </View>
                </View>

                <View style={styles.bottomView}>
                    <Text style={styles.numberTextUpperView}>{this.state.name}</Text>
                    <Text style={{fontWeight: 'bold'}}>{this.state.profileTitle}</Text>
                    <Text style={{fontSize:hp(2),paddingTop:'3%'}}>{this.state.serviceOffered}</Text>
                    <View style={styles.starView}>
                        <AirbnbRating
                            count={5}
                            style={{alignItems:'center'}}
                            reviewSize={0}
                            defaultRating={this.state.rating}
                            size={25}
                            isDisabled={true}
                            showRating={false}
                        />
                    </View>

                    {this.props.route.params.show && this.state.items && <View style={styles.viewFlat}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            data={this.state.items}
                            renderItem={({item}) => this._renderItem(item)}
                        />

                    </View>}

                    {this.props.route.params.show &&<Text style={styles.textBottomHeading}>${this.state.price}.00</Text>}

                    {this.props.route.params.show &&<Text style={styles.textDetailBottom}>
                        Note: You can only decline applicants once per job
                        </Text>}


                    {this.props.route.params.show && <Button
                        height={hp(5)}
                        width={wp(90)}
                        buttonText={'Accept Applicant'}
                        bgColor={colors.app_color}
                        onPress={() => this.onAccept()}
                    />}

                    {this.props.route.params.show &&<Button
                        height={hp(5)}
                        width={wp(90)}
                        buttonText={'Decline Applicant'}
                        marginTop={10}
                        bgColor={colors.dark_grey}
                        onPress={() => this.onPressDecline()}
                        />}
                </View>
            </View>

        );
    }
}


