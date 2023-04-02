//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Text, Image, FlatList, Alert,Linking} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import ImageListComponent from '../../../Components/ImageListComponent/ImageListComponent';
import styles from './style';
import AppLoading from '../../../Components/AppLoading';
import FirebaseHelper from '../../../firebase/FirebaseHelper';


export default class ProviderServiceDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            id: this.props.route.params.item.id,
            userPostId:this.props.route.params.item.userId,
            serviceName: this.props.route.params.item.title,
            catName: this.props.route.params.item.catName,
            subCatName: this.props.route.params.item.subCatName,
            userName: this.props.route.params.item.userName,
            location: this.props.route.params.item.location,
            date: this.props.route.params.item.date,
            time: this.props.route.params.item.time,
            tagWords: this.props.route.params.item.tagWords,
            price: this.props.route.params.item.price,
            bidding: this.props.route.params.item.bidding,
            createdAt:this.props.route.params.item.createdAt,

            subString: this.props.route.params.item.location.substring(0,20),

            loading:false,
            items: [],
            imageList: [],
            statusText: '',
            showImage: false,
            messageImage: false,
            changeBid: '',
            payoutDelivery: '',
            button: false,
            secondButton: false,
            btnTitle: '',
            btnBgColor: '',
            newArray:[],
            newArray1:[],
            name:'',
            image:'',

        }
    }

    componentDidMount() {
        this.focusListner = this.props.navigation.addListener('focus', () => {
           this.getUserData();
           this.setConditions();
        });
    }


    componentWillUnmount() {
        this.focusListner();
    }


    getUserData = () => {
        this.setState({loading:false})
        let { userId } = this.state;
        FirebaseHelper.getUserProfile(userId,(response) => {
            if(response === undefined)
            {
                this.setState({loading:false})
            }else{
                this.setState({
                    name:response._data.name,
                    image:response._data.imageUrl,
                    loading:false
                })
            }
        })
    }


    setConditions = () => {
        if(this.props.route.params.item.fromOpenBidding) {
            this.setState({statusText:'Job Available', showImage: true, button: true, btnTitle: 'Accept Job', btnBgColor: colors.app_color})
        }
         if(this.props.route.params.item.fromBidConfirmation) {
            this.setState({ statusText: 'Waiting for confirmation', showImage: true,  payoutDelivery: `Payment: $ ${this.state.price}.00`, changeBid: '',
                button: true, btnTitle: 'Cancel Offer', btnBgColor: colors.dark_grey});
        }
         if(this.props.route.params.item.fromPickup) {
            this.setState({statusText:'Payout Available', showImage:true, messageImage:true,  payoutDelivery: `Payout: $ ${this.state.price}.00`, changeBid: '',
                button:true, btnTitle:'Confirm Job Completion', btnBgColor:'#dd2e3f', secondButton:true })
        }
         if(this.props.route.params.item.fromClientConfirmation)  {
            this.setState({statusText:'Job Complete / Payout Available',  showImage:true, payoutDelivery:`Payout: $ ${this.state.price}.00`, button:true,secondButton:false, btnTitle:'Payout Available', btnBgColor:colors.app_color});
        }
         if(this.props.route.params.item.fromJobClosed) {
            this.setState({statusText: 'Job Complete', showImage:true, payoutDelivery:`Payout: $ ${this.state.price}.00`})
        }
    }


    _imageList = (item) => {
        return (
            <ImageListComponent
                image={item}
            />
        )
    };


    onAccept = (statusText) => {
        if(statusText === 'Accept Job'){
            this.acceptJob();
        }else if(statusText === 'Cancel Offer'){
            this.cancelOffer();
        }else if(statusText === 'Confirm Job Completion'){
            this.confirmJob();
        }else if(statusText === 'Payout Available'){
            this.props.navigation.navigate('MyWallet',{
                item: this.props.route.params.item,
                fromHome:true
            });
        }
    }


    confirmJob = () => {
        Alert.alert(
            "Complete Job",
            "Are you sure you want to Complete?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => this.confirmApplication() }
            ]
        );
    }


    confirmApplication = () => {
        this.setState({loading:true})
        let tempArray=[];
        let { id,userId } = this.state;
        this.props.route.params.item.bidding.map((bid) => {
            if(bid.userId === userId){
                tempArray.push({
                    name:bid.name,
                    bid:bid.bid,
                    image:bid.image,
                    userId: bid.userId,
                    status:"Job Confirmation Pending"
                })
            }else{
                tempArray.push(bid)
            }
        })
        this.setState({newArray:tempArray,loading:false},() => {
            FirebaseHelper.onSendNotifications(
                this.props.route.params.item.userFcmToken,
                "Job Confirmation Request",
                `${this.state.name} requested for job confirmation`,
                () => {
                    let object = {
                        createdAt: new Date(),
                        message: `${this.state.name} requested for job confirmation`,
                        title: 'Job Confirmation Pending',
                        receiverId: this.props.route.params.item.userId,
                    };
                    FirebaseHelper.createNotification(object).then(() => {
                        FirebaseHelper.acceptService(id, this.state.newArray, 'Job Confirmation Pending').then(() => {
                            this.props.navigation.navigate('ConfirmDelivery', {
                                service: true,
                                id: this.props.route.params.item.id,
                                item:this.props.route.params.item
                            })
                        })

                    })
                })
        })
    }


    cancelOffer = () => {
        Alert.alert(
            "Cancel offer",
            "Are you sure you want to cancel?",
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
        let tempArray=[];
        let { id,userId } = this.state;
        this.props.route.params.item.bidding.map((bid) => {
            if(bid.userId === userId){
                tempArray.push({
                    name:bid.name,
                    bid:bid.bid,
                    image:bid.image,
                    userId: bid.userId,
                    status:"Cancelled"
                })
            }else{
                tempArray.push(bid)
            }
        })
        this.setState({newArray:tempArray,loading:false},() => {
            FirebaseHelper.acceptService(id,this.state.newArray,'Cancelled').then(() => {
                this.props.navigation.navigate('ProviderJobOrder')
            })
        })
    }


    acceptJob = () => {
        this.setState({loading:true});
        let tempArray = [];

        let { userId } = this.state;
        if(this.props.route.params.item.bidding.length === 0) {
            let acceptObject = {
                name: this.state.name,
                image: this.state.image,
                userId: auth().currentUser.uid,
                bid: this.props.route.params.item.price,
                status: 'Waiting Job Confirmation',
            };
            if(this.props.route.params.item.bidding.length === 0){
                tempArray.push(acceptObject)
            }
            this.setState({newArray1: tempArray}, () => {
                FirebaseHelper.onSendNotifications(
                    this.props.route.params.item.userFcmToken,
                    "Job Accepted",
                    `${this.state.name} waiting for job Acceptance`,
                    () => {
                        let object = {
                            createdAt: new Date(),
                            message: `${this.state.name} waiting for job Acceptance`,
                            title: 'Waiting for Job Confirmation',
                            receiverId: this.props.route.params.item.userId,
                        };
                        FirebaseHelper.createNotification(object).then(() => {
                            FirebaseHelper.acceptService(this.state.id, this.state.newArray1,'Waiting Job Confirmation').then(() => {
                                this.setState({loading: false},() => {
                                    this.props.navigation.navigate('ProviderJobOrder')
                                })
                            })
                        })
                    })
            })
        }
        // else if(this.props.route.params.item.bidding.length > 0){
        //     this.props.route.params.item.bidding.map((bid) => {
        //         if (bid.userId !== userId) {
        //             tempArray.push(bid)
        //         }else {
        //             let acceptObject = {
        //                 name: this.state.name,
        //                 image: this.state.image,
        //                 userId: auth().currentUser.uid,
        //                 bid: this.props.route.params.item.price,
        //                 status: 'Waiting Job Confirmation',
        //             };
        //             if(this.props.route.params.item.bidding.length > 0){
        //                 tempArray.push(acceptObject)
        //             }
        //             FirebaseHelper.acceptServiceForMultipleUsers(this.state.id, this.state.newArray1).then(() => {
        //                 this.setState({loading: false},() => {
        //                     this.props.navigation.navigate('ProviderJobOrder')
        //                 })
        //             })
        //         }
        //     })
        // }


        // let acceptObject = {
        //     name: this.state.name,
        //     image: this.state.image,
        //     userId: auth().currentUser.uid,
        //     bid: this.props.route.params.item.price,
        //     status: 'Waiting Job Confirmation',
        // };
        //     if(this.props.route.params.item.bidding.length < 1){
        //         tempArray.push(acceptObject)
        //     }

            // this.setState({newArray1: tempArray}, () => {
            //     FirebaseHelper.onSendNotifications(
            //         this.props.route.params.item.userFcmToken,
            //         "Job Accepted",
            //         `${this.state.name} waiting for job Acceptance`,
            //         () => {
            //             let object = {
            //                 createdAt: new Date(),
            //                 message: `${this.state.name} waiting for job Acceptance`,
            //                 title: 'Waiting for Job Confirmation',
            //                 receiverId: this.props.route.params.item.userId,
            //             };
            //             FirebaseHelper.createNotification(object).then(() => {
            //                 FirebaseHelper.acceptServiceForMultipleUsers(this.state.id, this.state.newArray1).then(() => {
            //                     this.setState({loading: false},() => {
            //                         this.props.navigation.navigate('ProviderJobOrder')
            //                     })
            //                 })
            //             })
            //         })
            // })
    }


    onPressDirectionView = () => {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${this.props.route.params.item.latitude},${this.props.route.params.item.longitude}`)
    }


    render() {
        return(
            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}
                <AppHeader
                    title={'Service Details'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />
                <View style={styles.upperView}>
                    <View style={styles.innerFirstUpperView}>
                        <Text style={styles.innerSubText}>Posted {this.state.createdAt} </Text>
                        <View style={styles.viewText}>
                            <View>
                                <Text style={styles.heading}>{this.state.serviceName}</Text>
                                <View style={styles.viewUser}>
                                    <View style={{flexDirection:'row'}}>
                                    <Text style={styles.textUser1}>By:</Text>
                                    <Text style={styles.textUser}>{this.state.userName}</Text>
                                    </View>
                                    { this.state.messageImage &&
                                        <Image style={styles.userImg} source={images.icn_message_black}  />
                                    }

                                </View>
                                <View style={{flexDirection:'row'}}>
                                <Text style={styles.textAvgBid}>Category: </Text>
                                <Text style={styles.textAvgBid1}>{this.state.catName} > </Text>
                                <Text style={styles.textAvgBid1}>{this.state.subCatName}</Text>
                                </View>
                                </View>

                            {this.state.showImage &&
                                <Text style={styles.textPriceBid}>${this.state.price}.00</Text>
                            }

                        </View>
                    </View>

                    <View style={styles.textView}>
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

                            {/*<View style={styles.viewTags}>*/}
                            {/*    <Text style={{color:colors.white,fontWeight:'600'}}>{this.props.route.params.item.tagWords}</Text>*/}

                            {/*</View>*/}
                            {/*<View style={styles.viewTags}>*/}
                            {/*    <Text style={{color:colors.white,fontWeight:'600'}}>Tools</Text>*/}
                            {/*</View>*/}
                        </View>
                        <Text style={{paddingTop:'3%'}}>
                            {this.props.route.params.item.description}
                        </Text>

                    </View>

                </View>

                <View style={styles.lineView} />

                <View style={styles.middleView}>
                    <View style={styles.innerMiddleUpperView}>
                        <Text style={styles.textTitleBottomMiddle}>Pick up Date/Time: </Text>
                        <Text>{this.state.date}, {this.state.time}</Text>
                        {/*<View>*/}
                        {/*    <Text style={styles.textTitleUpperMiddle}>Pickup:</Text>*/}
                        {/*    <Text>123 Hardward Dr.</Text>*/}
                        {/*    <Text>Sametown TX 78522</Text>*/}
                        {/*</View>*/}

                        {/*<View style={{paddingLeft:'10%'}}>*/}
                        {/*    <Text style={styles.textTitleUpperMiddle}>Drop Off:</Text>*/}
                        {/*    <Text>555 Dale St</Text>*/}
                        {/*    <Text>Sametown TX 78522</Text>*/}
                        {/*</View>*/}

                    </View>

                    <View style={{alignItems:'center'}}>
                        <Button
                            buttonText={this.state.subString}
                            isImagePath={images.icn_button_map}
                            height={hp(5)}
                            width={wp(92)}
                            onPress={() => this.onPressDirectionView()}
                            bgColor={colors.red_color}
                        />
                    </View>

                    {/*<View style={styles.innerMiddleBottomView}>*/}

                    {/*    <View>*/}
                    {/*        <Text style={styles.textTitleBottomMiddle}>Pick up Date/Time:</Text>*/}
                    {/*        <Text>123 Hardward Dr.</Text>*/}

                    {/*    </View>*/}

                    {/*    <View style={{paddingLeft:'9%'}}>*/}
                    {/*        <Text style={styles.textTitleBottomMiddle}>Preferred Vehicle:</Text>*/}
                    {/*        <Text>Sedan</Text>*/}

                    {/*    </View>*/}

                    {/*</View>*/}

                </View>

                <View style={styles.bottomView}>

                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            data={this.props.route.params.item.imageUrl}
                            renderItem={({item})=> this._imageList(item)}
                        />

                    </View>



                <View style={styles.viewStatus}>
                    <Text style={styles.statusHeading}>Status</Text>
                        <Text style={styles.statusText}>{this.state.statusText}</Text>
                </View>

                    <View style={styles.payoutView}>
                        <Text style={styles.payoutHeading}>{this.state.payoutDelivery}</Text>
                        <Text style={styles.payoutText}>{this.state.changeBid}</Text>
                    </View>

                {this.props.route.params.item.fromOpenBidding &&

                <View style={styles.viewBtn}>
                    <Text style={styles.textEnterBid}>Payment</Text>

                    <Button
                        height={hp(6)}
                        width={wp(90)}
                        buttonText={`$ ${this.state.price}.00`}
                        bgColor={'transparent'}
                        textColor={colors.Green_color}
                        borderWidth={1}
                        borderColor={colors.app_color}
                        // onPress={() => this.props.navigation.navigate('')}
                    />

                </View>
                }

                {this.state.button &&
                <View style={styles.viewBtnBottom}>

                    <Button
                        height={hp(6)}
                        width={wp(90)}
                        buttonText={this.state.btnTitle}
                        bgColor={this.state.btnBgColor}
                        onPress={() => this.onAccept(this.state.btnTitle)}
                    />
                </View>
                 }

                { this.state.secondButton &&
                    <View style={styles.viewBtnBottom}>

                        <Button
                            height={hp(6)}
                            width={wp(90)}
                            buttonText={'Cancel Job'}
                            bgColor={colors.dark_grey}
                            onPress={() => this.props.navigation.navigate('DriverConfirmDelivery')}
                        />
                    </View>
                }

            </View>

        );
    }
}




