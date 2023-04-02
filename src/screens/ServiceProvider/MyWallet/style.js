import {Platform, StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    viewStyle: {
        height:hp(100),
        width:wp(100),
        alignItems: 'center',
        backgroundColor:'#ffffff',
    },
    heading:{
        fontSize:hp(1.5),
        fontWeight:'bold',
        paddingTop:'7%'
    },
    subHeading:{
        fontSize:hp(3),
        fontWeight:'bold',
        paddingTop:'1%',
    },
    btnView:{
        // backgroundColor:'green',
        marginBottom:Platform.OS === 'ios' ? hp(4) : hp(7),
    },
    headingView:{
        height:hp(3.5),
        width:wp(92),
        borderBottomWidth:1.5,
        borderColor:'#eff5d3',
        marginTop: hp(2.5)
    }


});


export default styles;
