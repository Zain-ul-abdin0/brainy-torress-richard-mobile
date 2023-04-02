
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {Platform, StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../../assets/colors';
import React from "react";

const Styles = StyleSheet.create({

    mainContainer:
        {
            marginHorizontal:7,
            marginTop:5
        },

    imgBox:{
        width: hp(12),
        height: hp(10),
        resizeMode:"cover",

    },
    btn:{
        position:'absolute',
        left: Platform.OS === 'ios' ? 83 : 64,
        right:0,
        top:0,
        bottom:0
    },
    cancleImage:{
        height:23,
        width:23,
        resizeMode: 'contain'
    }

});
export default Styles;


