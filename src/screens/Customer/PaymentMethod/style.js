import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';


const styles = StyleSheet.create({

    mainContainer:{
        height:hp(100),
        width:wp(100),
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:'#ffffff',
        paddingBottom:20
    },
    upperView:{
        // backgroundColor:'red'

    },
    upperViewText:{
        fontSize:wp(4.8),
        // fontWeight:'bold',
        paddingHorizontal:wp(8),
        marginTop: hp(3),
        fontFamily:'Roboto-Bold'

    },
    viewMaster:{
        flexDirection: "row",
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:wp(4),
        paddingTop:'2.5%',
        paddingBottom: '8%',
    },
    viewVisa:{
        flexDirection: "row",
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:wp(4),
        paddingTop:'2%',
        paddingBottom: '8%',
    },
    headingCard:{
        fontSize:hp(2),
        fontWeight:'bold'
    },
    subTextCard:{
        fontSize:hp(1.7),
        fontWeight:'bold',
    },
    imgUpperView:{
        height: hp(15),
        width: wp(25),
        resizeMode:'contain',
    },
    image:{
        height:hp(7),
        width:wp(14),
        resizeMode:'contain',
    },
    titleUpperView:{
        fontSize:hp(1.8),
        textAlign:'center'
    },
    numberTextUpperView:{
        fontSize:hp(3),
        fontWeight:'bold',
        textAlign:'center',
    },
    bottomView:{
        alignItems:'center'
    },
    starView:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:'4%'
    },
    imgStar:{
        height: hp(3),
        width: wp(3),
        resizeMode:'contain',
        paddingHorizontal: '4%'
    },
    textBottom:{
        fontSize:hp(1.8),
        paddingTop: '7%',
    },
    text:{
        fontSize:hp(1.8),
        paddingTop:'0.5%'
    },
    viewFlat:{
        height:hp(25),
        width:wp(92),
        marginTop:hp(3),
        borderWidth:1,
        borderColor:'#9ec600',
        borderRadius:hp(0.7)
    },
    textBottomHeading:{
        fontSize:hp(3.5),
        fontWeight: 'bold',
        paddingVertical:'6%',
    },
    textDetailBottom:{
        textAlign:'center',
        paddingHorizontal:'7%',
        paddingBottom:"7%",
        paddingTop:'6%',
        fontFamily:'Roboto-Regular'
    },
    viewTotalPrice:{
        // flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:hp(15),
        width:wp(90),
        borderWidth: 1,
        borderColor: colors.app_color,
        borderRadius: hp(0.5),
        marginBottom:hp(1),
        // backgroundColor:'red'
    },
    imgViewBottom:{
        flexDirection: 'row',
        alignItems:'center',
        paddingHorizontal:wp(10.2),
        marginTop: hp(3),
        marginBottom:hp(2.7)
    },
    viewCard:{
        flexDirection: "row",
        alignItems:'center',
    },
    img:{
        height:hp(5),
        width:wp(10),
        resizeMode:'contain',
    },
    viewLine:{
        alignItems:'center'
    },
    line:{
        height:hp(0.1),
        width:wp(88),
        backgroundColor:'#000',
    },
    viewLast:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:wp(90),
        marginTop: hp(1),
        height:hp(7),paddingBottom:20
    },
    textLastView:{
        fontSize:wp(4.5),
        // fontWeight:'bold',
        color:colors.Green_color,
        fontFamily:'Roboto-bold'

    },
    textTotal:{
        fontSize:wp(4.3),
        // fontWeight:'bold',
        fontFamily:'Roboto-Medium'
    },
    totalHeading:{
        fontSize:wp(7),
        // fontWeight:'bold',
        paddingLeft:'5%',
        color:colors.Green_color,
        fontFamily:'Roboto-Bold'
    },
    processingFeeView:{
        height:'50%',
        width:'100%',
        justifyContent:'space-around',
        // backgroundColor:'orange',
        borderBottomWidth:0.7,
        borderColor:colors.greyTabs,
        paddingVertical: '1.5%'
    },
    innerViewProcessingFee:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:'4%'
    },
    totalPriceView:{
        height:'50%',
        width:'100%',
        // backgroundColor:'pink',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    processingFeeText:{
        fontSize:wp(4.5),
        // fontWeight:'bold',
        color:colors.Green_color,
        fontFamily:'Roboto-Bold'
    },
    processingText:{
        fontSize:wp(3.6),
        // fontWeight:'500',
        fontFamily:'Roboto-Medium'
        // color:colors.green_color
    },




});


export default styles;
