import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({

    mainContainer:{

    },

    image:{
        height:hp(8),
        width: wp(20),
        resizeMode:"cover",
        marginHorizontal:wp(1),
        marginTop:3,
        overflow:'hidden',
        // backgroundColor:'red'

    }


});

export default styles;
