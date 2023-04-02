import {StyleSheet,Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';

const styles = StyleSheet.create({

    mainContainer:{
        height:hp(100),
        width:wp(100),
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:'#ffffff',flex:1

    },
    upperView:{
        height: Platform.OS=== 'ios' ? hp(22):hp(24),
        paddingHorizontal:'4%',
    },
    innerFirstUpperView:{
        height: '45%',
        // backgroundColor:'gold',
    },
    innerSecondUpperView:{
        height: '55%',
        // backgroundColor:'green',
    },
    lineView:{
        height: hp(0.1),
        backgroundColor:colors.greyTabs,
        marginBottom: Platform.OS === 'ios' ? hp(2.5) : hp(1.5),
        marginTop: Platform.OS === 'ios' ? 10 : 25,
    },
    middleView: {
        height: hp(16),
        // backgroundColor:'grey',
        paddingLeft:'4%',
    },
    innerMiddleUpperView:{
        flexDirection:'row',
        height: '60%',
        // backgroundColor:'pink',
    },
    innerMiddleBottomView:{
        flexDirection:'row',
        height: '40%',
        // backgroundColor:'pink',
    },
    textTitleUpperMiddle:{
        fontSize:wp(3.9),
        // fontWeight:'bold',
        paddingBottom:'4%',
        fontFamily:'Roboto-Bold'
    },
    textTitleUpperMiddle2:{
        fontSize:wp(3.9),
        // fontWeight:'bold',
        paddingBottom:'4%',
        paddingLeft:'2%',
        fontFamily:'Roboto-Bold'
    },
    textTitleUpperMiddle1:{
        fontSize:wp(3.9),
        // fontWeight:'bold',
        paddingBottom:'4%',
        fontFamily:'Roboto-Bold',
    },
    textTitleBottomMiddle:{
        fontSize:wp(3.9),
        // fontWeight:'bold',
        paddingBottom:'2%',
        fontFamily:'Roboto-Bold'

    },
    bottomView:{
        height: Platform.OS === 'ios' ? "15%" : '15.5%',
        paddingLeft:'4%',
        paddingTop:'1%',
        flexDirection:"row",
    },
    viewFlat:{
        alignItems:'center',
    },
    viewBtn:{
        // justifyContent:'center',
        alignItems:'center',
        marginTop:Platform.OS === 'ios' ? hp(3) :hp(0.2),

    },
    textTime:{
        fontSize:hp(1.7),
        color: colors.app_color,
        paddingTop:'3%',
        fontFamily:'Roboto-MediumItalic'
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
    viewProfile:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    heading:{
        fontSize:wp(5),
        // fontWeight:'bold',
        paddingTop:'1%',
        fontFamily:'Roboto-Bold'

    },
    viewImages:{
        flexDirection:'row',
        justifyContent:'space-between',
        // width:'14%',
    },
    img:{
        height:hp(5),
        width:wp(5),
        resizeMode:'contain',
    },
    userText:{
        fontSize:wp(3.5),
        paddingTop:'1%',
        fontFamily:'Roboto-MediumItalic'
    },
    userText1:{
        fontSize:wp(3.5),
        paddingTop:'1%',
        fontFamily:'Roboto-MediumItalic',
        color: colors.grey
    },
    viewText:{
        // flexDirection:'row',
        // alignItems:'center',
        // backgroundColor:'red'
    },
    image:{
        height:80,
        width:80,
        resizeMode:'contain',
        overflow:'hidden'
    },
    viewBidder:{
        height: hp(4.5),
        width:wp(94),
        // backgroundColor:'purple',
        paddingLeft:'4%',

    },
    textBidder:{
        fontSize:hp(2.3),
        fontWeight:'bold',
        paddingBottom:'7%',
    },
    viewLine:{
        alignItems:'center'
    },
    line:{
        height:hp(0.1),
        width:wp(90),
        backgroundColor:colors.greyTabs,
    },
    viewTags:{
        height:hp(3.3),
        width:wp(30),
        backgroundColor:colors.app_color,
        borderRadius:wp(4),
        alignItems:'center',
        justifyContent:'center',
        marginLeft:7,

    },
    mainViewTags:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:'2%',
        marginTop:Platform.OS === 'ios' ? 24:40
    },
    textPriceBid:{
        fontSize:wp(5.5),
        // fontWeight:'bold',
        color:colors.Green_color,
        // paddingTop: '1%',
        fontFamily:'Roboto-Bold'

    },
    waitingServiceProviderText:{
        fontSize:wp(3.9),
        fontWeight:'bold',
        color:colors.app_color,
        textAlign:'center',
        paddingTop:'15%',
        fontFamily:'Roboto-Bold'
    }

});


export default styles;
