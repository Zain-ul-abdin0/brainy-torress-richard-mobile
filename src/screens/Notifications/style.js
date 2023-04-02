import {StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    main: {
        height:hp(100),
        width:wp(100),
        backgroundColor:'#ffffff',
    },
    viewFlat:{
        alignItems:'center',
        marginBottom:hp(5),
    }



});


export default styles;
