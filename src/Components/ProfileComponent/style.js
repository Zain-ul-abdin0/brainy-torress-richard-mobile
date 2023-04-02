import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles= StyleSheet.create({
    mainContainer:{
        backgroundColor: '#ffffff',
        height:hp(10),
        width:wp(96),
        justifyContent:'center',
        borderRadius:7,
        paddingLeft:'3%',
        shadowColor:'#ffffff',
        shadowOffset:{width:0,height:1},
        shadowOpacity:1,
        marginTop:hp(1),

    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    innerView:{
        flexDirection:'row',
        alignItems:'center',
    },
    img:{
        height: hp(10),
        width: wp(15),
        resizeMode:"contain",
    },
    textTitle:{
        fontSize:hp(1.8),
        marginBottom:'6%',
    },
    textRight:{
        fontSize:hp(1.8),
        color:'orange',
        textDecorationLine:'underline',
    }



});

export default styles;
