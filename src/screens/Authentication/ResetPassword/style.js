import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    mainContainer:{
        height:hp(100),
        width: wp(100),
        backgroundColor:'#fff',
        // alignItems:'center',
    },
    mainContainerInput:{
        height:hp(65),
        // backgroundColor: 'red',
        marginTop:hp(3),
        alignItems:'center',
    },
    btnView:{
        marginTop:hp(10),
        alignItems:'center',
    },
    viewTextBtn:{
        height:hp(7),
        alignItems:'center',
        marginTop:'6%',
    },
    text:{
        width: wp(90),
        paddingLeft:wp(3),
        paddingTop:hp(1.5),
        fontFamily:'Roboto-Regular'
    }



});



export default styles;
