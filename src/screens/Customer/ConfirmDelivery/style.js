import {StyleSheet} from 'react-native';
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
        alignItems:'center',
        marginTop:hp(3)
    },
    imgUpperView:{
        height: hp(18),
        width: hp(18),
        borderRadius: hp(18),
        resizeMode:'cover',
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
    starViewBottom:{
        flexDirection:'row',
        alignItems:'center',
    },
    textDetail:{
        fontSize:hp(1.7),
        textAlign:'center',
        paddingHorizontal:'6%',
        paddingBottom:"7%",
        paddingTop:'10%',
        fontStyle:'italic'
    },
    line:{
        height:hp(0.1),
        width:wp(90),
        backgroundColor:colors.greyTabs,
        marginVertical:hp(3),
    },
    btnView:{
        marginTop:hp(5),
    },
    bottomViewText:{
        height:hp(20),
        width:wp(90),
        borderWidth:1,
        borderColor:colors.app_color,
        borderRadius:hp(0.7),
        paddingTop:'3%',
        paddingLeft:'3%',
        marginTop:hp(3)
    }






});


export default styles;
