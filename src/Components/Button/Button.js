import React from 'react';
import {
    Text,
    Platform,
    TouchableWithoutFeedback,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View, Image, SafeAreaView,
} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';



class  Button extends React.Component{

    constructor(props){
        super(props)
    }


    render() {
        const {containerStyle,buttonText,BackgroundImage,TextStyle,isImagePath,onPress,rightText,marginTop,bgColor,borderRadius,height,width,textColor,decorationLine,fontSize,fontWeight,marginStart,borderWidth,borderColor,isText,
            isImageStyle}=this.props;
        return (
            <TouchableOpacity
                onPress={onPress} style={[containerStyle !==undefined ? containerStyle :[styles.container,{height:height || hp(6),width:width || wp(85),marginTop:marginTop,marginStart:marginStart,borderWidth:borderWidth,borderColor:borderColor,borderRadius:borderRadius || 6,backgroundColor:bgColor || colors.app_color}]]}
            >
                <ImageBackground source={BackgroundImage}
                                 resizeMode={"stretch"}
                                 style={styles.imgBackground}
                >
                    <View
                        style={styles.mainView}
                    >
                        { isImagePath !== undefined  ?
                            <View style={styles.viewImage}>
                                <Image source={isImagePath} style={[isImageStyle!==undefined ? isImageStyle :styles.isImageStyle]} resizeMode={"contain"}/>

                            </View>
                            : <View style={styles.viewImage}/>}


                        <Text style={[styles.textStyle,{fontSize:fontSize || wp(4) ,fontWeight:fontWeight || 'bold' ,color:textColor || colors.white,textDecorationLine:decorationLine,fontFamily:'Roboto-Bold'
                        },TextStyle]}>{[isText!==undefined ? 'Button' : buttonText]}</Text>


                        <Text style={styles.rightText}>{rightText}</Text>
                    </View>

                </ImageBackground>

            </TouchableOpacity>

        );
    }
}

export default Button;



const styles = StyleSheet.create({
    container: {
        // height:hp(6),
        // width:wp(85),
        // backgroundColor:colors.app_color,

    },
    imgBackground: {
        width:"100%",
        height:"100%",
        justifyContent:'center',
    },
    mainView:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
    },
    viewImage:{
        flex:0.13,
        // backgroundColor:'pink',
        paddingLeft:'3%'
    },
    isImageStyle:{
        width:25,
        height:25,
        // marginEnd:5,

    },
    textStyle:{
        flex:0.74,
        // backgroundColor: 'gold',
        textAlign:'center'
    },
    rightText:{
        flex:0.13,
        textAlign: 'center',
        // backgroundColor:'red'
    }



});




