//================================ React Native Imported Files ======================================//

import React from 'react';
import { View, ScrollView,FlatList,RefreshControl } from 'react-native';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

//================================ Local Imported Files ======================================//

import styles from './style';
import AppHeader from '../../../Components/AppHeader';
import images from '../../../../assets/images';
import GardenToolComponent from '../../../Components/GardenToolComponent/GardenToolComponent';
import TabComponent from '../../../Components/TabComponent';
import AppLoading from '../../../Components/AppLoading';
import FirebaseHelper from '../../../firebase/FirebaseHelper';


export default class JobOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            leftComponent:true,
            middleComponent:false,
            rightComponent:false,
            loading:false,
            refreshing:false,
            items: [],

            data:[],
            onGoing:[],
            completed:[],
        }
    }

    componentDidMount() {
        this.focusListner = this.props.navigation.addListener('focus', () => {
            this.onGoingJobs();
            this.completedJobs();
            this.getMyJobs();
        });
    }



    componentWillUnmount() {
        this.focusListner();
    }


    onGoingJobs = () => {

        this.setState({loading:true,refreshing:false,onGoing:[]});
        let { userId } = this.state;

        FirebaseHelper.getMyJobs(userId,(response) => {
            if (response === undefined || response._docs.length === 0) {
                this.setState({loading: false});
            }
            else {
                let tempArray1 = [];
                this.setState({onGoing:[]},() => {
                    response.forEach((respon) => {
                        if (respon._data.paymentId !== '') {
                            FirebaseHelper.getUserProfile(respon._data.userId, (user) => {
                                if ((respon._data.bidding.length > 0) && (respon._data.status === 'Waiting Job Confirmation')) {
                                    respon._data.bidding.map((bid) => {
                                        if(bid.status === 'Waiting Job Confirmation'){
                                            FirebaseHelper.getUserProfile(bid.userId, (otherUser) => {
                                                tempArray1.push({
                                                    id: respon.id,
                                                    time: respon._data.time,
                                                    createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                                    location: respon._data.location,
                                                    title: respon._data.title,
                                                    description: respon._data.description,
                                                    tagWords: respon._data.tagWords,
                                                    catId: respon._data.catId,
                                                    subCatId: respon._data.subCatId,
                                                    price: respon._data.price,
                                                    isDecline: respon._data.isDecline,
                                                    userId: respon._data.userId,
                                                    imageUrl: respon._data.imageUrl,
                                                    status: respon._data.status,
                                                    paymentId: respon._data.paymentId,
                                                    date: respon._data.date,
                                                    catName: respon._data.catName,
                                                    subCatName: respon._data.subCatName,
                                                    userName: user._data.name,
                                                    otherPersonUserId: bid.userId,
                                                    bidding: respon._data.bidding,
                                                    otherPersonBid: bid.bid,
                                                    otherPersonName: otherUser._data.name,
                                                    otherPersonImage: otherUser._data.imageUrl,

                                                    textView: false,
                                                    onlyStatus: false,
                                                    imageView: true,
                                                    imageMessage: true,

                                                    fromPickup: true,
                                                    fromOpenBidding: false,
                                                    fromJobCompleted: false,
                                                    fromConfirmPending: false
                                                })
                                                this.setState({
                                                    onGoing:tempArray1
                                                })
                                                // this.UpdateOnGoingItemsList(tempArray1)
                                            })
                                        }
                                    })

                                }
                                // else if ((respon._data.bidding.length === 0) && (respon._data.status === 'Waiting for Service Provider')) {
                                //         tempArray1.push({
                                //         id: respon.id,
                                //         time: respon._data.time,
                                //         createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                //         location: respon._data.location,
                                //         title: respon._data.title,
                                //         description: respon._data.description,
                                //         tagWords: respon._data.tagWords,
                                //         catId: respon._data.catId,
                                //         subCatId: respon._data.subCatId,
                                //         price: respon._data.price,
                                //         userId: respon._data.userId,
                                //         imageUrl: respon._data.imageUrl,
                                //         status: respon._data.status,
                                //         paymentId: respon._data.paymentId,
                                //         date: respon._data.date,
                                //         catName: respon._data.catName,
                                //         subCatName: respon._data.subCatName,
                                //         userName: user._data.name,
                                //         bidding: respon._data.bidding,
                                //
                                //         textView: false,
                                //         onlyStatus: true,
                                //         imageView: false,
                                //         imageMessage: false,
                                //
                                //         fromOpenBidding: true,
                                //         fromConfirmPending: false,
                                //         fromPickup: false,
                                //         fromJobCompleted: false
                                //     })
                                //     this.setState({
                                //         onGoing:tempArray1
                                //     })
                                //     this.UpdateOnGoingItemsList(tempArray1)
                                // }
                                else if ((respon._data.bidding.length > 0) && (respon._data.status === 'Job Confirmation Pending')) {
                                    respon._data.bidding.map((bid) => {
                                        if (bid.status === 'Job Confirmation Pending') {
                                            FirebaseHelper.getUserProfile(bid.userId, (otherUser) => {
                                                tempArray1.push({
                                                    id: respon.id,
                                                    time: respon._data.time,
                                                    createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                                    location: respon._data.location,
                                                    title: respon._data.title,
                                                    description: respon._data.description,
                                                    tagWords: respon._data.tagWords,
                                                    catId: respon._data.catId,
                                                    subCatId: respon._data.subCatId,
                                                    price: respon._data.price,
                                                    isDecline: respon._data.isDecline,
                                                    userId: respon._data.userId,
                                                    imageUrl: respon._data.imageUrl,
                                                    status: respon._data.status,
                                                    paymentId: respon._data.paymentId,
                                                    date: respon._data.date,
                                                    catName: respon._data.catName,
                                                    subCatName: respon._data.subCatName,
                                                    userName: user._data.name,
                                                    otherPersonUserId: bid.userId,
                                                    bidding: respon._data.bidding,
                                                    otherPersonBid: bid.bid,
                                                    otherPersonName: otherUser._data.name,
                                                    otherPersonImage: otherUser._data.imageUrl,

                                                    textView: false,
                                                    onlyStatus: false,
                                                    imageView: true,
                                                    imageMessage: true,

                                                    fromConfirmPending: true,
                                                    fromPickup: false,
                                                    fromJobCompleted: false,
                                                    fromOpenBidding: false,
                                                    cancelled: false,
                                                })
                                                this.setState({
                                                    onGoing:tempArray1
                                                })
                                                // this.UpdateOnGoingItemsList(tempArray1)
                                            })
                                        }
                                    })

                                }
                                // else if((respon._data.status === 'Job Completed')  || (respon._data.status === 'Payout Done')) {
                                //     FirebaseHelper.getUserProfile(respon._data.bidding[0].userId,(otherUser) => {
                                //         tempArray1.push({
                                //             id: respon.id,
                                //             time: respon._data.time,
                                //             createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                //             location: respon._data.location,
                                //             title: respon._data.title,
                                //             description: respon._data.description,
                                //             tagWords: respon._data.tagWords,
                                //             catId: respon._data.catId,
                                //             subCatId: respon._data.subCatId,
                                //             otherPersonUserId: respon._data.bidding[0].userId,
                                //             otherPersonBid: respon._data.bidding[0].bid,
                                //             price: respon._data.price,
                                //             userId: respon._data.userId,
                                //             imageUrl: respon._data.imageUrl,
                                //             status: 'Job Completed',
                                //             paymentId: respon._data.paymentId,
                                //             date: respon._data.date,
                                //             catName: respon._data.catName,
                                //             subCatName: respon._data.subCatName,
                                //             userName: user._data.name,
                                //             bidding: respon._data.bidding,
                                //             otherPersonName: otherUser._data.name,
                                //             otherPersonImage: otherUser._data.imageUrl,
                                //             textView: false,
                                //             onlyStatus: false,
                                //             imageView: true,
                                //             imageMessage:false,
                                //
                                //             fromJobCompleted: true,
                                //             fromConfirmPending: false,
                                //             fromPickup: false,
                                //             fromOpenBidding: false,
                                //             cancelled: true,
                                //         })
                                //     });
                                // }
                            })
                        }
                        else {
                            this.setState({loading:false})
                        }
                    });
                });
            }
        })
    }


    completedJobs = () => {
        this.setState({loading:true,refreshing:false,completed:[]});
        let { userId } = this.state;

        FirebaseHelper.getMyJobs(userId,(response) => {
            if (response === undefined || response._docs.length === 0) {
                this.setState({loading: false});
            }else {
                let tempArray2 = [];
                this.setState({completed:[]},() => {
                    response.forEach((respon) => {
                        if (respon._data.paymentId !== '') {
                            FirebaseHelper.getUserProfile(respon._data.userId, (user) => {
                                if (respon._data.status === 'Job Completed') {
                                    respon._data.bidding.map((bid) => {
                                        if (bid.status === 'Job Completed') {
                                            FirebaseHelper.getUserProfile(bid.userId, (otherUser) => {
                                                tempArray2.push({
                                                    id: respon.id,
                                                    time: respon._data.time,
                                                    createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                                    location: respon._data.location,
                                                    title: respon._data.title,
                                                    description: respon._data.description,
                                                    tagWords: respon._data.tagWords,
                                                    catId: respon._data.catId,
                                                    subCatId: respon._data.subCatId,
                                                    otherPersonUserId: bid.userId,
                                                    otherPersonBid: bid.bid,
                                                    price: respon._data.price,
                                                    isDecline: respon._data.isDecline,
                                                    userId: respon._data.userId,
                                                    imageUrl: respon._data.imageUrl,
                                                    status: 'Job Completed',
                                                    paymentId: respon._data.paymentId,
                                                    date: respon._data.date,
                                                    catName: respon._data.catName,
                                                    subCatName: respon._data.subCatName,
                                                    userName: user._data.name,
                                                    bidding: respon._data.bidding,
                                                    otherPersonName: otherUser._data.name,
                                                    otherPersonImage: otherUser._data.imageUrl,

                                                    textView: false,
                                                    onlyStatus: false,
                                                    imageView: true,
                                                    imageMessage: false,

                                                    fromJobCompleted: true,
                                                    fromConfirmPending: false,
                                                    fromPickup: false,
                                                    fromOpenBidding: false,
                                                    cancelled: true,
                                                })
                                                this.setState({completed:tempArray2})
                                            });
                                        }
                                    })

                                }
                            })
                        }
                    });
                })
            }
        })
    }


    UpdateCompletedItemsList = (biddingItemsArray) => {
        let {completed} = this.state;
        let tempItems = [...completed]
        biddingItemsArray && biddingItemsArray.length > 0 && biddingItemsArray.map((item) => {
            let index = tempItems.findIndex((res) => res.id === item.id);
            if(index >= 0){
                tempItems[index] = item;
            }
            else {
                tempItems.push(item)
            }
        });
        this.setState({completed : tempItems})

    }


    UpdateOnGoingItemsList = (biddingItemsArray) => {
        let {onGoing} = this.state;
        let tempItems = [...onGoing]
        biddingItemsArray && biddingItemsArray.length > 0 && biddingItemsArray.map((item) => {
            let index = tempItems.findIndex((res) => res.id === item.id);
            if(index >= 0){
                tempItems[index] = item;
            }
            else {
                tempItems.push(item)
            }
        });
        this.setState({onGoing : tempItems})

    }


    UpdateBiddingItemsList = (biddingItemsArray) => {

        let {items} = this.state;
        let tempItems = [...items]
        biddingItemsArray && biddingItemsArray.length > 0 && biddingItemsArray.map((item) => {
            let index = tempItems.findIndex((res) => res.id === item.id);
            if(index >= 0){
                tempItems[index] = item;
            }
            else {
                tempItems.push(item)
            }
        });

        this.setState({items : tempItems,loading:false})
    }


    getMyJobs = () => {
        this.setState({loading:true,refreshing:false,items:[]});

        let { userId } = this.state;
        FirebaseHelper.getMyJobs(userId,(response) => {
            if (response === undefined || response._docs.length === 0) {
                this.setState({
                    loading: false,
                });
            }
            else {
                let tempArray = [];
                this.setState({items:[]},() => {
                    response.forEach((respon) => {
                        if (respon._data.paymentId !== '') {
                            FirebaseHelper.getUserProfile(respon._data.userId, (user) => {
                             if ((respon._data.bidding.length === 0) && (respon._data.status === 'Waiting for Service Provider')) {
                                    tempArray.push({
                                        id: respon.id,
                                        time: respon._data.time,
                                        createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                        location: respon._data.location,
                                        title: respon._data.title,
                                        description: respon._data.description,
                                        tagWords: respon._data.tagWords,
                                        catId: respon._data.catId,
                                        subCatId: respon._data.subCatId,
                                        price: respon._data.price,
                                        isDecline: respon._data.isDecline,
                                        userId: respon._data.userId,
                                        imageUrl: respon._data.imageUrl,
                                        status: respon._data.status,
                                        paymentId: respon._data.paymentId,
                                        date: respon._data.date,
                                        catName: respon._data.catName,
                                        subCatName: respon._data.subCatName,
                                        userName: user._data.name,
                                        bidding: respon._data.bidding,

                                        textView: false,
                                        onlyStatus: true,
                                        imageView: false,
                                        imageMessage: false,

                                        fromOpenBidding: true,
                                        fromConfirmPending: false,
                                        fromPickup: false,
                                        fromJobCompleted: false
                                    })
                                    this.UpdateBiddingItemsList(tempArray);
                                } else if ((respon._data.bidding.length > 0) && (respon._data.status === 'Waiting Job Confirmation')) {
                                    FirebaseHelper.getUserProfile(respon._data.bidding[0].userId, (otherUser) => {
                                        tempArray.push({
                                            id: respon.id,
                                            time: respon._data.time,
                                            createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                            location: respon._data.location,
                                            title: respon._data.title,
                                            description: respon._data.description,
                                            tagWords: respon._data.tagWords,
                                            catId: respon._data.catId,
                                            subCatId: respon._data.subCatId,
                                            price: respon._data.price,
                                            userId: respon._data.userId,
                                            isDecline: respon._data.isDecline,
                                            imageUrl: respon._data.imageUrl,
                                            status: respon._data.status,
                                            paymentId: respon._data.paymentId,
                                            date: respon._data.date,
                                            catName: respon._data.catName,
                                            subCatName: respon._data.subCatName,
                                            userName: user._data.name,
                                            userFcmToken: user._data.fcmToken,
                                            otherPersonUserId: respon._data.bidding[0].userId,
                                            bidding: respon._data.bidding,
                                            otherPersonBid: respon._data.bidding[0].bid,
                                            otherPersonName: otherUser._data.name,
                                            otherPersonImage: otherUser._data.imageUrl,
                                            otherPersonFcmToken: otherUser._data.fcmToken,

                                            textView: false,
                                            onlyStatus: false,
                                            imageView: true,
                                            imageMessage: true,

                                            fromPickup: true,
                                            fromOpenBidding: false,
                                            fromJobCompleted: false,
                                            fromConfirmPending: false
                                        })
                                        this.UpdateBiddingItemsList(tempArray);
                                    })

                                }
                                    // else if(respon._data.status === 'Cancelled'){
                                    //     tempArray.push({
                                    //         id: respon.id,
                                    //         time: respon._data.time,
                                    //         createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                    //         location: respon._data.location,
                                    //         title: respon._data.title,
                                    //         description: respon._data.description,
                                    //         tagWords: respon._data.tagWords,
                                    //         catId: respon._data.catId,
                                    //         subCatId: respon._data.subCatId,
                                    //         price: respon._data.price,
                                    //         userId: respon._data.userId,
                                    //         imageUrl: respon._data.imageUrl,
                                    //         status: 'Cancelled',
                                    //         paymentId: respon._data.paymentId,
                                    //         date: respon._data.date,
                                    //         catName:respon._data.catName,
                                    //         subCatName:respon._data.subCatName,
                                    //         userName:user._data.name,
                                    //         bidding: respon._data.bidding,
                                    //
                                    //         textView:false,
                                    //         onlyStatus:true,
                                    //         imageView:false,
                                    //         imageMessage:false,
                                    //
                                    //         fromOpenBidding: false,
                                    //         fromConfirmPending: false,
                                    //         fromPickup:false,
                                    //         fromJobCompleted:false,
                                    //         cancelled:true,
                                    //     })
                                // }
                                else if ((respon._data.bidding.length > 0) && (respon._data.status === 'Job Confirmation Pending')) {
                                    respon._data.bidding.map((bid) => {
                                        if (bid.status === 'Job Confirmation Pending') {
                                            FirebaseHelper.getUserProfile(bid.userId, (otherUser) => {
                                                tempArray.push({
                                                    id: respon.id,
                                                    time: respon._data.time,
                                                    createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                                    location: respon._data.location,
                                                    title: respon._data.title,
                                                    description: respon._data.description,
                                                    tagWords: respon._data.tagWords,
                                                    catId: respon._data.catId,
                                                    subCatId: respon._data.subCatId,
                                                    price: respon._data.price,
                                                    isDecline: respon._data.isDecline,
                                                    userId: respon._data.userId,
                                                    imageUrl: respon._data.imageUrl,
                                                    status: respon._data.status,
                                                    paymentId: respon._data.paymentId,
                                                    date: respon._data.date,
                                                    catName: respon._data.catName,
                                                    subCatName: respon._data.subCatName,
                                                    userName: user._data.name,
                                                    userFcmToken: user._data.fcmToken,
                                                    otherPersonUserId: bid.userId,
                                                    bidding: respon._data.bidding,
                                                    otherPersonBid: bid.bid,
                                                    otherPersonName: otherUser._data.name,
                                                    otherPersonImage: otherUser._data.imageUrl,
                                                    otherPersonFcmToken: otherUser._data.fcmToken,

                                                    textView: false,
                                                    onlyStatus: false,
                                                    imageView: true,
                                                    imageMessage: true,

                                                    fromConfirmPending: true,
                                                    fromPickup: false,
                                                    fromJobCompleted: false,
                                                    fromOpenBidding: false,
                                                    cancelled: false,
                                                })
                                                this.UpdateBiddingItemsList(tempArray);
                                            })
                                        }
                                    })

                                } else if(respon._data.status === 'Job Completed') {
                                    respon._data.bidding.map((bid) => {
                                        if (bid.status === 'Job Completed') {
                                            FirebaseHelper.getUserProfile(bid.userId, (otherUser) => {
                                                tempArray.push({
                                                    id: respon.id,
                                                    time: respon._data.time,
                                                    createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                                    location: respon._data.location,
                                                    title: respon._data.title,
                                                    description: respon._data.description,
                                                    tagWords: respon._data.tagWords,
                                                    catId: respon._data.catId,
                                                    isDecline: respon._data.isDecline,
                                                    subCatId: respon._data.subCatId,
                                                    otherPersonUserId: bid.userId,
                                                    otherPersonBid: bid.bid,
                                                    price: respon._data.price,
                                                    userId: respon._data.userId,
                                                    imageUrl: respon._data.imageUrl,
                                                    status: 'Job Completed',
                                                    paymentId: respon._data.paymentId,
                                                    date: respon._data.date,
                                                    catName: respon._data.catName,
                                                    subCatName: respon._data.subCatName,
                                                    userName: user._data.name,
                                                    userFcmToken: user._data.fcmToken,
                                                    bidding: respon._data.bidding,
                                                    otherPersonName: otherUser._data.name,
                                                    otherPersonImage: otherUser._data.imageUrl,
                                                    otherPersonFcmToken: otherUser._data.fcmToken,

                                                    textView: false,
                                                    onlyStatus: false,
                                                    imageView: true,
                                                    imageMessage: false,

                                                    fromJobCompleted: true,
                                                    fromConfirmPending: false,
                                                    fromPickup: false,
                                                    fromOpenBidding: false,
                                                    cancelled: true,
                                                })
                                                this.UpdateBiddingItemsList(tempArray);
                                            });
                                        }
                                    })
                                }
                            })
                        } else {
                            this.setState({loading:false})
                        }
                    });
                })
            }
        })
    }


    onRefresh = () => {
        this.componentDidMount();
    }


    _renderItem = (item) => {
        let path;
        if(item.id===0) {
            path = {fromOpenBidding: true,fromConfirmPending: false,fromPickup:false,fromJobCompleted:false};
        }
        else if(item.id===1) {
            path = {fromPickup: true,fromOpenBidding: false,fromJobCompleted: false,fromConfirmPending:false};
        }
        else if(item.id===2) {
            path = {fromConfirmPending: true,fromPickup: false,fromJobCompleted:false,fromOpenBidding:false};
        }
        else if(item.id===3) {
            path = {fromJobCompleted: true,fromConfirmPending: false,fromPickup:false,fromOpenBidding:false};
        }
         return  ( <GardenToolComponent
                time={item.time}
                date={item.date}
                textBid={item.textBid}
                textPrice={item.price}
                msgImage={item.msgImage}
                price={item.price}
                createdAt={item.createdAt}
                type={item.type}
                status={item.status}
                onlyStatus={item.onlyStatus}
                name={item.title}
                otherPersonImage={item.otherPersonImage}
                image={item.image}
                imageMessage={item.imageMessage}
                imageView={item.imageView}
                textView={item.textView}
                onPressImg={() => this.props.navigation.navigate('messageScreen',{
                    id: item.otherPersonUserId,
                })}
                onPress={() => this.props.navigation.navigate("UserServiceDetail", {item})}
            />
        );
    };


    render() {
        const nav = this.props.navigation;
        return (
            <View style={styles.viewStyle}>
                {AppLoading.renderLoading(this.state.loading)}
                <AppHeader
                    title={'My Jobs'}
                    leftIconPath={images.ic_menu}
                    onLeftIconPress={() => nav.openDrawer()}
                    rightIconOnePath={images.plus}
                    onRightIconPress={()=>this.props.navigation.navigate("RequestService")}
                />

                <TabComponent
                        leftText={'All'}
                        middleText={'Ongoing'}
                        rightText={'Completed'}
                        onLeftPress={() =>   this.setState({leftComponent:true,middleComponent:false,rightComponent:false,})}
                        onMiddlePress={() => this.setState({middleComponent:true,leftComponent:false,rightComponent:false,})}
                        onRightPress={() =>  this.setState({rightComponent:true,leftComponent:false, middleComponent:false})}

                    />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainContainer}>
                        {this.state.leftComponent &&
                        <View style={styles.viewFlat}>

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item.id}
                                data={this.state.items}
                                renderItem={({item}) => this._renderItem(item)}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh}
                                    />
                                }
                            />
                        </View>}
                        {this.state.middleComponent &&
                        <View style={styles.viewFlat}>

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item.id}
                                data={this.state.onGoing}
                                renderItem={({item}) => this._renderItem(item)}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh}
                                    />
                                }
                            />
                        </View>}
                        { this.state.rightComponent &&
                        <View style={styles.viewFlat}>

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item.id}
                                data={this.state.completed}
                                renderItem={({item}) => this._renderItem(item)}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh}
                                    />
                                }
                            />
                        </View> }
                    </View>
                </ScrollView>

            </View>

        );
    }
}

