import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles= StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor:'#ffffff',

    },
    titleView:{
        paddingLeft:'13%'
    },
    title:{
        fontSize:hp(3.3),
        fontWeight:'bold',
        width: '50%',
    },
    innerView:{
        backgroundColor: '#ffffff',
        width:wp(96),
        paddingHorizontal:'2.5%',
    },
    textPrivacy:{
        fontSize:wp(4),
        marginTop:'3%',
        // fontWeight:'bold',
        fontFamily:'Roboto-Bold'

    },
    textPersonal:{
        fontSize:hp(1.8),
        marginTop:'3%',
        fontWeight:'bold',
    },
    text:{
        marginTop:'5%',
        fontFamily:'Roboto-Regular'

    },
    bottomText:{
        marginTop:'5%',
        marginBottom:'5%',
    }


});


export default styles;
