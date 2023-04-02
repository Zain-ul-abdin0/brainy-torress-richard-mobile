import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Modal,
    Image,
    Linking,
    Alert,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SettingLink from './SettingLink';
import images from "../../../assets/images";
import AppHeader from '../../Components/AppHeader';
import {AirbnbRating} from 'react-native-ratings';
import {CommonActions} from '@react-navigation/native';
import {DrawerItem} from '@react-navigation/drawer';
import CommonDataManager from '../../common/Singleton';


export default class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
           isCustomer: CommonDataManager.getInstance().getIsCustomer(),
           // isDriver: false,
            userData: [
                {
                    id: 0,
                    title:'Edit Profile',
                    imgLeft:images.icn_edit_profile_green,
                },
                {
                    id: 1,
                    title:'Setup Payment',
                    imgLeft:images.icn_setup_payment,
                },
                {
                    id: 2,
                    title:'Rate App',
                    imgLeft:images.ic_Star2,
                },
                {
                    id: 3,
                    title:'Send Feedback',
                    imgLeft:images.ic_Send_Feedback2,
                },
                {
                    id: 4,
                    title:'About the App',
                    imgLeft:images.icn_send_feedback_green,
                },{
                    id: 8,
                    title:'Alert a Problem',
                    imgLeft:images.ic_Report2,
                },

                {
                    id:5,
                    title:'Privacy Policy',
                    imgLeft:images.icn_privacy,
                },

                {
                    id:6,
                    title:'Terms and Conditions',
                    imgLeft:images.icn_terms,
                },

                {
                    id:7,
                    title:'Logout',
                    imgLeft:images.icn_logout,
                },
            ],
            providerData: [
                {
                    id: 0,
                    title:'Active Area',
                    imgLeft:images.icn_button_map,
                },
                // {
                //     id: 1,
                //     title:'Edit Profile',
                //     imgLeft:images.icn_edit_profile_green,
                // },
                {
                    id: 2,
                    title:'My Wallet',
                    imgLeft:images.icn_setup_payment,
                },
                {
                    id: 3,
                    title:'Rate App',
                    imgLeft:images.icn_rate_app,
                },
                {
                    id: 4,
                    title:'Send Feedback',
                    imgLeft:images.icn_send_feedback,
                },
                {
                    id: 5,
                    title:'About the App',
                    imgLeft:images.icn_send_feedback_green,
                },
                {
                    id:6,
                    title:'Privacy Policy',
                    imgLeft:images.icn_privacy,
                },

                {
                    id:7,
                    title:'Terms and Conditions',
                    imgLeft:images.icn_terms,
                },

                {
                    id:8,
                    title:'Logout',
                    imgLeft:images.icn_logout,
                },
            ]
        }
    }

    onNavigate (id){
        console.log("Id-->",id);

        if(id===0){
            if(this.state.isCustomer === false){
                // this.props.navigation.navigate('')
            }
            else {
                this.props.navigation.navigate('MyProfile')
            }


        } else if(id===1){

            if(this.state.isCustomer === false){
                // this.props.navigation.navigate('ProviderEditProfile')
            }
            else {
                this.props.navigation.navigate('SetupPayment')
            }
        }
        else if (id===2) {
            if(this.state.isCustomer === false){
                this.props.navigation.navigate('MyWallet',{
                    fromHome:false
                })
            }
            else {
                // this.togglePrivacyAlertModal()

                if (Platform.OS === "ios") {
                    Linking.openURL("https://www.apple.com/app-store/");
                } else {
                    Linking.openURL("https://www.playstore.com");
                }
            }
        }
        else if (id===3) {
            if(this.state.isCustomer === false){

                if (Platform.OS === "ios") {
                    Linking.openURL("https://www.apple.com/app-store/");
                } else {
                    Linking.openURL("https://www.playstore.com");
                }
                // this.togglePrivacyAlertModal();
            }
            else {
                this.props.navigation.navigate('Report')
            }
        }
        else if (id===4) {
            if(this.state.isCustomer === false){
                this.props.navigation.navigate('Report')
            }
            else {
                this.props.navigation.navigate('About')
            }
        }
        else if (id===5) {
            if(this.state.isCustomer === false){
                this.props.navigation.navigate('About')
            }
            else {
                this.props.navigation.navigate('Privacy')
            }
        }

        else if (id===6) {
            if(this.state.isCustomer === false){
                this.props.navigation.navigate('Privacy')
            }
            else {
                this.props.navigation.navigate('Terms')
            }
        }
        else if (id===7) {
            if(this.state.isCustomer === false){
                this.props.navigation.navigate('Terms')
            }
            else {
                Alert.alert(
                    'Logout',
                    'Are you sure you want to logout?',
                    [
                        {text: 'No', style: 'destructive'},
                        {
                            text: 'Yes',
                            onPress: async() => {
                                try {
                                    this.props.navigation.dispatch(
                                        CommonActions.reset({
                                            index: 0,
                                            routes: [{name: 'Login'}],
                                        }),
                                    );
                                    // })
                                } catch(error) {
                                    console.log("Error While Signing Out");
                                }
                                console.log('Done.')

                            },
                        },

                    ],
                    {cancelable: true},
                );

                // this._navigate()
            }
        }
        else if (id===8) {
            if(this.state.isCustomer === false){
                    Alert.alert(
                        'Logout',
                        'Are you sure you want to logout?',
                        [
                            {text: 'No', style: 'destructive'},
                            {
                                text: 'Yes',
                                onPress: async() => {
                                    try {
                                        this.props.navigation.dispatch(
                                            CommonActions.reset({
                                                index: 0,
                                                routes: [{name: 'Login'}],
                                            }),
                                        );
                                        // })
                                    } catch(error) {
                                        console.log("Error While Signing Out");
                                    }
                                    console.log('Done.')

                                },
                            },

                        ],
                        {cancelable: true},
                    );

                // this._navigate()
            }
            else {

            }
        }

    }

    _settingLink = item => {
        return (
            <SettingLink
                title={item.title}
                imgLeft={item.imgLeft}
                onPress={() => this.onNavigate(item.id)}

            />
        );
    };

    // _navigate ()   {
    //     const navigateAction = StackActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({routeName: 'Login'})]
    //     });
    //     this.props.navigation.dispatch(navigateAction);
    // };


    accept(){
        this.togglePrivacyAlertModal();

    }
    cancel(){
        this.setState({ showAlert: !this.state.showAlert });
    }

    togglePrivacyAlertModal = () => {
        this.setState({ showAlert: !this.state.showAlert });
    };


    renderPrivacyAlert() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0, 0, 0, 0.5)",}}>
                <View style={styles.modalContainer}>
                    <View style={styles.viewModalText}>
                        <Text style={{fontSize:hp(1.7),fontWeight:'bold'}}>Rate the App</Text>
                    </View>
                    <View style={[styles.viewRadioBtn,{height: hp(20)}]}>
                        <Text style={{textAlign: 'center',}}>if you love our app, we would appreciate if you take a couple of seconds to rate us in the app market! </Text>
                        <View style={{flexDirection: 'row',alignItems:'center',marginTop:'4%'}}>
                            {/*<Image style={{height:30,width:32}} source={images.icn_full_star} />*/}
                            {/*<Image style={{height:30,width:32}} source={images.icn_full_star} />*/}
                            {/*<Image style={{height:30,width:32}} source={images.icn_full_star} />*/}
                            {/*<Image style={{height:30,width:32}} source={images.icn_half_star} />*/}
                            {/*<Image style={{height:30,width:32}} source={images.icn_empty_star} />*/}
                            <AirbnbRating
                                count={5}
                                style={{alignItems:'center'}}
                                reviewSize={0}
                                defaultRating={5}
                                size={24}
                                isDisabled={false}
                                showRating={false}
                            />
                        </View>

                        <View style={[styles.viewModalBtn,{height: hp(2.8)}]}>
                            <TouchableOpacity style={{width:'45%',justifyContent:'center',alignItems:'center'}} onPress={()=>this.accept()}>
                                <Text style={{textAlign: 'center'}}>Rate Now</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:'45%',justifyContent:'center',alignItems:'center'}} onPress={()=>this.cancel()}>
                                <Text>Later</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                </View>

            </View>


        )
    }













    render() {
        const nav = this.props.navigation;
        return(
            <View style={styles.mainContainer}>

                <AppHeader
                    title={'Settings'}
                    leftIconPath={images.ic_menu}
                    onLeftIconPress={() => nav.openDrawer()}
                />

                    <FlatList
                        style={styles.flatView}
                        keyExtractor={item => item.id}
                        data={this.state.isCustomer ? this.state.userData : this.state.providerData }
                        // data={this.state.driverData}
                        renderItem={({item}) => this._settingLink(item)}
                    />



                <Modal
                    visible={this.state.showAlert}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={this.togglePrivacyAlertModal}
                >
                    {this.renderPrivacyAlert()}
                </Modal>


            </View>

        );
    }
}

