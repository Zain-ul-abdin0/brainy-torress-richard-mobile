import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor:'#ffffff',
        alignItems: 'center',
    },
    mapStyle:{
        height:hp(100),
        width:wp(100),
    },

    btnView:{
        height:hp(19),
        width:wp(100),
        position:'absolute',
        bottom:0,
        alignItems: 'center',
    },



});


export default styles;
