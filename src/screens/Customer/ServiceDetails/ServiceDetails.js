//================================ React Native Imported Files ======================================//

import React from 'react';
import {View,Text,Alert,FlatList} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import ImageListComponent from '../../../Components/ImageListComponent/ImageListComponent';
import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import BiddersComponent from '../../../Components/BiddersComponent/BiddersComponent';
import styles from './style';
import AppLoading from '../../../Components/AppLoading';
import FirebaseHelper from '../../../firebase/FirebaseHelper';


export default class ServiceDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img:true,
            id: this.props.route.params.item.id,
            serviceName: this.props.route.params.item.title,
            catName: this.props.route.params.item.catName,
            subCatName: this.props.route.params.item.subCatName,
            userName: this.props.route.params.item.userName,
            location: this.props.route.params.item.location,
            date: this.props.route.params.item.date,
            time: this.props.route.params.item.time,
            tagWords: this.props.route.params.item.tagWords,
            createdAt: this.props.route.params.item.createdAt,
            items: [],

            bidderReview: [],
            imageList: [],
            otherUserId:'',
            otherPersonFcmToken:'',
        }
    }

    bidDetails = (item) => {
        if(this.props.route.params.item.bidding.length > 0 ) {
            this.props.route.params.item.bidding.map((bid) => {
                if(bid.status === 'Accepted'){
                    this.props.navigation.navigate('BidDetails',{
                        id:item.userId,
                        docId: this.state.id,
                        price: this.props.route.params.item.price,
                        show:false,
                        bidding:this.props.route.params.item.bidding,
                        item:this.props.route.params.item
                    })
                }else if(bid.status !== 'Accepted'){
                    this.props.navigation.navigate('BidDetails',{
                        id:item.userId,
                        docId: this.state.id,
                        price: this.props.route.params.item.price,
                        show:true,
                        bidding:this.props.route.params.item.bidding,
                        item:this.props.route.params.item
                    })
                }else if(bid.status === 'Waiting Job Confirmation'){
                    this.props.navigation.navigate('BidDetails',{
                        id:item.userId,
                        docId: this.state.id,
                        price: this.props.route.params.item.price,
                        show:false,
                        bidding:this.props.route.params.item.bidding,
                        item:this.props.route.params.item
                    })
                }
            })
        }
    }


    _renderItem = (item) => {
        return (
            <BiddersComponent
                imgLeft={item.image}
                textLeft={item.name}
                imgRight={images.icn_message_alert}
                textRight={item.bid}
                onPress={() => this.bidDetails(item)}
                onChatPress={() => this.props.navigation.navigate('messageScreen',{
                    id:item.userId
                })}
            />
        )
    };


    // _bidderReview = (item) => {
    //     return (
    //         <BidderReviewComponent
    //             image={item.image}
    //             name={item.name}
    //             price={item.price}
    //             rating={item.rating}
    //             onPress={() => this.props.navigation.navigate('BidDetails') }
    //         />
    //     )
    // };


    _imageList = (item) => {
        return (

                <ImageListComponent
                    image={item}
                />
        )
    };


    onPressCancel = () => {
        Alert.alert(
            "Cancel Service",
            "Are you sure you want to cancel?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => this.cancelService() }
            ]
        );

    }


    cancelService = () => {
        this.setState({loading:true})
        let { id } = this.state;
            FirebaseHelper.cancelService(id, 'Cancelled').then(() => {
                this.setState({loading: false},() => {
                    alert("Service Cancelled")
                    this.props.navigation.navigate('JobOrder')
                })
            })
    }


    onConfirm = () => {
        Alert.alert(
            "Confirm Job",
            "Are you sure you want to Confirm?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {text: "Yes", onPress: () => this.confirmApplicant()}
            ]
        );

    }


    confirmApplicant = () => {
        this.setState({loading:true})
        let tempArray=[];
        let { id } = this.state;
        this.props.route.params.item.bidding.map((bid) => {
            if(bid.status === 'Job Confirmation Pending'){
                tempArray.push({
                    name:bid.name,
                    bid:bid.bid,
                    image:bid.image,
                    userId: bid.userId,
                    status:"Job Completed"
                })
            }else{
                tempArray.push(bid)
            }
        })
        this.setState({newArray:tempArray},() => {
            FirebaseHelper.onSendNotifications(
                this.props.route.params.item.otherPersonFcmToken,
                "Job Completed",
                `${this.props.route.params.item.userName} Completed the Job`,
                () => {
                    let object = {
                        createdAt: new Date(),
                        message: `${this.props.route.params.item.userName} Completed the Job`,
                        title: 'Job Completed',
                        receiverId: this.props.route.params.item.otherPersonUserId,
                    };
                    FirebaseHelper.createNotification(object).then(() => {
                        FirebaseHelper.cancelService(id, 'Job Completed').then(() => {
                            FirebaseHelper.updateBidding(id, this.state.newArray).then(() => {
                                this.setState({loading: false}, () => {
                                    this.props.navigation.navigate('ConfirmDelivery', {
                                        service: false,
                                        id: this.state.id,
                                        item:this.props.route.params.item
                                    })
                                })
                            })
                        })
                    })
                })
        })
    }


    render() {
        let fromPendingPickup=false;
        if(this.props.route.params.item.fromPickup === true || this.props.route.params.item.fromConfirmPending){
            fromPendingPickup=true
            fromPendingPickup=true
        }

        return(

            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}
                <AppHeader
                    onLeftIconPress={() => this.props.navigation.goBack()}
                    title={'Service Details'}
                    leftIconPath={images.ic_back}
                />

                <View style={styles.upperView}>

                    <View style={styles.innerFirstUpperView}>
                        <Text style={styles.textTime}>Posted {this.state.createdAt} </Text>
                        <View style={styles.viewProfile}>
                            <Text style={styles.heading}>{this.state.serviceName}</Text>

                            {/*{this.props.route.params.item.fromOpenBidding  ||  this.props.route.params.item.fromConfirmPending || this.props.route.params.fromJobCompleted ?*/}
                                <View style={styles.viewImages}>
                                    <Text style={styles.textPriceBid}>${this.props.route.params.item.price}.00</Text>
                                    {/*<TouchableOpacity>*/}
                                    {/*    <Image style={styles.img} source={images.ic_edit}  />*/}
                                    {/*</TouchableOpacity>*/}
                                    {/*<TouchableOpacity>*/}
                                    {/*    <Image style={styles.img} source={images.icn_delete_order}  />*/}
                                    {/*</TouchableOpacity>*/}
                                </View>
                            {/*}*/}

                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={styles.userText}>By: </Text>
                        <Text style={styles.userText1}>{this.state.userName}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={styles.textAvgBid}>Category: </Text>
                        <Text style={styles.textAvgBid1}>{this.state.catName} > </Text>
                        <Text style={styles.textAvgBid1}>{this.state.subCatName}</Text>
                        </View>
                    </View>

                    <View style={[styles.viewText,{width:this.state.img ? "80%":"100%",}]}>
                        <View style={styles.mainViewTags}>
                            <Text style={{fontSize:wp(3.7),fontFamily:'Roboto-MediumItalic'}}>Tags: </Text>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                data={this.props.route.params.item.tagWords}
                                renderItem={({item})=> {
                                    return(
                                        <View style={styles.viewTags}>
                                            <Text style={{color:colors.white,fontWeight:'600'}}>{item}</Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>

                        <Text style={{paddingTop:'3%',fontFamily:'Roboto-Regular'}}>
                            {this.props.route.params.item.description}
                        </Text>
                        {/*{this.props.route.params.fromOpenBidding &&*/}
                        {/*    <Image style={styles.image} source={images.avatar}  />*/}
                        {/*}*/}

                    </View>

                </View>

                <View style={styles.lineView} />
                {!this.props.route.params.item.fromPickup ?
                    <View style={styles.middleView}>
                    <View style={styles.innerMiddleUpperView}>

                        <View>
                            <Text style={styles.textTitleUpperMiddle}>Location:</Text>
                            <Text style={{width: wp(45),height:hp(7)}}>{this.state.location}</Text>
                        </View>

                        <View style={{paddingLeft:'10%'}}>
                            <Text style={styles.textTitleUpperMiddle2}>Date/Time:</Text>
                            <Text style={{textAlign:'left',height:hp(7)}}>{this.state.date} {this.state.time}</Text>
                        </View>

                    </View>
                </View>:null }

                {this.props.route.params.item.fromPickup ? <View style={styles.middleView}>
                    <View style={styles.innerMiddleUpperView}>

                        <View>
                            <Text style={styles.textTitleUpperMiddle1}>Pickup:</Text>
                            <Text numberOfLines={3} style={{height:hp(6),width:wp(40)}} >{this.state.location.substring(0,60)}</Text>
                        </View>

                        <View style={{paddingLeft:'10%'}}>
                            <Text style={styles.textTitleUpperMiddle}>Drop Off:</Text>
                            <Text numberOfLines={3} style={{height:hp(6),width:wp(40)}}>555 Dale St Sametown TX 78522</Text>
                            {/*<Text></Text>*/}
                        </View>

                    </View>

                    <View style={styles.innerMiddleBottomView}>

                        <View>
                            <Text style={styles.textTitleBottomMiddle}>Pick up Date/Time:</Text>
                            <Text>{this.state.date} {this.state.time}</Text>

                        </View>

                        <View style={{paddingLeft:'17%'}}>
                            <Text style={styles.textTitleBottomMiddle}>Preferred Vehicle:</Text>
                            <Text>Sedan</Text>

                        </View>

                    </View>

                </View>:null }

                <View style={styles.bottomView}>

                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            data={this.props.route.params.item.imageUrl}
                            renderItem={({item})=> this._imageList(item)}
                        />

                    </View>

                {this.props.route.params.item.fromPickup && <View
                    style={styles.viewBidder}>

                    <Text style={styles.textBidder}>Bidders for the job</Text>

                </View>}

                <View style={styles.viewLine}>
                    <View style={styles.line}/>
                </View>


                <View style={styles.viewFlat}>

                    {fromPendingPickup &&

                    <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            data={this.props.route.params.item.bidding}
                            renderItem={({item})=> this._renderItem(item)}
                        />

                    }

                    {/*{this.props.route.params.fromPickup  &&*/}

                    {/*<FlatList*/}
                    {/*    showsVerticalScrollIndicator={false}*/}
                    {/*    keyExtractor={item => item.id}*/}
                    {/*    data={this.state.bidderReview}*/}
                    {/*    renderItem={({item})=> this._bidderReview(item)}*/}
                    {/*/>*/}

                    {/*}*/}

                    {this.props.route.params.item.fromOpenBidding &&

                   <Text style={styles.waitingServiceProviderText}>Waiting for Service Provider to Accept Job</Text>

                    }

                </View>

                {this.props.route.params.item.cancelled ? null:

                <View style={styles.viewBtn}>
                    <Button
                        height={hp(6)}
                        width={wp(90)}
                        marginTop={Platform.OS === 'ios' ? 0 : 3}
                        buttonText={this.props.route.params.item.fromOpenBidding ?  "Cancel Job" : this.props.route.params.item.fromPickup ? "Cancel Job" :this.props.route.params.item.fromConfirmPending ? "Confirm Job":''}
                        bgColor={this.props.route.params.item.fromConfirmPending ? colors.app_color  : colors.dark_grey}
                        onPress={()=>  this.props.route.params.item.fromPickup ? this.onPressCancel() : this.props.route.params.item.fromConfirmPending ? this.onConfirm() : this.props.route.params.item.fromOpenBidding ? this.onPressCancel() : null}
                        fontSize={16}
                        textColor={colors.white}
                    />
                </View>}

                {this.props.route.params.item.fromJobCompleted &&
                    <Text style={{color:colors.app_color,textAlign:'center',marginTop:'10%',fontWeight:'bold'}}>Job Completed</Text>
                }

            </View>

        );
    }
}
