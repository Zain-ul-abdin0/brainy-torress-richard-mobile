import {Platform, StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';

const styles = StyleSheet.create({
    viewStyle: {
        height:hp(100),
        width:wp(100),
        backgroundColor:'#edf1df',
        alignItems:'center'
    },
    upperView:{
        height: Platform.OS === 'ios' ? hp(15) : hp(19),
        width: wp(100),
        alignItems: 'center',
        backgroundColor: '#ffffff',
        zIndex:1,
    },
    innerUpperView:{
        flexDirection:'row',
        alignItems:'center',
        width:wp(92),
        paddingTop:'3%',
        // backgroundColor:'green'
    },
    mapStyle:{
        height: hp(75),
        width:  wp(100),
    },
    img:{
        height: hp(5),
        width: wp(5.5),
        resizeMode:'contain',
        marginLeft:'15%'
    },
    viewCollapse:{
        width:wp(96),
        flexDirection: 'row',
        justifyContent:'space-around',
        // backgroundColor:'green'


    },
    viewLine:{
        height:hp(0.1),
        width:wp(90),
        backgroundColor:'#c1c1c1',
        marginTop:hp(1.8),
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
    dropdownStyle:{
        backgroundColor: '#ffffff',
        width:wp(43),
        paddingHorizontal:'5%',
        borderWidth:1,
        borderColor: colors.app_color,
        borderRadius:5,
        paddingRight:5,
    },
    dropdownTwo:{
        backgroundColor: '#ffffff',
        width:wp(40),
        paddingHorizontal:'5%',
        borderWidth:1,
        borderColor:'#9ec600',
        // borderRadius:5
    },
    dropdownLeftOptionsStyle:{
        // backgroundColor:'green',
        marginRight:'58%',
        width:wp(42)
    },
    dropdownCenterOptionsStyle:{
        // backgroundColor:'green',
        marginRight:'60%',
        width:wp(39)
    },
    loginDropdownImages: {
        width: 18,
        height: 18,
        resizeMode: "contain",
        alignSelf: 'center',
    },
    dropdownRightOptionsStyle:{
        // backgroundColor:'green',
        marginLeft:'57%',
        width:wp(9),
        // marginTop:wp(5)
    },
    dropdownButtonText:{
        color:'#9e9e9e'
    }

});


export default styles;
