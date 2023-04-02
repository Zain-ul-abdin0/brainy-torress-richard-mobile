import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles = StyleSheet.create({

    mainContainer:{
        height:hp(100),
        width:wp(100),
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:'#ffffff'
    },
    upperView:{
        alignItems:'center',
        paddingTop:hp(1),

    },
    imgUpperView:{
        height: hp(15),
        width: hp(15),
        borderRadius:hp(10),
        resizeMode:'cover',
    },

});


export default styles;
