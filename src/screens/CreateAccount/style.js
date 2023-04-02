import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles= StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor: '#FFFFFF',
        // alignItems:'center',

    },
    imgView: {
        justifyContent: "center",
        alignItems:'center',
        marginTop:5
    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(2.5),
        marginTop: hp(4),
    },
    btnView:{
        marginTop: hp(25),
        alignItems: 'center',
    },
    input:{
        height:hp(5),
        borderBottomWidth:0.3,
        width:wp(92),
        borderColor:'grey',
        marginTop:hp(1),
    },
    viewInput:{
        marginTop: hp(3),
        alignItems: 'center',
    }





});


export default styles;
