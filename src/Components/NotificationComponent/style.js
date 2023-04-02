import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';

const styles= StyleSheet.create({
    mainContainer:{
    },
    container:{
        width:wp(94),
        backgroundColor:'#ffffff',
        borderBottomWidth:1,
        borderColor:'#9ec600',
        paddingLeft: '1%',
        marginTop:10

    },

    imgContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    imgView:{
        paddingRight:'3%',
    },
    textView:{
    },
    img:{
        height:hp(10),
        width:wp(12.5),
        resizeMode: 'contain',
    },
    textRight:{
        fontSize: hp(2),
        color:colors.red_color,
        paddingTop:'1%',
        // textDecorationLine:'underline'

    },
    textSubHeading:{
        fontSize:hp(2),
    },
    buttonsView:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        paddingRight: '3.1%',
        paddingTop: '1%',
        paddingBottom:'5%',
    }

});



export default styles;
