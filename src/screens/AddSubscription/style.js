import {StyleSheet} from "react-native";
import colors from '../../../assets/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor:colors.white
    },
    headerView:{
        flex:0.1,
    },
    subscribeView: {
        flex:0.9
    },
    emailView:{
        flex:0.2,
    },
    emailText:{
        fontSize:15,
        fontWeight:'bold',
        paddingLeft:30,
        paddingTop:10
    },
    emailTextInput:{
        borderWidth: 0.5,
        height: hp(7),
        width: wp(85),
        alignSelf: 'center',
        paddingLeft:10,
        marginTop:5
    },
    addSubscribe:{
        flex:0.9
    },

})

export default styles;
