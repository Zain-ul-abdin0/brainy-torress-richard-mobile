import {StyleSheet,Platform} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from "../../../../assets/colors";


const styles = StyleSheet.create({
    viewStyle: {
        height: hp(100),
        width: wp(100),
        backgroundColor:'#ffffff',
        alignItems: 'center',
    },
    inputView:{
        marginTop:hp(2),marginBottom:hp(-19)
    },
    touchable:{
        height: hp(6),
        width: wp(90),
        borderWidth:1,
        borderColor:colors.app_color,
        justifyContent:'center',
        paddingLeft:'3%',
        flexDirection:'row',

        borderRadius:hp(0.5),
        marginTop: hp(1),
    },
    touchable2:{
        height: hp(6),
        width: wp(90),
        borderWidth:1,
        borderColor:colors.app_color,
       justifyContent:'space-between',
        paddingLeft:'3%',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:hp(0.5),
        marginTop: hp(1),
    },
    touchable1:{
        height: hp(6),
        width: wp(90),
        borderWidth:1,
        borderColor:colors.app_color,
        paddingLeft:'3%',flexDirection:'row',
        alignItems:'center',

        borderRadius:hp(0.5),
        marginTop: hp(1),
        justifyContent:'space-between'
    },
    touchableImage:{
        flexDirection:'row',
        alignItems: 'center',
        height: hp(6),
        width: wp(90),
        borderWidth:1,
        borderColor:colors.app_color,
        justifyContent:'space-between',
        paddingLeft:'3%',
        // paddingRight:'1%',
        borderRadius:hp(0.5),
        marginTop: hp(1),
    },
    icon:{
        height:'100%',
        width:'100%',
        resizeMode:'contain',
        // tintColor:colors.w
        // marginRight:'1%'
    },
    textBtn:{
        height:hp(4.5),
        width:wp(12),
        backgroundColor: colors.white,
        alignItems:'center',
        justifyContent:'center',
        // marginRight: '1%',
        borderRadius:5
    },
    dropdownStyle:{
        backgroundColor: '#ffffff',
        height:hp(6),
        width:wp(90),
        paddingHorizontal:'1%',
        borderWidth:1,
        borderColor:colors.app_color,
        borderRadius:5
    },
    dropdownLeftOptionsStyle:{
        // backgroundColor:'green',
        marginRight:'19%',
        width:wp(78)
    },
    dropdownButtonText:{
        color:colors.placeholder_text_color,
    },
    scroll:{
        paddingBottom:'50%'
    },
    btnStyle:{
        height: hp(6),
        width: wp(90),
        backgroundColor:colors.app_color,
        borderRadius:5,
        marginTop:10,
    },
    imageSelected: {
        marginTop: wp(1),
        paddingTop:wp(4),
        height: hp(14),
        width: wp(85),
        // alignSelf: 'center',
    },


});



export default styles;
