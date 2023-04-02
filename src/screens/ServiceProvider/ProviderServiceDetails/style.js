import {StyleSheet,Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';

const styles = StyleSheet.create({

    mainContainer:{
        height:hp(100),
        width:wp(100),
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:'#ffffff'
    },
    upperView:{
        height: Platform.OS === 'ios' ? hp(22):hp(28),
        paddingHorizontal:'4%',
    },
    innerFirstUpperView:{
        height: '45%',
        // backgroundColor:'gold',
    },
    viewText:{
        flexDirection:'row',
        paddingTop:'1%',
        justifyContent:'space-between',
    },
    heading:{
        fontSize:wp(5),
        // fontWeight:'bold',
        fontFamily:'Roboto-Bold'
    },
    innerSecondUpperView:{
        height: '55%',
        // backgroundColor:'green',
    },
    innerSubText:{
        fontSize:wp(3.7),
        color: colors.app_color,
        paddingTop:'3%',
        fontFamily:'Roboto-MediumItalic',
    },
    lineView:{
        height: hp(0.1),
        backgroundColor:colors.greyTabs,
        marginBottom: Platform.OS === 'ios' ? hp(1.8) : hp(1),
        marginTop:Platform.OS === 'ios' ? 0 : 15,
    },
    middleView: {
        height: hp(12),
        // backgroundColor:'grey',
    },
    innerMiddleUpperView:{
        flexDirection:'row',
        height: '60%',
        paddingLeft:'4%',
        // backgroundColor:'pink',
    },
    innerMiddleBottomView:{
        flexDirection:'row',
        height: '40%',
        paddingLeft:'4%',
        paddingTop:'5%',
        // backgroundColor:'green',
    },
    textTitleUpperMiddle:{
        fontSize:hp(1.7),
        fontWeight:'bold',
        paddingBottom:'7%',
    },
    textTitleBottomMiddle:{
        fontSize:wp(3.9),
        // fontWeight:'bold',
        paddingBottom:'2%',
        fontFamily:'Roboto-Bold'
    },
    bottomView:{
        height:Platform.OS === 'ios' ? "12%" : '14.5%',
        // backgroundColor:'green',
        paddingLeft:'4%',
        flexDirection:"row",
        marginTop:hp(4),
        marginBottom: hp(1),
    },
    viewFlat:{
        alignItems:'center',
    },
    viewBtn:{
        alignItems:'center',

    },
    viewBtnBottom:{
        alignItems:'center',
        marginTop:hp(1.5),
    },
    viewStatus:{
        height: hp(4.5),
        width:wp(94),
        // backgroundColor:'purple',
        paddingLeft:'4%',
    },
    statusHeading:{
        fontSize:wp(4.5),
        // fontWeight:'bold',
        paddingBottom:'2%',
        fontFamily:'Roboto-Bold'

    },
    statusText:{
        fontSize:wp(3.4),
        // fontWeight:'bold',
        color:colors.app_color,
        fontFamily:'Roboto-Bold'

    },
    payoutView:{
        height:Platform.OS === 'ios' ? hp(5) : hp(3.7),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop: Platform.OS === 'ios' ? '4%' : '6%',
        paddingLeft:'4%',
    },
    payoutHeading:{
        fontSize:hp(2),
        fontWeight:'bold',
    },
    payoutText:{
        fontWeight:'bold',
        color:'red',
        paddingRight:'5%'
    },
    textEnterBid:{
        fontSize:wp(4),
        // fontWeight:'bold',
        paddingBottom:'3%',
        paddingRight:'75%',
        fontFamily:'Roboto-Bold'
    },
    textAvgBid:{
        fontSize:wp(3.7),
        // fontWeight:'bold',
        paddingTop: '1%',
        fontFamily:'Roboto-MediumItalic'

    },
    textAvgBid1:{
        fontSize:wp(3.7),
        // fontWeight:'bold',
        paddingTop: '1%',
        fontFamily:'Roboto-MediumItalic',
        color: colors.grey

    },
    textPriceBid:{
        fontSize:wp(5.5),
        // fontWeight:'bold',
        color:colors.Green_color,
        fontFamily:'Roboto-Bold'
        // paddingTop: '1%',
    },
    viewUser:{
        flexDirection:'row'
    },
    textUser1:{
        fontSize:wp(3.5),
        paddingTop:'1%',
        paddingRight:'2%',
        fontFamily:'Roboto-MediumItalic',
    },
    textUser:{
        fontSize:wp(3.5),
        paddingTop:'1%',
        paddingRight:'2%',
        fontFamily:'Roboto-MediumItalic',
        color: colors.grey
    },
    userImg:{
        height:27,
        width:20,
        resizeMode:'contain',
        tintColor:colors.app_color
    },
    image:{
        height:80,
        width:80,
        resizeMode:'contain',
        overflow:'hidden'
    },
    textView:{
        // alignItems:'center',
        width:'80%',
        paddingTop: '6%',
        // backgroundColor:'orange'
    },
    textPrice:{
        fontSize:wp(4.5),
        fontWeight:'bold',
        paddingTop: '1%',
        color:colors.green_color,
    },
    viewTags:{
        height:hp(3.3),
        width:wp(27),
        backgroundColor:colors.app_color,
        borderRadius:wp(4),
        alignItems:'center',
        justifyContent:'center',
        marginLeft:7
    },
    mainViewTags:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:Platform.OS === 'ios' ? 4:22

    }


});


export default styles;
