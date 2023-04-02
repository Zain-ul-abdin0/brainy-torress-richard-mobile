import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';


const styles = StyleSheet.create({

    mainContainer:{
        // backgroundColor: '#F2F4F6',
        height:'32.2%',
        width:'100%',
        // justifyContent:'center',
        // paddingLeft:'3%',
        //     paddingTop:'2%'
    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:colors.greyTabs,
    },
    img:{
        height: hp(5),
        width: wp(5),
        resizeMode:"contain",
        paddingRight:'7%',
    },
    containerInnerUpperView:{
        flexDirection:'row',
        alignItems:'center',
    },
    textUpperView:{
        fontSize:hp(1.8),
        color:colors.app_color,
    },
    containerInnerBottomView:{
        flexDirection:'row',
        paddingRight:'2%',
        alignItems:'center',
    }





});

export default styles;
