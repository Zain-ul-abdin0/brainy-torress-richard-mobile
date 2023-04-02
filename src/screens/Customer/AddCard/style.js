import {Platform, StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';


const styles = StyleSheet.create({
    viewStyle: {
        height:hp(100),
        width:wp(100),
        // alignItems: 'center',
        backgroundColor:'#ffffff',
    },

    btnView:{
        // backgroundColor:'green',
        alignItems:'center',
        marginTop:Platform.OS === 'ios' ? hp(59) : hp(54),
    },
    collapseView:{
        width:wp(100),
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingHorizontal:wp(3.5)
    },
    dropdownStyle:{
        backgroundColor: '#ffffff',
        height:hp(5),
        width:wp(25),
        paddingHorizontal:'1%',
        borderWidth:1,
        borderColor:colors.app_color,
        borderRadius:5,paddingRight:10
    },
    dropdownLeftOptionsStyle:{
        // backgroundColor:'green',
        marginRight:'75%',
        width:wp(15)
    },
    dropdownRightOptionsStyle:{
        // backgroundColor:'green',
        marginRight:'75%',
        width:wp(15)
    },
    dropdownButtonText:{
        color:'#c6c6c6'
    }




});


export default styles;
