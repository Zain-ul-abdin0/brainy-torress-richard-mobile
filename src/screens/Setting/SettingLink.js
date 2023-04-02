import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';

export default class SettingLink extends React.Component {

    render() {
        return(
                <View style={styles.mainContainer}>
                <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
                <View style={styles.containerLogo}>
                <Image style={styles.imgLeft} source={this.props.imgLeft} />
                <Text style={styles.text}>{this.props.title}</Text>
                </View>
                <View>
                <Image style={styles.imgRight} source={this.props.imgRight} />
                </View>
                </TouchableOpacity>
                </View>

        );
    }
}

const styles= StyleSheet.create({
    mainContainer: {
        // marginHorizontal:wp(4),
        // paddingTop:hp(1),
        borderBottomWidth:0.5,
        borderColor:colors.dark_grey,
        width:wp(92),
    },
    container: {
        // paddingHorizontal:wp(4),
        // width:wp(92),
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        height: hp(6),
        // borderRadius:wp(2),
        // borderWidth:wp(0.1),
        // marginBottom:hp(0.5),
        // paddingBottom:wp(2),
    },
    containerLogo:{
        flexDirection:'row',
        alignItems: 'center'
    },
    imgLeft: {
        height:hp(4),
        width:wp(4),
        resizeMode:'contain',
        tintColor:colors.app_color,
    },
    imgRight: {
        height:hp(3),
        width:wp(2.7),
        resizeMode:'contain',
        // tintColor:'#9ec600'
    },
    text: {
        textAlign: 'center',
        marginStart:wp(4),
        color:'#000000',
        fontFamily:'Roboto-Regular'
        // fontFamily:'System',
    }




});


