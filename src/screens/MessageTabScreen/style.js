import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors';

const styles = StyleSheet.create({

    mainContainer:
      {
        flex: 1,
        backgroundColor: colors.white,
      },

    headerView:
      {
        flex: 0.1,
      },

    contentView:
      {
        // flex: 0.9,
        flex:1,
      },

    chatStyle:
      {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },

    viewFlatlist:
      {
        flex:0.9
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
        backgroundColor: colors.white,
      },
  });


  export default styles;

