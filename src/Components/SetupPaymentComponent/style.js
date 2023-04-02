import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({

    mainContainer:{
        // backgroundColor: '#F2F4F6',
        height:hp(10),
        width:wp(92),
        justifyContent:'center',
        alignSelf:'center'
        // paddingLeft:'3%',
        //     paddingTop:'10%'
    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    img:{
        height: hp(5),
        width: wp(8),
        resizeMode:"contain",
        paddingRight:'7%',
    },
    containerInnerUpperView:{
        flexDirection:'row',
        alignItems:'center',
    },
    titleUpperView:{
        fontSize:hp(2),
        fontWeight:'bold',
    },
    textUpperView:{
        fontSize:hp(1.7),
    },
    containerInnerBottomView:{
        alignItems:'center',
    },
    image:{
        height: hp(5.5),
        width: hp(5.5),
        resizeMode:"contain",
    }





});

export default styles;
