import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';

const styles = StyleSheet.create({
    viewStyle: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red'
        backgroundColor:colors.app_color
    },

    logo: {
        height: hp(80),
        width:wp(80),
        resizeMode:'contain',
    },

});

export default styles;
