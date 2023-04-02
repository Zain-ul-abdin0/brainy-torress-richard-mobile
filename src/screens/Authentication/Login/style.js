import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#fff',
    },
    mainContainerInput:{
        flex:0.8,
        alignItems:'center',
    },
    btnView:{
        flex:0.2,
        alignItems:'center',
    },
    viewTextBtn:{
        height:hp(7),
        alignItems:'center',
    },
    textBtn:{
        alignItems:'center',
        paddingTop:hp(1.5)
    },




});



export default styles;
