import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#fff',
    },
    container:{
        flex:1,
    },
    imageView:{
        flex:0.3,
        alignItems:'center',
        justifyContent: 'center'
    },
    inputView:{
        flex:0.4,
    },
    upperView:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop:hp(1),
    },
    btnView:{
        flex:0.3,
        alignItems:'center',
    },
    text:{
        fontSize:hp(1.9),
        paddingTop:'6%',
        paddingLeft:'8%',
    },
    viewTick:{
        marginVertical:hp(2),
        paddingLeft:'8%',
    },
    imgStyle:{
        height:hp(18),
        width:hp(18),
        borderRadius:hp(18),
        resizeMode:'cover'
    }

});


export default styles;
