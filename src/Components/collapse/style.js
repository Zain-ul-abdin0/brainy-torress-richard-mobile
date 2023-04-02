import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles= StyleSheet.create({
    container:{
        // marginTop:hp(20),
        // alignItems:'center',
        // justifyContent:'center',
        // backgroundColor:'#ffffff',
        // position: 'absolute',
        // zIndex:1,


    },
    containerTouchable: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        height: hp(6),
        // width:wp(100),
        // marginStart:wp(3),
        // marginBottom:hp(2),
    },

    text: {
        fontSize:14,
        // fontWeight:'700',
        textAlign:'center',
        color:'#000000',

    },
    viewTitle:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        height:'100%',
        width: '100%',
        // backgroundColor: 'green',

    },
    collapseBody:{
        alignItems:'center',
        position:'absolute',
        alignSelf:'center',
        width:'100%',
        // zIndex: 1,
    },
    bodyView:{
        height:'100%',
        width:'85%',
        alignItems:'flex-start',
        backgroundColor:'#EFEFEF',
        paddingLeft:'5%',

    },
    bodyText:{
        fontSize: wp(3.3),
        lineHeight:25,
    }




});


export default styles;


