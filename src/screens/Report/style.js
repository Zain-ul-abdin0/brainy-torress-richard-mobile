import {Platform, StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles= StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor:'#ffffff',
        // alignItems: 'center',


    },
    btnView: {
        marginTop: Platform.OS === 'ios' ? hp(33) : hp(19),
        justifyContent:'center',
        alignItems:'center',
    },
    text: {
        color: '#000000',
        fontSize:wp(3),
        // fontWeight:'bold',
        textAlign:'right',
        marginRight:'8%',
        marginTop:'3%',
        // fontFamily:'Montserrat-Regular',

    },


});

export default styles;


