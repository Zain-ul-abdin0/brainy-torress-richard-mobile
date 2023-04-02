import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';

const styles = StyleSheet.create({

    mainContainer:{
        // flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'#ffffff'
    },
    container:{
        height:hp(9),
        width:wp(90),
        backgroundColor: '#ffffff',
        flexDirection:'row',
        justifyContent: 'space-between',
        borderBottomWidth:1,
        borderColor:colors.greyTabs,
    },
    innerView:{
        flexDirection:'row',
        alignItems: 'center'
    },
    imgLeft:{
        height:hp(6),
        width:hp(6),
        borderRadius:hp(6),
        resizeMode:'cover'
    },
    imgRight:{
        height:hp(5),
        width:wp(7),
        resizeMode:'contain',
        tintColor:colors.app_color
    },
    textRight:{
        paddingRight:'4%',
        fontSize:hp(1.9),
        fontWeight:'bold',
        color:colors.Green_color
    }


});

export default styles;
