import {StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';

const styles = StyleSheet.create({
    viewStyle: {
        height:hp(100),
        width:wp(100),
        backgroundColor:colors.white,
    },
    mainContainer:{
        // marginHorizontal:wp(3),

    },

    viewFlat:{
        alignItems:'center',
        paddingBottom:hp(5),

    },
    innerUpperView:{
        flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center',
        alignSelf:'center',
        width:wp(92),
        paddingTop:'3%',
        // backgroundColor:'green'
    },
    dropdownCategory:{
        height:42,
        backgroundColor: '#ffffff',
        width:wp(82),
        paddingHorizontal:'5%',
        borderWidth:1,
        borderColor:colors.app_color,
        borderRadius:5,
        paddingRight:5,

    },
    dropdownCategoryOptionsStyle:{
        // backgroundColor:'green',
        marginRight:'18%',
        width:wp(82)
    },
    img:{
        height: hp(5),
        width: wp(6.5),
        resizeMode:'contain',
        marginLeft:'15%',
        tintColor:colors.app_color
    },


});


export default styles;
