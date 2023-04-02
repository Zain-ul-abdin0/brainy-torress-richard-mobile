import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';


const styles = StyleSheet.create({

    mainContainer:{
        // flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'grey'
    },
    container:{
        backgroundColor: '#ffffff',
        height:hp(30),
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
    middleView:{
        // backgroundColor: 'purple',
        height:'40%',
        width:'100%',
        flexDirection:'row',
    },
    bottomView:{
        height:'25%',
        alignItems:'center',
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
        // backgroundColor:'gold',
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
        height:'0.5%',
        width:'100%',
        backgroundColor:colors.greyTabs,
    },
    textBid:{
        fontSize:hp(1.7)
    },
    textPrice:{
        fontSize:hp(2.5),
        fontWeight:'bold',
        textAlign:'center',
        paddingTop:'3%'
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
        height:hp(5),
        width:hp(5),
        borderRadius:hp(5),
        resizeMode:'cover',
    },
    viewStatus: {
        // backgroundColor:'green',
        height:'100%',
        width:'50%',
        // justifyContent:'center',
        paddingTop:'6%',
        alignItems:'center',
    },





});

export default styles;
