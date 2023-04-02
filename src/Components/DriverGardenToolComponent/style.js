import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';


const styles = StyleSheet.create({

    mainContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'grey'
    },
    container:{
        backgroundColor: '#ffffff',
        height:Platform.OS === 'ios' ? hp(30):hp(33),
        width:wp(92),
        borderRadius:hp(0.5),
        marginTop:hp(2.5),
        borderWidth:1,
        borderColor:colors.white_dark,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

    },
    upperView:{
        // backgroundColor: 'pink',
        height:'35%',
        justifyContent:'space-around',
        width:'100%',
    },
    textMiddleView:{
        // backgroundColor: 'purple',
        height:'37%',
        width:'100%',
        // flexDirection:'row',
    },
    imageMiddleView:{
        // backgroundColor: 'purple',
        height:'40%',
        width:'100%',
        // flexDirection:'row',
    },
    textBottomView:{
        height:'25%',
        alignItems:'center',
        // backgroundColor:'green',
        // justifyContent:'center',
    },
    imageBottomView:{
        height:'25%',
        alignItems:'center',
        // backgroundColor:'green',
        // justifyContent:'center',
    },
    textView:{
        // backgroundColor:'gold',
        height:'100%',
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
    },
    imageView: {
        // // backgroundColor:'gold',
        height:'100%',
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
    },
    heading:{
        fontSize:wp(6),
        // fontWeight:'bold',
        textAlign:'center',
        fontFamily:'Roboto-Bold'
    },
    description:{
        textAlign:'center',
        fontSize:wp(4),
        paddingBottom:'2%',
        fontFamily:'Roboto-Regular'
    },
    lineView:{
        height:wp(0.2),
        width:'100%',
        backgroundColor:colors.grey,
    },
    textTime:{
        fontSize:wp(4.3),
        // fontWeight: 'bold'
        fontFamily:'Roboto-Bold'
    },
    viewInnerTextView:{
        flexDirection: 'row',
        alignItems:'center'
    },
    imgInnerTextView:{
        height:hp(5),
        width:hp(5),
        borderRadius: hp(5),
        resizeMode:'cover',
    },
    bottomViewInnerTextView:{
        height:'100%',
        width:'40%',
        paddingTop:'6%',
        // backgroundColor:'red',
        alignItems:'center'
    },
    textAvgBid: {
        fontSize:hp(1.8),
        fontWeight: 'bold',
    },
    textBid:{
        fontSize:hp(1.8),
        fontWeight: 'bold',
        paddingTop:'4%',
        color:colors.Green_color
    },
    textStatus:{
        fontSize:wp(3.7),
        // fontWeight: 'bold',
        marginVertical:'2%',
        textAlign:'center',
        fontFamily:'Roboto-Bold'
    },
    innerTextStatus:{
        fontSize:wp(3.9),
        color:colors.red_color,
        fontFamily:'Roboto-Medium'
    },
    imgViewInnerView:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
    },
    viewType:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:'30%',
    },
    textType:{
        paddingRight:'6%',
        fontSize:hp(1.7),
    },
    msgImage:{
        height:hp(3),
        width:wp(5),
        resizeMode:'contain',
    },
    viewImg:{
        flexDirection:'row',
        alignItems:'center'
    },
    img:{
        height:hp(5),
        width:hp(5),
        borderRadius:hp(5),
        resizeMode:'cover',
    },
    textPrice:{
        fontSize:hp(1.7),
        fontWeight:'bold',
        color:colors.Green_color
    },
    viewImgStatus:{
        height:'100%',
        width:'50%',
        paddingTop:'6%',
        alignItems:'center',
    },



});

export default styles;
