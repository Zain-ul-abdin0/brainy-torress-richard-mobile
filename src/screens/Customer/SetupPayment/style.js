import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    viewStyle: {
        height:hp(100),
        width:wp(100),
        backgroundColor:'#ffffff',
    },

    viewFlat:{
        alignItems:'center',
        paddingBottom:hp(15),

    },
    btnView:{
        alignItems: 'center',
        // backgroundColor:'green',
        marginTop:hp(36)
    }


});


export default styles;
