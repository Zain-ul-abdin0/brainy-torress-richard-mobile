import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView, ImageBackground,Modal} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TextButton from '../../../Components/TextButton';
import images from "../../../../assets/images";
import InputComponent from '../../../Components/InputComponent';
import CheckBox from '../../../Components/CheckBox';
import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import styles from './Style'
import AppInput from '../../../Components/AppInput';

export default class EnterNewPassword extends React.Component
{
        render() {
            return(

                <View style={styles.mainContainer}>


                    <AppHeader
                        title={'Enter New Password'}
                        leftIconPath={images.ic_back}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />


                    <View style={styles.mainContainerInput}>

                        <AppInput
                            placeholder={'Johan'}
                            borderWidth={1}
                        />

                        <AppInput
                            placeholder={'Smith'}
                            borderWidth={1}
                        />
                        <AppInput
                            placeholder={'johansmith@email.com'}
                            borderWidth={1}
                        />

                        <AppInput
                            placeholder={'Enter New Password'}
                            borderWidth={1}
                        />



                    </View>
                    <View style={styles.StrengthView}>
                        <Text style={{fontStyle:'italic'}}>Password Strength:</Text>
                        <Text style={styles.medianText}>Median</Text>
                    </View>

                    <View style={styles.mainContainerInput}>

                        <AppInput
                            placeholder={'Re-enter new Password'}
                            borderWidth={1}
                        />

                    </View>

                    <View style={{paddingTop:hp(2.5,),paddingLeft:wp(8),marginLeft:5}}>
                        <CheckBox
                            checkTitle={'Password Strength'}
                        />
                    </View>



                    <View
                        style={styles.btnView}
                    >

                        <Button
                            buttonText={'Reset Password'}
                            onPress={() => this.props.navigation.navigate('Login')}
                        />

                    </View>



                    </View>




            )
        }
}
