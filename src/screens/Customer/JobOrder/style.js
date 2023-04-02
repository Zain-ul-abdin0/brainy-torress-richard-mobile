import {StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    viewStyle: {
        height:hp(100),
        width:wp(100),
        backgroundColor:'#fff',
    },
    mainContainer:{
        // marginHorizontal:wp(3),
    },

    viewFlat:{
        alignItems:'center',
        paddingBottom:hp(5),

    }


});


export default styles;
