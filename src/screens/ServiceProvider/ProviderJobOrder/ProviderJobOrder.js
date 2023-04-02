//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

//================================ local Imported Files ======================================//

import DriverGardenToolComponent from '../../../Components/DriverGardenToolComponent/DriverGardenToolComponent';
import AppHeader from '../../../Components/AppHeader';
import Dropdown from '../../../Components/ModalDropdown';
import images from '../../../../assets/images';
import TabComponent from '../../../Components/TabComponent';
import styles from './style';
import FirebaseHelper from '../../../firebase/FirebaseHelper';
import AppLoading from '../../../Components/AppLoading';


export default class ProviderJobOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            leftComponent:true,
            middleComponent:false,
            rightComponent:false,
            loading:false,
            categories:[],
            value:true,

            items: [],
            onGoing:[],
            completed:[],

        }
    }

    componentDidMount() {
        if(this.props.route.params.markerValue === true){
            this.focusListner = this.props.navigation.addListener('focus', () => {
                this.onGoingJobs();
                this.completedJobs();
                this.getAllFilterJobs();
                this.getCategories();
            });
        }else if(this.props.route.params.markerValue === false) {
            this.focusListner = this.props.navigation.addListener('focus', () => {
                this.onGoingJobs();
                this.completedJobs();
                this.getAllJobsExceptMyJobs();
                this.getCategories();
            });
        }
    }


    componentWillUnmount() {
        this.focusListner();
    }


    getCategories = () => {
            this.setState({loading:true})
            FirebaseHelper.getCategories((resp) => {
                if (resp === undefined || resp._docs.length === 0) {
                    this.setState({
                        loading: false,
                    });
                } else {
                    let tempArray = [];
                    resp.forEach((response) => {
                        tempArray.push(response._data.name)
                    })
                    this.setState({
                        categories:tempArray,
                        loading:false
                    })
                }
            })
        }


    onGoingJobs = () => {
        this.setState({loading:true,onGoing:[]});
        let { userId } = this.state;

        FirebaseHelper.getAllJobsExceptMyJobs(userId,(response) => {
            if (response === undefined || response._docs.length === 0) {
                this.setState({
                    loading: false,
                });
            }else {
                let tempArray1 = [];
                this.setState({onGoing:[]} ,() => {

                    response.forEach((respon) => {
                        if (respon._data.paymentId !== '') {
                            FirebaseHelper.getUserProfile(respon._data.userId, (user) => {
                                // if (respon._data.status === 'Waiting for Service Provider') {
                                //     tempArray1.push({
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
                                //         status: 'Available',
                                //         paymentId: respon._data.paymentId,
                                //         date: respon._data.date,
                                //         catName: respon._data.catName,
                                //         subCatName: respon._data.subCatName,
                                //         userName: user._data.name,
                                //         userImage: user._data.imageUrl,
                                //         userFcmToken: user._data.fcmToken,
                                //         latitude: respon._data.latitude,
                                //         longitude: respon._data.longitude,
                                //         bidding: respon._data.bidding,
                                //         textView: true,
                                //         imageView: false,
                                //         imageMessage: false,
                                //
                                //         fromBidConfirmation: false,
                                //         fromOpenBidding: true,
                                //         fromPickup: false,
                                //         fromClientConfirmation: false,
                                //         fromPayoutAvailable: false,
                                //         fromJobClosed: false,
                                //     })
                                //     this.setState({
                                //         onGoing:tempArray1
                                //     })
                                //     // this.UpdateOnGoingItemsList(tempArray1)
                                // } else
                                    if (respon._data.status === 'Waiting Job Confirmation'){
                                        respon._data.bidding.map((bid) => {
                                            if ((bid.userId === userId) && (bid.status !== 'Accepted')) {
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
                                                    userId: respon._data.userId,
                                                    imageUrl: respon._data.imageUrl,
                                                    status: 'Waiting Confirmation',
                                                    paymentId: respon._data.paymentId,
                                                    date: respon._data.date,
                                                    catName: respon._data.catName,
                                                    subCatName: respon._data.subCatName,
                                                    userName: user._data.name,
                                                    userImage: user._data.imageUrl,
                                                    userFcmToken: user._data.fcmToken,
                                                    latitude: respon._data.latitude,
                                                    longitude: respon._data.longitude,
                                                    bidding: respon._data.bidding,
                                                    textView: false,
                                                    imageView: true,
                                                    imageMessage: false,

                                                    fromBidConfirmation: true,
                                                    fromOpenBidding: false,
                                                    fromPickup: false,
                                                    fromClientConfirmation: false,
                                                    fromPayoutAvailable: false,
                                                    fromJobClosed: false,

                                                })
                                                this.setState({
                                                    onGoing: tempArray1
                                                })
                                                // this.UpdateOnGoingItemsList(tempArray1)
                                            }
                                        })
                                    }
                                    // else if((respon._data.status === 'Job Completed') && (respon._data.bidding[0].status === 'Job Completed')) {
                                    //     tempArray1.push({
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
                                    //         status: 'Payout Available',
                                    //         paymentId: respon._data.paymentId,
                                    //         date: respon._data.date,
                                    //         catName: respon._data.catName,
                                    //         subCatName: respon._data.subCatName,
                                    //         userName: user._data.name,
                                    //         userImage: user._data.imageUrl,
                                    //         latitude: respon._data.latitude,
                                    //         longitude: respon._data.longitude,
                                    //         bidding: respon._data.bidding,
                                    //         textView: false,
                                    //         imageView: true,
                                    //         imageMessage:false,
                                    //
                                    //         fromBidConfirmation: false,
                                    //         fromOpenBidding: false,
                                    //         fromPickup: true,
                                    //         fromClientConfirmation: true,
                                    //         fromPayoutAvailable: false,
                                    //         fromJobClosed: false,
                                    //
                                    //     })
                                // }
                                if (respon._data.status === 'Waiting Job Confirmation'){
                                        respon._data.bidding.map((bid) => {
                                            if ((bid.userId === userId) && (bid.status === 'Accepted')) {
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
                                                    userId: respon._data.userId,
                                                    imageUrl: respon._data.imageUrl,
                                                    status: 'Waiting Job Confirmation',
                                                    paymentId: respon._data.paymentId,
                                                    date: respon._data.date,
                                                    catName: respon._data.catName,
                                                    subCatName: respon._data.subCatName,
                                                    userName: user._data.name,
                                                    userImage: user._data.imageUrl,
                                                    userFcmToken: user._data.fcmToken,
                                                    latitude: respon._data.latitude,
                                                    longitude: respon._data.longitude,
                                                    bidding: respon._data.bidding,
                                                    textView: false,
                                                    imageView: true,
                                                    imageMessage: true,

                                                    fromBidConfirmation: false,
                                                    fromOpenBidding: false,
                                                    fromPickup: true,
                                                    fromClientConfirmation: false,
                                                    fromPayoutAvailable: false,
                                                    fromJobClosed: false,

                                                })
                                                this.setState({
                                                    onGoing: tempArray1
                                                })
                                            }
                                        })
                                    // this.UpdateOnGoingItemsList(tempArray1)
                                }
                                // else if ((respon._data.status === 'Payout Done') && (respon._data.bidding[0].status === 'Payout Done')) {
                                //     tempArray1.push({
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
                                //         status: 'Job Closed',
                                //         paymentId: respon._data.paymentId,
                                //         date: respon._data.date,
                                //         catName: respon._data.catName,
                                //         subCatName: respon._data.subCatName,
                                //         userName: user._data.name,
                                //         userImage: user._data.imageUrl,
                                //         userFcmToken: user._data.fcmToken,
                                //         latitude: respon._data.latitude,
                                //         longitude: respon._data.longitude,
                                //         bidding: respon._data.bidding,
                                //         textView: false,
                                //         imageView: true,
                                //         imageMessage: false,
                                //         fromBidConfirmation: false,
                                //         fromOpenBidding: false,
                                //         fromPickup: false,
                                //         fromClientConfirmation: false,
                                //         fromPayoutAvailable: false,
                                //         fromJobClosed: true,
                                //
                                //     })
                                //     this.setState({
                                //         onGoing:tempArray1
                                //     })
                                    // this.UpdateOnGoingItemsList(tempArray1)
                                // }
                            })
                        }
                        else
                        {
                            this.setState({loading:false})
                        }
                    })
                })
            }
        })

    }


    completedJobs = () => {
        this.setState({loading:true,completed:[]});
        let { userId } = this.state;

        FirebaseHelper.getAllJobsExceptMyJobs(userId,(response) => {
            if (response === undefined || response._docs.length === 0) {
                this.setState({
                    loading: false,
                });
            }else {
                let tempArray2 = [];
                this.setState({completed:[]},() => {

                    response.forEach((respon) => {
                        if (respon._data.paymentId) {
                            FirebaseHelper.getUserProfile(respon._data.userId, (user) => {
                                if (respon._data.status === 'Job Completed'){
                                    respon._data.bidding.map((bid) => {
                                        if ((bid.userId === userId) && (bid.status === 'Job Completed')) {
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
                                                price: respon._data.price,
                                                userId: respon._data.userId,
                                                imageUrl: respon._data.imageUrl,
                                                status: 'Job Closed',
                                                paymentId: respon._data.paymentId,
                                                date: respon._data.date,
                                                catName: respon._data.catName,
                                                subCatName: respon._data.subCatName,
                                                userName: user._data.name,
                                                userImage: user._data.imageUrl,
                                                userFcmToken: user._data.fcmToken,
                                                latitude: respon._data.latitude,
                                                longitude: respon._data.longitude,
                                                bidding: respon._data.bidding,
                                                textView: false,
                                                imageView: true,
                                                imageMessage: false,
                                                fromBidConfirmation: false,
                                                fromOpenBidding: false,
                                                fromPickup: false,
                                                fromClientConfirmation: false,
                                                fromPayoutAvailable: false,
                                                fromJobClosed: true,
                                            })
                                            this.setState({
                                                completed: tempArray2,
                                            })
                                        }
                                    })
                                    // this.UpdateCompletedItemsList(tempArray2)
                                }
                            })
                        } else {
                            this.setState({loading:false})
                        }
                    })
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
        this.setState({completed : tempItems,loading:false})

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
        this.setState({items : tempItems})
    }


    getAllJobsExceptMyJobs = () => {
            this.setState({loading:true,items:[]});
            let { userId } = this.state;
            FirebaseHelper.getAllJobsExceptMyJobs(userId,(response) => {
                if (response === undefined || response._docs.length === 0) {
                    this.setState({
                        loading: false,
                    });
                }else {
                    let tempArray = [];
                    this.setState({items:[]},() => {
                        response.forEach((respon) => {
                            if (respon._data.paymentId) {
                                FirebaseHelper.getUserProfile(respon._data.userId, (user) => {
                                    if ((respon._data.status === 'Waiting for Service Provider') && (respon._data.bidding.length === 0)){
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
                                            imageUrl: respon._data.imageUrl,
                                            status: 'Available',
                                            paymentId: respon._data.paymentId,
                                            date: respon._data.date,
                                            catName: respon._data.catName,
                                            subCatName: respon._data.subCatName,
                                            userName: user._data.name,
                                            userImage: user._data.imageUrl,
                                            userFcmToken: user._data.fcmToken,
                                            latitude: respon._data.latitude,
                                            longitude: respon._data.longitude,
                                            bidding: respon._data.bidding,

                                            textView: true,
                                            imageView: false,
                                            imageMessage: false,

                                            fromBidConfirmation: false,
                                            fromOpenBidding: true,
                                            fromPickup: false,
                                            fromClientConfirmation: false,
                                            fromPayoutAvailable: false,
                                            fromJobClosed: false,
                                        })
                                        this.UpdateBiddingItemsList(tempArray);

                                    } else if (respon._data.status === 'Waiting Job Confirmation') {
                                        respon._data.bidding.map((bid) => {
                                            if ((bid.userId === userId) && (bid.status !== 'Accepted')) {
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
                                                    imageUrl: respon._data.imageUrl,
                                                    status: 'Waiting for Job Acceptance',
                                                    paymentId: respon._data.paymentId,
                                                    date: respon._data.date,
                                                    catName: respon._data.catName,
                                                    subCatName: respon._data.subCatName,
                                                    userName: user._data.name,
                                                    userImage: user._data.imageUrl,
                                                    userFcmToken: user._data.fcmToken,
                                                    latitude: respon._data.latitude,
                                                    longitude: respon._data.longitude,
                                                    bidding: respon._data.bidding,
                                                    textView: false,
                                                    imageView: true,
                                                    imageMessage: false,

                                                    fromBidConfirmation: true,
                                                    fromOpenBidding: false,
                                                    fromPickup: false,
                                                    fromClientConfirmation: false,
                                                    fromPayoutAvailable: false,
                                                    fromJobClosed: false,

                                                })
                                            }
                                        })
                                    }

                                        // if (respon._data.status === 'Waiting Job Confirmation')  {
                                    //     let value = 0;
                                    //     respon._data.bidding.map((bid) => {
                                    //         // if ((bid.userId === userId) && (bid.status === 'Waiting Job Confirmation')) {
                                    //         if ((bid.status !== 'Accepted')) {
                                    //              value = 1;
                                    //
                                    //         }
                                    //     })
                                    //     if(value === 0){
                                    //         tempArray.push({
                                    //             id: respon.id,
                                    //             time: respon._data.time,
                                    //             createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                    //             location: respon._data.location,
                                    //             title: respon._data.title,
                                    //             description: respon._data.description,
                                    //             tagWords: respon._data.tagWords,
                                    //             catId: respon._data.catId,
                                    //             subCatId: respon._data.subCatId,
                                    //             price: respon._data.price,
                                    //             userId: respon._data.userId,
                                    //             imageUrl: respon._data.imageUrl,
                                    //             status: 'Waiting for Acceptance',
                                    //             paymentId: respon._data.paymentId,
                                    //             date: respon._data.date,
                                    //             catName: respon._data.catName,
                                    //             subCatName: respon._data.subCatName,
                                    //             userName: user._data.name,
                                    //             userImage: user._data.imageUrl,
                                    //             userFcmToken: user._data.fcmToken,
                                    //             latitude: respon._data.latitude,
                                    //             longitude: respon._data.longitude,
                                    //             bidding: respon._data.bidding,
                                    //
                                    //             textView: false,
                                    //             imageView: true,
                                    //             imageMessage: false,
                                    //
                                    //             fromBidConfirmation: true,
                                    //             fromOpenBidding: false,
                                    //             fromPickup: false,
                                    //             fromClientConfirmation: false,
                                    //             fromPayoutAvailable: false,
                                    //             fromJobClosed: false,
                                    //
                                    //         })
                                    //         this.UpdateBiddingItemsList(tempArray);
                                    //     }
                                    //
                                    // }
                                    // else if (respon._data.status === 'Job Completed') {
                                    //     respon._data.bidding.map((bid) => {
                                    //         if ((bid.userId === userId) && (bid.status === 'Job Completed')) {
                                    //             tempArray.push({
                                    //                 id: respon.id,
                                    //                 time: respon._data.time,
                                    //                 createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                    //                 location: respon._data.location,
                                    //                 title: respon._data.title,
                                    //                 description: respon._data.description,
                                    //                 tagWords: respon._data.tagWords,
                                    //                 catId: respon._data.catId,
                                    //                 subCatId: respon._data.subCatId,
                                    //                 price: respon._data.price,
                                    //                 userId: respon._data.userId,
                                    //                 imageUrl: respon._data.imageUrl,
                                    //                 status: 'Job Closed',
                                    //                 paymentId: respon._data.paymentId,
                                    //                 date: respon._data.date,
                                    //                 catName: respon._data.catName,
                                    //                 subCatName: respon._data.subCatName,
                                    //                 userName: user._data.name,
                                    //                 userImage: user._data.imageUrl,
                                    //                 userFcmToken: user._data.fcmToken,
                                    //                 latitude: respon._data.latitude,
                                    //                 longitude: respon._data.longitude,
                                    //                 bidding: respon._data.bidding,
                                    //
                                    //                 textView: false,
                                    //                 imageView: true,
                                    //                 imageMessage: false,
                                    //
                                    //                 fromBidConfirmation: false,
                                    //                 fromOpenBidding: false,
                                    //                 fromPickup: false,
                                    //                 fromClientConfirmation: false,
                                    //                 fromPayoutAvailable: false,
                                    //                 fromJobClosed: true,
                                    //
                                    //             })
                                    //             this.UpdateBiddingItemsList(tempArray);
                                    //         }
                                    //     })
                                    //
                                    // }
                                    // else if ((respon._data.status === 'Waiting Job Confirmation') && (respon._data.bidding[0].status === 'Accepted')) {
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
                                    //         status: 'Waiting Job Confirmation',
                                    //         paymentId: respon._data.paymentId,
                                    //         date: respon._data.date,
                                    //         catName: respon._data.catName,
                                    //         subCatName: respon._data.subCatName,
                                    //         userName: user._data.name,
                                    //         userImage: user._data.imageUrl,
                                    //         userFcmToken: user._data.fcmToken,
                                    //         latitude: respon._data.latitude,
                                    //         longitude: respon._data.longitude,
                                    //         bidding: respon._data.bidding,
                                    //
                                    //         textView: false,
                                    //         imageView: true,
                                    //         imageMessage: true,
                                    //
                                    //         fromBidConfirmation: false,
                                    //         fromOpenBidding: false,
                                    //         fromPickup: true,
                                    //         fromClientConfirmation: false,
                                    //         fromPayoutAvailable: false,
                                    //         fromJobClosed: true,
                                    //
                                    //     })
                                    //     this.UpdateBiddingItemsList(tempArray);
                                    // }
                                    //     else if ((respon._data.status === 'Job Completed') && (respon._data.bidding[0].status === 'Payout Done')) {
                                //         tempArray.push({
                                //             id: respon.id,
                                //             time: respon._data.time,
                                //             createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                                //             location: respon._data.location,
                                //             title: respon._data.title,
                                //             description: respon._data.description,
                                //             tagWords: respon._data.tagWords,
                                //             catId: respon._data.catId,
                                //             subCatId: respon._data.subCatId,
                                //             price: respon._data.price,
                                //             userId: respon._data.userId,
                                //             imageUrl: respon._data.imageUrl,
                                //             status: 'Job Closed',
                                //             paymentId: respon._data.paymentId,
                                //             date: respon._data.date,
                                //             catName: respon._data.catName,
                                //             subCatName: respon._data.subCatName,
                                //             userName: user._data.name,
                                //             userImage: user._data.imageUrl,
                                //             userFcmToken: user._data.fcmToken,
                                //             latitude: respon._data.latitude,
                                //             longitude: respon._data.longitude,
                                //             bidding: respon._data.bidding,
                                //             textView: false,
                                //             imageView: true,
                                //             imageMessage: false,
                                //             fromBidConfirmation: false,
                                //             fromOpenBidding: false,
                                //             fromPickup: false,
                                //             fromClientConfirmation: false,
                                //             fromPayoutAvailable: false,
                                //             fromJobClosed: true,
                                //
                                //         })
                                //         this.UpdateBiddingItemsList(tempArray);
                                //     }
                                })
                            } else {
                                this.setState({loading:false})
                            }

                        })
                    })
                }
            })
    }


    getAllFilterJobs = () => {
        this.setState({loading:true});
        let { userId } = this.state;
        let tempArray = [];
        FirebaseHelper.getServiceDocument(this.props.route.params.docId,(respon) => {
            if (respon === undefined) {
                this.setState({
                    loading: false,
                });
            }else {
                    if(respon._data.paymentId !== '') {
                        FirebaseHelper.getUserProfile(respon._data.userId, (user) => {
                            if (respon._data.status === 'Waiting for Service Provider') {
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
                                    imageUrl: respon._data.imageUrl,
                                    status: 'Available',
                                    paymentId: respon._data.paymentId,
                                    date: respon._data.date,
                                    catName: respon._data.catName,
                                    subCatName: respon._data.subCatName,
                                    userName: user._data.name,
                                    userImage: user._data.imageUrl,
                                    userFcmToken: user._data.fcmToken,
                                    latitude: respon._data.latitude,
                                    longitude: respon._data.longitude,
                                    bidding: respon._data.bidding,
                                    textView: true,
                                    imageView: false,
                                    imageMessage: false,

                                    fromBidConfirmation: false,
                                    fromOpenBidding: true,
                                    fromPickup: false,
                                    fromClientConfirmation: false,
                                    fromPayoutAvailable: false,
                                    fromJobClosed: false,
                                })
                            }
                            else if (respon._data.status === 'Waiting Job Confirmation'){
                                respon._data.bidding.map((bid) => {
                                    if ((bid.userId === userId) && (bid.status !== 'Accepted')) {
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
                                            imageUrl: respon._data.imageUrl,
                                            status: 'Waiting for Job Acceptance',
                                            paymentId: respon._data.paymentId,
                                            date: respon._data.date,
                                            catName: respon._data.catName,
                                            subCatName: respon._data.subCatName,
                                            userName: user._data.name,
                                            userImage: user._data.imageUrl,
                                            userFcmToken: user._data.fcmToken,
                                            latitude: respon._data.latitude,
                                            longitude: respon._data.longitude,
                                            bidding: respon._data.bidding,
                                            textView: false,
                                            imageView: true,
                                            imageMessage: false,

                                            fromBidConfirmation: true,
                                            fromOpenBidding: false,
                                            fromPickup: false,
                                            fromClientConfirmation: false,
                                            fromPayoutAvailable: false,
                                            fromJobClosed: false,

                                        })
                                    }
                                })

                            }
                            // else if (respon._data.status === 'Job Completed'){
                            //     respon._data.bidding.map((bid) => {
                            //         if ((bid.userId === userId) && (bid.status === 'Job Completed')) {
                            //             tempArray.push({
                            //                 id: respon.id,
                            //                 time: respon._data.time,
                            //                 createdAt: moment(respon._data.createdAt.toDate()).fromNow(),
                            //                 location: respon._data.location,
                            //                 title: respon._data.title,
                            //                 description: respon._data.description,
                            //                 tagWords: respon._data.tagWords,
                            //                 catId: respon._data.catId,
                            //                 subCatId: respon._data.subCatId,
                            //                 price: respon._data.price,
                            //                 userId: respon._data.userId,
                            //                 imageUrl: respon._data.imageUrl,
                            //                 status: 'Job Closed',
                            //                 paymentId: respon._data.paymentId,
                            //                 date: respon._data.date,
                            //                 catName: respon._data.catName,
                            //                 subCatName: respon._data.subCatName,
                            //                 userName: user._data.name,
                            //                 userImage: user._data.imageUrl,
                            //                 userFcmToken: user._data.fcmToken,
                            //                 latitude: respon._data.latitude,
                            //                 longitude: respon._data.longitude,
                            //                 bidding: respon._data.bidding,
                            //                 textView: false,
                            //                 imageView: true,
                            //                 imageMessage: false,
                            //
                            //                 fromBidConfirmation: false,
                            //                 fromOpenBidding: false,
                            //                 fromPickup: false,
                            //                 fromClientConfirmation: false,
                            //                 fromPayoutAvailable: false,
                            //                 fromJobClosed: true,
                            //
                            //             })
                            //         }
                            //     })
                            //
                            // }
                            // else if ((respon._data.status === 'Waiting Job Confirmation') && (respon._data.bidding[0].status === 'Accepted')) {
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
                            //         status: 'Waiting Job Confirmation',
                            //         paymentId: respon._data.paymentId,
                            //         date: respon._data.date,
                            //         catName: respon._data.catName,
                            //         subCatName: respon._data.subCatName,
                            //         userName: user._data.name,
                            //         userImage: user._data.imageUrl,
                            //         userFcmToken: user._data.fcmToken,
                            //         latitude: respon._data.latitude,
                            //         longitude: respon._data.longitude,
                            //         bidding: respon._data.bidding,
                            //         textView: false,
                            //         imageView: true,
                            //         imageMessage: true,
                            //
                            //         fromBidConfirmation: false,
                            //         fromOpenBidding: false,
                            //         fromPickup: true,
                            //         fromClientConfirmation: false,
                            //         fromPayoutAvailable: false,
                            //         fromJobClosed: false,
                            //
                            //     })
                            // }
                            // else if ((respon._data.status === 'Payout Done') && (respon._data.bidding[0].status === 'Payout Done')) {
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
                            //         status: 'Job Closed',
                            //         paymentId: respon._data.paymentId,
                            //         date: respon._data.date,
                            //         catName: respon._data.catName,
                            //         subCatName: respon._data.subCatName,
                            //         userName: user._data.name,
                            //         userImage: user._data.imageUrl,
                            //         userFcmToken: user._data.fcmToken,
                            //         latitude: respon._data.latitude,
                            //         longitude: respon._data.longitude,
                            //         bidding: respon._data.bidding,
                            //         textView: false,
                            //         imageView: true,
                            //         imageMessage: false,
                            //         fromBidConfirmation: false,
                            //         fromOpenBidding: false,
                            //         fromPickup: false,
                            //         fromClientConfirmation: false,
                            //         fromPayoutAvailable: false,
                            //         fromJobClosed: true,
                            //
                            //     })
                            // }
                        })
                    }

                setTimeout(() => {
                    this.setState({
                        items:tempArray,
                        loading:false
                    })
                },1500)

            }
        })

    }


    onSelectCategory = (value) => {
        this.setState({loading:true});
        let { userId } = this.state;
        let tempArray = [];
        FirebaseHelper.getAllJobsExceptMyJobs(userId,(response) => {
            if (response === undefined || response._docs.length < 1) {
                this.setState({
                    loading: false,
                });
            }else {
                response.forEach((respon) => {
                if((respon._data.paymentId !== '') && (respon._data.catName === value)) {
                    FirebaseHelper.getUserProfile(respon._data.userId, (user) => {
                        if (respon._data.status === 'Waiting for Service Provider') {
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
                                imageUrl: respon._data.imageUrl,
                                status: 'Available',
                                paymentId: respon._data.paymentId,
                                date: respon._data.date,
                                catName: respon._data.catName,
                                subCatName: respon._data.subCatName,
                                userName: user._data.name,
                                userImage: user._data.imageUrl,
                                userFcmToken: user._data.fcmToken,
                                latitude: respon._data.latitude,
                                longitude: respon._data.longitude,
                                bidding: respon._data.bidding,
                                textView: true,
                                imageView: false,
                                imageMessage: false,

                                fromBidConfirmation: false,
                                fromOpenBidding: true,
                                fromPickup: false,
                                fromClientConfirmation: false,
                                fromPayoutAvailable: false,
                                fromJobClosed: false,
                            })
                        } else if (respon._data.status === 'Waiting Job Confirmation') {
                            respon._data.bidding.map((bid) => {
                                if((bid.userId === userId) && (bid.status !== 'Accepted')){
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
                                        imageUrl: respon._data.imageUrl,
                                        status: 'Waiting for Job Acceptance',
                                        paymentId: respon._data.paymentId,
                                        date: respon._data.date,
                                        catName: respon._data.catName,
                                        subCatName: respon._data.subCatName,
                                        userName: user._data.name,
                                        userImage: user._data.imageUrl,
                                        userFcmToken: user._data.fcmToken,
                                        latitude: respon._data.latitude,
                                        longitude: respon._data.longitude,
                                        bidding: respon._data.bidding,
                                        textView: false,
                                        imageView: true,
                                        imageMessage: false,

                                        fromBidConfirmation: true,
                                        fromOpenBidding: false,
                                        fromPickup: false,
                                        fromClientConfirmation: false,
                                        fromPayoutAvailable: false,
                                        fromJobClosed: false,

                                    })
                                }
                            })

                        } else if (respon._data.status === 'Job Completed'){
                            respon._data.bidding.map((bid) => {
                                if ((bid.userId === userId) && (bid.status === 'Job Completed')) {
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
                                        imageUrl: respon._data.imageUrl,
                                        status: 'Job Closed',
                                        paymentId: respon._data.paymentId,
                                        date: respon._data.date,
                                        catName: respon._data.catName,
                                        subCatName: respon._data.subCatName,
                                        userName: user._data.name,
                                        userImage: user._data.imageUrl,
                                        userFcmToken: user._data.fcmToken,
                                        latitude: respon._data.latitude,
                                        longitude: respon._data.longitude,
                                        bidding: respon._data.bidding,
                                        textView: false,
                                        imageView: true,
                                        imageMessage: false,

                                        fromBidConfirmation: false,
                                        fromOpenBidding: false,
                                        fromPickup: false,
                                        fromClientConfirmation: true,
                                        fromPayoutAvailable: false,
                                        fromJobClosed: true,

                                    })
                                }
                            })

                        } else if (respon._data.status === 'Waiting Job Confirmation'){
                            respon._data.bidding.map((bid) => {
                                if ((bid.userId === userId) && (bid.status === 'Accepted')) {
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
                                        imageUrl: respon._data.imageUrl,
                                        status: 'Waiting Job Confirmation',
                                        paymentId: respon._data.paymentId,
                                        date: respon._data.date,
                                        catName: respon._data.catName,
                                        subCatName: respon._data.subCatName,
                                        userName: user._data.name,
                                        userImage: user._data.imageUrl,
                                        userFcmToken: user._data.fcmToken,
                                        latitude: respon._data.latitude,
                                        longitude: respon._data.longitude,
                                        bidding: respon._data.bidding,
                                        textView: false,
                                        imageView: true,
                                        imageMessage: true,

                                        fromBidConfirmation: false,
                                        fromOpenBidding: false,
                                        fromPickup: true,
                                        fromClientConfirmation: false,
                                        fromPayoutAvailable: false,
                                        fromJobClosed: false,

                                    })
                                }
                            })

                        }
                        // else if ((respon._data.status === 'Payout Done') && (respon._data.bidding[0].status === 'Payout Done')) {
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
                        //         status: 'Job Closed',
                        //         paymentId: respon._data.paymentId,
                        //         date: respon._data.date,
                        //         catName: respon._data.catName,
                        //         subCatName: respon._data.subCatName,
                        //         userName: user._data.name,
                        //         userImage: user._data.imageUrl,
                        //         userFcmToken: user._data.fcmToken,
                        //         latitude: respon._data.latitude,
                        //         longitude: respon._data.longitude,
                        //         bidding: respon._data.bidding,
                        //         textView: false,
                        //         imageView: true,
                        //         imageMessage: false,
                        //         fromBidConfirmation: false,
                        //         fromOpenBidding: false,
                        //         fromPickup: false,
                        //         fromClientConfirmation: false,
                        //         fromPayoutAvailable: false,
                        //         fromJobClosed: true,
                        //
                        //     })
                        // }
                    })
                }

                })
                setTimeout(() => {
                    this.setState({
                        items:tempArray,
                        loading:false
                    })
                },1500)

            }
        })
    }


    _renderItem = (item) => {
        let path;
        if(item.status === 'Waiting for Service Provider') {
            path = {fromOpenBidding: true,fromBidConfirmation: false,fromPickup: false,fromClientConfirmation: false,fromPayoutAvailable: false,fromJobClosed: false};
        }
        else if(item.id===1) {
            path = {fromBidConfirmation: true,fromOpenBidding: false,fromPickup: false,fromClientConfirmation: false,fromPayoutAvailable: false,fromJobClosed: false};
        }
        else if(item.id===2) {
            path = {fromPickup: true,fromBidConfirmation: false,fromOpenBidding: false,fromClientConfirmation: false,fromPayoutAvailable: false,fromJobClosed: false};
        }
        else if(item.id===3) {
            path = {fromClientConfirmation: true,fromPickup: false,fromBidConfirmation: false,fromOpenBidding: false,fromPayoutAvailable: false,fromJobClosed: false};
        }
        else if(item.id===4) {
            path = {fromPayoutAvailable: true,fromClientConfirmation: false,fromPickup: false,fromBidConfirmation: false,fromOpenBidding: false,fromJobClosed: false};
        }
        else if(item.id===5) {
            path = {fromJobClosed: true,fromPayoutAvailable: false,fromClientConfirmation: false,fromPickup: false,fromBidConfirmation: false,fromOpenBidding: false,};
        }
        return  (
            <DriverGardenToolComponent
                time={item.time}
                price={item.price}
                status={item.status}
                name={item.title}
                date={item.date}
                userName={item.userName}
                createdAt={item.createdAt}
                bid={item.bid}
                image={item.userImage}
                textPrice={item.textPrice}
                imageMessage={item.imageMessage}
                msgImage={images.icn_message_alert}
                img={item.userImage}
                imgStatus={item.imgStatus}
                imageView={item.imageView}
                textView={item.textView}
                onPressImg={() => this.props.navigation.navigate('Chat')}
                onPress={()=> this.props.navigation.navigate("ProviderServiceDetails", {item})}
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
                />
                <View style={styles.innerUpperView}>
                    <Dropdown
                        dropdownStyle = {styles.dropdownCategory}
                        dropdownOptionsStyle={styles.dropdownCategoryOptionsStyle}
                        defaultButtontext={'Category/Sub-Category'}
                        buttonTextStyle={styles.dropdownButtonText}
                        marginTop={0.0001}
                        options={this.state.categories}
                        onSelect = {(index,value) => {this.onSelectCategory(value)}}
                    />

                    <TouchableOpacity   onPress={() => this.props.navigation.navigate('HomeScreen')}>
                        <Image style={styles.img} source={images.icn_button_map} />
                    </TouchableOpacity>
                </View>

                <TabComponent
                    leftText={'Available'}
                    middleText={'Ongoing'}
                    rightText={'Completed'}
                    onLeftPress = {()=>  this.setState({leftComponent:true,middleComponent:false,rightComponent:false})}
                    onMiddlePress={()=>this.setState(  {middleComponent:true,leftComponent:false,rightComponent:false})}
                    onRightPress= {()=> this.setState( {rightComponent:true,leftComponent:false,middleComponent:false})}
                />

               <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.mainContainer}>

                    {this.state.leftComponent &&

                    <View style={styles.viewFlat}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            data={this.state.items}
                            renderItem={({item}) => this._renderItem(item)}
                        />
                    </View>}

                    {this.state.middleComponent &&

                    <View style={styles.viewFlat}>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            data={this.state.onGoing}
                            renderItem={({item}) => this._renderItem(item)}
                        />
                    </View>}

                    {this.state.rightComponent &&

                    <View style={styles.viewFlat}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            data={this.state.completed}
                            renderItem={({item}) => this._renderItem(item)}
                        />

                    </View>}

                </View>

               </ScrollView>

            </View>

        );
    }
}

