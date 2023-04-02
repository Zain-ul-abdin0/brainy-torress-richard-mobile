import {Platform, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';


const styles = StyleSheet.create({

    mainContainer:{
        height:hp(100),
        width:wp(100),
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:'#ffffff'
    },
    upperView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:wp(4),
        marginTop:hp(2)
    },
    imgUpperView:{
        height: hp(13),
        width: hp(13),
        borderRadius: hp(13),
        resizeMode:'cover',
    },
    titleUpperView:{
        fontSize:hp(1.8),
        textAlign:'center'
    },
    numberTextUpperView:{
        fontSize:hp(3),
        fontWeight:'bold',
        textAlign:'center',
    },
    bottomView:{
        alignItems:'center'
    },
    starView:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:'4%'
    },
    imgStar:{
        height: hp(3),
        width: wp(3),
        resizeMode:'contain',
        paddingHorizontal: '4%'
    },
    textBottom:{
        fontSize:hp(1.8),
        paddingTop: '7%',
    },
    text:{
        fontSize:hp(1.8),
        paddingTop:'0.5%'
    },
    viewFlat:{
        height:hp(25),
        width:wp(92),
        marginTop:hp(3),
        borderWidth:1,
        borderColor:colors.app_color,
        borderRadius:hp(0.7)
    },
    textBottomHeading:{
        fontSize:hp(3.5),
        fontWeight: 'bold',
        color:colors.green_color,
        paddingVertical:Platform.OS === 'ios' ? "6%" : '3%',
    },
    textDetailBottom:{
        textAlign:'center',
        paddingHorizontal:'7%',
        paddingBottom:Platform.OS === 'ios' ? "7%" : '3%',
    }




});




export default styles;
