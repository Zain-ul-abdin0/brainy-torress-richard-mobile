import {StyleSheet,Platform} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    mainContainer: {
        height: hp(100),
        width: wp(100),
        backgroundColor: '#fff',
    },
    mainContainerInput:{
        marginTop:hp(2),
        alignItems:'center',
    },
StrengthView:{
    flexDirection:'row',marginLeft:35,marginTop:10
},
    medianText:{
        fontStyle:'italic',color:'#000',fontWeight:'bold'
    },
    btnView:{
        marginTop: Platform.OS === 'ios' ? hp(33) : hp(27),
        alignItems:'center',
    },
})
export default styles;