const styles= StyleSheet.create({
    mainContainer: {
        flex: 1,
        // height: '80%',
        backgroundColor: '#fff',
        alignItems:'center',


    },
    flatView: {
        // paddingTop: hp(2),
        // marginTop: hp(2.5),
    },
    logoutBtn: {
        marginBottom: '30%',
        alignItems:'center',
    },
    modalContainer: {
        height:hp(25),
        width:wp(65),
        borderRadius:wp(3),
        backgroundColor: '#fff',
    },
    viewModalText:{
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(6),
        // backgroundColor:'green',
        borderTopLeftRadius: wp(3),
        borderTopRightRadius:wp(3),
    },
    viewRadioBtn:{
        height: hp(20),
        // backgroundColor:'orange',
        // paddingTop:hp(0),
        alignItems:'center',
    },
    viewInnerRadioBtn:{
        flexDirection:'row',
        justifyContent: 'space-between',
        // backgroundColor:'red',
        width: '80%',
        paddingTop:hp(1.5),
    },
    viewModalBtnUpper:{
        height: hp(5.5),
        // backgroundColor:'purple',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewModalBtn:{
        flexDirection:'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        height: hp(5.5),
        // backgroundColor:'blue',
        borderBottomLeftRadius: wp(3),
        borderBottomRightRadius:wp(3),
        // paddingHorizontal:'8%'
    },





});


