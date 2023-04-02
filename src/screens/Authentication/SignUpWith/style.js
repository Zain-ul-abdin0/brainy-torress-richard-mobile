import {StyleSheet,Platform} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';

const styles = StyleSheet.create({
    mainContainer: {
        height: hp(100),
        width:wp(100),
        backgroundColor: colors.app_color,
    },
    upperContainer: {
        height: hp(30),
         backgroundColor: colors.app_color,
        alignItems:'center',
        justifyContent:'center'
    },

    imgBackground:{
        height: Platform.OS === 'ios' ? hp(34) : hp(31),
        width:wp(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        height: hp(70),
        alignItems: 'center',
        backgroundColor: colors.app_color,
    },
    title:{
        fontSize:wp(4.5),
        // fontWeight:'bold',
        paddingVertical:'5%',
        color:colors.white,
        fontFamily:'Roboto-Bold'
    },
    viewOr:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:wp(85),
        marginVertical:hp(3),
    },
    lineView:{
        height:hp(0.1),
        width:wp(35),
        backgroundColor:colors.grey,
    }
});


export default styles;
