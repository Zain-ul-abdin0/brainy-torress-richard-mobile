import React from 'react';
import {Image, StyleSheet, TextInput, TouchableWithoutFeedback, View} from "react-native";
import colors from '../../assets/colors';


export default AppInput = (props) => {

    return (
        <View style={[styles.inputFieldTextView,props.style,props.shadow,{height:props.height || 53,width:props.width || '85%',marginTop:props.marginTop || 10,paddingBottom:props.paddingBottom,paddingTop:props.paddingTop,backgroundColor:props.backgroundColor || colors.white,paddingLeft: props.paddingLeft || '0%',borderWidth: props.borderWidth,borderColor:props.borderColor || colors.app_color,borderRadius:props.borderRadius || 5} ]}>
            {props.leftIconPath !== undefined &&
            <Image style={props.imageStyle !== undefined ? props.imageStyle : {height:25,width:25,resizeMode:'contain',marginLeft:'3%' } }  source={props.leftIconPath} />
            }
            <TextInput
                value={props.value}
                secureTextEntry={props.secureTextEntry}
                style={[styles.inputFieldText, props.textInputStyle]}
                onChangeText={props.onChangeText}
                autoCapitalize='none' placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor}
                onSubmitEditing={props.onSubmitEditing}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                ref={props.ref}
                multiline={props.multiline}
                maxHeight={props.maxHeight}
                autoGrow={props.autoGrow}
                onContentSizeChange={props.onContentSizeChange}
                onEndEditing={props.onEndEditing}
                keyboardType={props.keyboardType}
                textAlignVertical={props.textAlignVertical}
                editable={props.editable}
            />
            {props.rightIconPath !== undefined &&  <TouchableWithoutFeedback onPress={props.onRightIconPress}>
                <Image
                    source={props.rightIconPath}
                    style={{ height:25,width:25,resizeMode:'contain'}}/>
            </TouchableWithoutFeedback>}
        </View>
    )
}

const styles = StyleSheet.create({

    inputFieldTextView:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    inputFieldText: {
        paddingLeft: '3%',
        height: '100%',
        width: '88%',
        fontSize: 15,
        textAlignVertical:'top'
    },


});
