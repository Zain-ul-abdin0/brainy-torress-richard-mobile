import {Platform, StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const styles = StyleSheet.create({
    viewStyle: {
        height:hp(100),
        width:wp(100),
        alignItems: 'center',
        backgroundColor:'#edf1df',

    },
    btnView:{
        // backgroundColor:'green',
        marginBottom:Platform.OS === 'ios' ? hp(4) : hp(6),
    },
    upperBtnView:{
        marginBottom:hp(1.5),
    }


});

export default styles;
