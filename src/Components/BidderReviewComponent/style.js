import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({

    mainContainer:{
        // flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'#ffffff'
    },
    container:{
        height:hp(9),
        width:wp(90),
        backgroundColor: '#ffffff',
        flexDirection:'row',
        justifyContent: 'space-between',
        borderBottomWidth:1,
        borderColor:'#CBE100',
    },
    innerViewLeft:{
        flexDirection:'row',
        alignItems: 'center',
        // paddingLeft:'2.3%'
    },
    innerViewRight:{
        flexDirection:'row',
        alignItems: 'center',
        paddingLeft:'8.5%'
    },
    imgLeft:{
        height:hp(6),
        width:wp(12),
        resizeMode:'contain'
    },
    imgRight:{
        height:hp(5),
        width:wp(5),
        resizeMode:'contain',
        marginHorizontal:'2%'
    },
    textRight:{
        paddingRight:'2%',
        fontSize:hp(1.7),
        fontWeight:'bold',
    }


});


export default styles;
