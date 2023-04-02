import {StyleSheet,Platform} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:colors.app_color,
    },
    backgroundImageView: {
        flex: 0.4,
        alignItems:'center',
        justifyContent:'center',
    },
    imageStyle:{
        height:'50%',
        width:'50%',
        resizeMode:"contain",
        // alignSelf:'center'
    },
    viewText:{
        flex:0.1,
        // backgroundColor: 'green'
    },
    textInfo:{
        color:colors.white,
        fontSize:wp(4.8),
        // fontWeight:'bold',
        textAlign:'center',
        fontFamily:'Roboto-Bold'

    },
    buttonView:{
        flex:0.5,
        // backgroundColor:'pink',
        alignItems:'center',
        // justifyContent:'center',

    },
    buttonStyle:{
        height: hp(6),
        width: wp(92),
        backgroundColor:colors.white,
        borderRadius:wp(1),
        alignItems:'center',
        justifyContent:'center',
        marginTop:wp(4)
    },

    textButton:{
        color:colors.app_color,
        fontSize:wp(4),
        // fontWeight:'bold'
        fontFamily:'Roboto-Bold'
    }




});



export default styles;
