import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,FlatList,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from "../../../assets/images";
import styles from "./style";
import AppHeader from '../../Components/AppHeader';
import Button from '../../Components/Button/Button';
import colors from '../../../assets/colors';


export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return(
            <View style={styles.mainContainer}>

                <AppHeader
                    title={'About the App'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />

                <ImageBackground style={styles.imgView}
                                 resizeMode={'cover'}
                                 source={images.splash}
                >
                    <Image style={styles.logo} source={images.logo} />
                </ImageBackground>

                <View style={styles.bottomView}>
                    <View style={styles.textView}>
                        <Text style={styles.text}>Version 1.00</Text>
                        <Text style={styles.textInc}>Copyright 2019 - Now.com</Text>
                        <Text style={styles.textInc}>Developer Name inc.</Text>
                    </View>
                    <View style={styles.btnView}>


                        <Button
                            height={hp(4)}
                            width={wp(65)}
                            buttonText={'Contact Us'}
                            // onPress={() => this.props.navigation.navigate('')}
                            bgColor={'#43464B'}
                            textColor={colors.white}
                        />

                    </View>

                    <View style={styles.textBtn}>
                        <Button
                            height={hp(2)}
                            buttonText={'Close'}
                            // onPress={() => this.props.navigation.navigate('')}
                            bgColor={'transparent'}
                            fontSize={15}
                            decorationLine={'underline'}
                            textColor={colors.black}
                        />
                    </View>

                </View>







            </View>

        );
    }
}

