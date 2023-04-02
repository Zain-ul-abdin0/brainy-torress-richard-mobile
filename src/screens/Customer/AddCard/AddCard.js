//================================ React Native Imported Files ======================================//

import React from 'react';
import {Alert, View} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import AppInput from '../../../Components/AppInput';
import Dropdown from "../../../Components/ModalDropdown";
import colors from '../../../../assets/colors';
import styles from './style';
import images from '../../../../assets/images';
import FirebaseHelper from '../../../firebase/FirebaseHelper';
import AppLoading from '../../../Components/AppLoading';


export default class AddCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            id: '',
            newArray:[],
            loading:false,
        }
    }

    componentDidMount() {
        this.checkData();
    }

    checkData = () => {
        if(this.props.route.params.fromWallet === true) {
            this.setState({
                id: this.props.route.params.item.id,
            })
        }else if(this.props.route.params.fromWallet === false){

        }else if(this.props.route.params.fromWalletUser === false){

        }
    }


    payoutCash = () => {
        if(this.props.route.params.fromWallet === true) {
            Alert.alert(
                "Add Card",
                "Are you sure you want to Save and Withdraw?",
                [
                    {
                        text: "No",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {text: "Yes", onPress: () => this.confirmPayout()}
                ]
            );
        }else if(this.props.route.params.fromWallet === false){
            alert('Card Added')
            this.props.navigation.navigate('HomeScreen')
        }else if(this.props.route.params.fromWalletUser === false){
            alert('Card Added')
            this.props.navigation.navigate('JobOrder')
        }
    }


    confirmPayout = () => {
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
                    status:"Payout Done"
                })
            }else{
                tempArray.push(bid)
            }
        })
        this.setState({newArray:tempArray},() => {
            // FirebaseHelper.onSendNotifications(
            //     this.props.route.params.item.userFcmToken,
            //     "Payout Done",
            //     `${this.state.name} withdraw the cash`,
            //     () => {
            //         let object = {
            //             createdAt: new Date(),
            //             message: `${this.state.name} withdraw cash`,
            //             title: 'Job Confirmation Pending',
            //             receiverId: this.props.route.params.item.userId,
            //         };
            //         FirebaseHelper.createNotification(object).then(() => {
            FirebaseHelper.acceptService(id, this.state.newArray, 'Job Completed').then(() => {
                this.setState({loading:false},() => {
                    alert("Job Closed")
                    this.props.navigation.navigate('HomeScreen')
                })
            })

            //     })
            // })
        })
    }


    render() {
        return (
            <View style={styles.viewStyle}>
                {AppLoading.renderLoading(this.state.loading)}

                <AppHeader
                    title={'Add Credit / Debit Card'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />

                <AppInput
                    placeholder={'Card Number'}
                    borderWidth={1}
                    marginTop={25}
                />
                <AppInput
                    placeholder={'Same Shown On Card'}
                    borderWidth={1}
                />


                <View style={styles.collapseView}>
                    {/*<CollapseComponent*/}
                    {/*    collapseWidth={wp(25)}*/}
                    {/*    collapseHeight={hp(5)}*/}
                    {/*    borderWidth={1}*/}
                    {/*    borderRadius={5}*/}
                    {/*    borderColor={'#9ec600'}*/}
                    {/*    textColor={'#c1c1c1'}*/}
                    {/*    paddingTop={'45%'}*/}
                    {/*    marginTop={hp(1.5)}*/}
                    {/*    title={'01'}*/}
                    {/*/>*/}

                    <Dropdown
                        dropdownStyle = {styles.dropdownStyle}
                        dropdownOptionsStyle={styles.dropdownLeftOptionsStyle}
                        buttonTextStyle={styles.dropdownButtonText}
                        defaultButtontext={'01'}
                        // renderButtonText={(rowDta) => {return (rowDta.name)}}
                        options={'dsff'}
                        // renderRow={(instance) => this.renderRowForInstance(instance)}
                        // onSelect = {(index,value) => {this.onDropSelect(value);}}
                    />

                    <Dropdown
                        dropdownStyle = {styles.dropdownStyle}
                        dropdownOptionsStyle={styles.dropdownRightOptionsStyle}
                        buttonTextStyle={styles.dropdownButtonText}
                        defaultButtontext={'2001'}
                        // renderButtonText={(rowDta) => {return (rowDta.name)}}
                        options={'dsff'}
                        // renderRow={(instance) => this.renderRowForInstance(instance)}
                        // onSelect = {(index,value) => {this.onDropSelect(value);}}
                    />

                    {/*<CollapseComponent*/}
                    {/*    collapseWidth={wp(25)}*/}
                    {/*    collapseHeight={hp(5)}*/}
                    {/*    borderWidth={1}*/}
                    {/*    borderRadius={5}*/}
                    {/*    paddingTop={'45%'}*/}
                    {/*    borderColor={'#9ec600'}*/}
                    {/*    textColor={'#c1c1c1'}*/}
                    {/*    marginTop={hp(1.5)}*/}
                    {/*    title={'2001'}*/}
                    {/*/>*/}

                    <AppInput
                        placeholder={'CCV'}
                        borderWidth={1}
                        width={wp(20)}
                        height={45}
                    />

                </View>


                <View style={styles.btnView}>

                    <Button
                        height={hp(5)}
                        width={wp(90)}
                        buttonText={'Save Card'}
                        bgColor={colors.app_color}
                        onPress={() => this.payoutCash()}
                        // onPress={() => this.props.navigation.navigate('MyWallet')}
                    />
                </View>


            </View>

        );
    }
}

