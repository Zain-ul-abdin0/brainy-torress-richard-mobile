import {Platform, StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles= StyleSheet.create({
    mainContainer: {
        height:hp(100),
        width:wp(100),
        backgroundColor: '#FFFFFF',
        alignItems:'center',
    },
    logo: {
        resizeMode:'contain',
        height: hp(43),
        width:wp(90),
        // backgroundColor: 'green'
    },
    text: {
        textAlign: 'center',
        // marginStart:wp(2),
        width: wp(80),
        fontSize:wp(3.5),
        // fontFamily:'Montserrat-Bold',
        marginBottom:hp(0.3),
        // backgroundColor: 'green',
        marginTop:hp(2)
    },
    textView: {
        justifyContent: "center",
        alignItems:'center',
        // backgroundColor: 'green'
    },

    imgView: {
        justifyContent: "center",
        alignItems:'center',
        marginTop: hp(4),
    },
    textInc:{
        fontSize:wp(3.2),
        textAlign:'center',
        marginTop:hp(0.3),
        // fontFamily:'Montserrat-Regular',
        // marginTop:'1%',
    },
    btnView:{
        alignItems:'center',
        marginTop:hp(2),
    },
    textBtn:{
        alignItems:'center',
        marginTop:hp(1.5)
},
    bottomView:{
        height:Platform.OS === 'ios' ? hp(20) : hp(22),
        alignItems:'center',
        backgroundColor: '#F3F3F3',
        width:wp(90),
    },




});


export default styles;
