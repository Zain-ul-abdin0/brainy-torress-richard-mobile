import { StyleSheet } from "react-native";
import colors from '../../../assets/colors';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    mainContainer:
        {
            backgroundColor: colors.lightGreish,
            padding:'2%'
        },
    imageStyle:
        {
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: colors.light_black,
        },
    upperViewStyle:
        {
            paddingLeft: "2%",
            flex: 1,
        },
    bottomView:
        {
            marginTop: 10,
            height: "1%",
            width: "100%",
            alignSelf: "center",
            backgroundColor: colors.light_gray,
        },
    timeAgo:
        {
            color: colors.gray,
            fontStyle: "italic",
            textAlign: "right",
        },
    lastMessage:
        {
            marginTop: 25,
            color: colors.gray
        },
    userName:
        {
            fontWeight: "bold",
            fontSize: wp(4.0)
        }
});

export default styles;
