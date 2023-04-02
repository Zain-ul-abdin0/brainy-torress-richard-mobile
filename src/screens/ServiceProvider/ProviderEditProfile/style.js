import {Platform, StyleSheet,} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';

const styles = StyleSheet.create({

    mainContainer:{
        height:hp(100),
        width:wp(100),
        backgroundColor:'#ffffff'
    },
    upperView:{
        alignItems:'center',
        paddingTop:hp(1),
        height:hp(20),
        width:wp(100),
    },
    appInputs:{
        height:Platform.OS === 'ios' ? hp(75) : hp(90),

        width:wp(100),
    },
    imgUpperView:{
        height: hp(17),
        width: hp(17),
        borderRadius: hp(17),
        resizeMode:'cover',
    },
    textShowCase:{
        fontSize:wp(3.4),
        paddingVertical:'4%',
        fontFamily:'Roboto-Bold',
        marginLeft:wp(8)
    },
    viewPhoto:{
      paddingLeft:'8%'
    },
    addButton:{
        height:hp(10),
        width:wp(22),
        borderWidth:wp(0.2),
        alignItems:'center',
        justifyContent:'center',
        borderColor:colors.app_color,
        borderRadius:wp(1),
        marginLeft:wp(8),
        marginTop:wp(2)
    },
    textButton:{
        fontSize: wp(2.9),
        color:colors.app_color,
        fontFamily:'Roboto-Medium'
    },
    btnView:{
        alignItems:'center',
        width:'90%',
        marginTop:Platform.OS === 'ios' ? hp(4) : hp(5),
        borderTopWidth:wp(0.2),
        alignSelf:'center',
        borderColor: colors.greyTabs,
    },
    textProfileDetails:{
        fontSize: wp(3.5),
        paddingTop: '5%',
        textAlign:'center',
        fontFamily:'Roboto-Regular'
    },
    imageSelected: {
        height: hp(10),
        width: wp(60),
        alignSelf: 'center',
        marginLeft:wp(4)
    },
    imageSelected1: {
        marginTop: wp(11),
        height: hp(10),
        width: wp(50),
        alignSelf: 'center',
    },

});


export default styles;
