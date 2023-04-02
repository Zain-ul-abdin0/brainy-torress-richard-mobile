import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../../assets/colors';

let Styles = {
    drawerMainContainer: {
        height: hp(100),
        // width: wp(60),
        backgroundColor: colors.app_color
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    backgroundImageContainer: {
        height: hp(100),
        width: "100%",
    },
    userInfoContainer: {
        width: "100%",
        height: "20%",
        paddingTop: wp(5),
        flexDirection: "row",
    },
    userImageContainer: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
    },

    userProfileImage: {
        width: hp(11),
        height: hp(11),
        resizeMode: 'cover',
        borderRadius: hp(11),
    },
    userTextContainer: {
        width: "60%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: wp(5),
    },
    userNameText: {
        textAlign: "center",
        color: colors.white,
        fontSize: 17,
        fontWeight: "bold"
    },
    emailText: {
        marginTop: 5,
        textAlign: "center",
        color: "white",
        fontSize: 13
    },
    drawerItemsContainer: {
        width: "100%",
        height: "70%",
        marginTop: 10,
    },
    drawerItemLabelText: {
        // fontWeight: "bold",
        fontSize: wp(3.5),
        color: colors.white,
        fontFamily:'Roboto-Bold'

    },
    drawerItemImage: {
        width: 18,
        height: 18,
        resizeMode: "contain",
        tintColor:colors.white
    },
    drawerItemStyles:
        {
            height: wp(14),
            width:'96%',
            marginVertical: wp(0.5),
            // backgroundColor:'pink',
            justifyContent: 'center',
            borderBottomWidth:wp(0.1),
            borderColor:colors.white

        }

};
export default Styles;
