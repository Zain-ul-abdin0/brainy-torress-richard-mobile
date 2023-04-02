import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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
    },
    imgUpperView:{
        height: hp(15),
        width: wp(25),
        resizeMode:'contain',
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
    }




});


export default styles;
