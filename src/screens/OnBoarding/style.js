import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main:{
        flex: 1,
        backgroundColor:colors.app_color,
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('80%'),
        height: hp('6%'),
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: colors.white,
        marginBottom: 10,
    },
    touchSkip:{
        width:wp('70%'),
        height:hp('7%'),
        alignItems:'center',
    },
    textAddButton:{
        color: colors.app_color,
        fontSize: wp('4.5%'),
        fontFamily:'Roboto-Bold'

    },
    textSkip:{
        color: colors.white,
        fontSize: wp('4%'),
        textDecorationLine: 'underline',
        fontFamily:'Roboto-Medium'

    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage2: {
        flex: 1,
    },
    dotStyle: {
        width: wp('2.7%'),
        height: wp('2.7%'),
        borderRadius: wp('2.7%'),
        backgroundColor: colors.white_smoke,
        // borderWidth: 1
    },
    activeDotStyle: {
        width: wp('3%'),
        height: wp('3%'),
        borderRadius: wp('2%'),
        backgroundColor: colors.white,
    },
    textHeading:{
        color:colors.white,
        fontSize:wp(4.6),
        // fontWeight:'bold',
        textAlign:'center',
        marginBottom: hp(2),
        width:wp(90),
        fontFamily:'Roboto-Bold'

    },
    text:{
        color:colors.white,
        fontSize:wp(3.8),
        // fontWeight:'500',
        textAlign:'center',
        width:wp(90),
        fontFamily:'Roboto-Medium'

    },
    viewUpper:{
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewMiddle:{
        flex: 4,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: hp('10%')
    },
    viewBottom:{
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default styles;
