import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({

    mainContainer:{
        // flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'#ffffff'
        marginTop:hp(1.5),

    },
    container:{
        height:hp(13),
        width:wp(90),
        backgroundColor: '#ffffff',
        borderWidth:1,
        borderColor:'#CBE100',
        borderRadius:5,
    },
    imgUpper:{
        height: hp(3.5),
        width: wp(7),
        resizeMode:'contain',

    },
    imgMiddle:{
        height: hp(4),
        width: wp(3.5),
        resizeMode:'contain',
    },
    innerUpperView: {
        flexDirection: 'row',
        paddingTop:'1.5%',
        justifyContent: 'space-around',
    },
    innerMiddleView:{
        flexDirection: 'row',
        alignItems:'center',
        paddingTop:'0.5%',
        paddingLeft:'3%',
    },
    innerBottomView:{
        flexDirection:'row',
        justifyContent: 'space-around',
        // backgroundColor:'grey',
    },
    text:{
        color:'#c6c6c6',
        paddingLeft:'2.7%',
    },
    dropdownStyle:{
        backgroundColor: '#ffffff',
        height:hp(2.5),
        width:wp(30),
        paddingHorizontal:'5%',
        borderWidth:1,
        borderColor:'#9ec600',
        borderRadius:5,
        paddingRight:5,
    },
    dropdownMiddle:{
        backgroundColor: '#ffffff',
        height:hp(2.5),
        width:wp(25),
        paddingHorizontal:'5%',
        borderWidth:1,
        borderColor:'#9ec600',
        borderRadius:5,
    },
    dropdownRight:{
        backgroundColor: '#ffffff',
        height:hp(2.5),
        width:wp(20),
        paddingHorizontal:'5%',
        borderWidth:1,
        borderColor:'#9ec600',
        borderRadius:5,
    },
    dropdownLeftOptionsStyle:{
        // backgroundColor:'green',
        marginRight:'70%',
        width:wp(30)
    },
    dropdownCenterOptionsStyle:{
        // backgroundColor:'green',
        marginRight:'75%',
        width:wp(25)
    },
    dropdownRightOptionsStyle:{
        // backgroundColor:'green',
        marginLeft:'80%',
        width:wp(10)
    },
    dropdownButtonText:{
        color:'#c6c6c6'
    }


});


export default styles;
