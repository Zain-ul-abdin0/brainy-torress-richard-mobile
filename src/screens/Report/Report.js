import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from "../../../assets/images";
import InputComponent from '../../Components/InputComponent';
import styles from './style';
import AppHeader from '../../Components/AppHeader';
import Button from '../../Components/Button/Button';
import AppInput from '../../Components/AppInput';
import colors from '../../../assets/colors';


export default class Report extends React.Component {

    render() {
        return(
            <View style={styles.mainContainer}>

                <AppHeader
                    title={'Send Feedback'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />


                <AppInput
                    placeholder={'Name'}
                    borderWidth={1}
                    marginTop={25}
                />

                <AppInput
                    placeholder={'Email Address'}
                    borderWidth={1}
                />


                <AppInput
                    placeholder={'Subject / Concern'}
                    borderWidth={1}
                />

                <AppInput
                    height={200}
                    multiline={true}
                    paddingTop={'2%'}
                    placeholder={'Message'}
                    borderWidth={1}

                />

                        <Text style={styles.text}>0/330 characters remaining</Text>


                        <View style={styles.btnView}>
                            <Button
                                height={hp(5)}
                                width={wp(90)}
                                buttonText={'Send'}
                                bgColor={colors.app_color}
                                // onPress={() => this.props.navigation.navigate('')}
                            />
                        </View>

            </View>



        );
    }
}

