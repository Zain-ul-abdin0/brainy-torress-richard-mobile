import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView, ImageBackground,Modal} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from "../../../../assets/images";
import InputComponent from '../../../Components/InputComponent';
import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import styles from './style';
import AppInput from '../../../Components/AppInput';


export default class ResetPassword extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            showAlert: false,
        }
    };

    accept(){
        this.togglePrivacyAlertModal();
        this.props.navigation.navigate('EnterNewPassword')
    }

    togglePrivacyAlertModal = () => {
        this.setState({ showAlert: !this.state.showAlert });
    };


    renderPrivacyAlert() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0, 0, 0, 0.5)",}}>
                <View style={{
                    width: wp('60%'),
                    height: hp('20%'),
                    backgroundColor: '#fff',
                    borderColor:'#fff',
                    borderWidth: 1,
                    borderRadius: 5,
                }}>

                    <Text style={{fontSize: wp(3.5),fontWeight:'bold',textAlign: 'center',marginTop:hp(2),}}>Email Sent!</Text>
                    <View style={{flex: 2, justifyContent: 'center', alignItems: 'center',paddingLeft:wp(5),width: wp(55)}}>
                        <Text style={{fontSize:wp(3.2),textAlign:'center', fontWeight:'bold',marginTop:wp('0%'),color:'#030303'}}>We have sent a reset password link to your email.</Text>
                    </View>

                    {/*Buttons*/}
                    <View
                        style={{flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{marginLeft: wp('2%')}}>

                            <TouchableOpacity  onPress={()=>this.accept()} style={{
                                width: wp(55), height: hp('7%'),
                                backgroundColor: '#fff',
                                borderRadius: 5,
                                justifyContent: 'center', alignItems: 'center',
                                borderColor: '#d0d0d0',
                                borderTopWidth: 1,
                            }}>
                                <Text style={{color: '#218bfd', fontSize: wp(3.5),fontWeight:'bold',}}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    render() {
        return (


            <View style={styles.mainContainer}>

                <AppHeader
                    onLeftIconPress={() => this.props.navigation.goBack()}
                    title={'Reset Passwords'}
                    leftIconPath={images.ic_back}
                />



                <View style={styles.mainContainerInput}>

                    <AppInput
                        placeholder={'Enter Email'}
                        borderWidth={1}
                    />
                    <Text  style={styles.text}>Input the Email used to create your account. We will send you a link to reset your password.</Text>

                </View>



                <Modal
                    visible={this.state.showAlert}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={this.togglePrivacyAlertModal}
                >
                    {this.renderPrivacyAlert()}
                </Modal>

                <View style={styles.btnView}>

                    <Button
                        buttonText={'Reset Password'}
                        onPress={this.togglePrivacyAlertModal}
                    />

                </View>

            </View>


        );
    }
}




