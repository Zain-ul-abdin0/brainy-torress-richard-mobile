import React, {Component, useDebugValue} from 'react';
import {Image, TouchableOpacity, View, StyleSheet, Text, Platform, SafeAreaView,} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';


export default class AppHeader extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            drawerProps: this.props.nav,
        };
    }


    render() {
        const nav = this.state.drawerProps;
    return (

        <SafeAreaView style={[styles.container]}>

            <TouchableOpacity style={styles.headerProfile} onPress={this.props.onLeftIconPress}>


                {this.props.leftText!==undefined &&
                <Text style={styles.text}>{this.props.leftText}</Text>
                }

                {this.props.leftIconPath !== undefined &&
                <Image resizeMode="contain" style={[styles.img,this.props.lefticonSize !==undefined ? {height:this.props.lefticonSize ,width:this.props.lefticonSize} : {height: 22, width: 22}]}
                       source={this.props.leftIconPath}/>

            }
            </TouchableOpacity>
            <View style={styles.headerLogo}>
                {this.props.titleLogoPath !==undefined &&  <Image style={this.props.titleLogosize !== undefined ? {height:this.props.titleLogosize ,width:this.props.titleLogosize }  :   {width: 30, height: 30}} source={props.titleLogoPath}/> }
                {this.props.title &&
                <Text style={styles.title}>{this.props.title!== undefined ? this.props.title : 'Header'}</Text>
                 }
            </View>
            <TouchableOpacity style={styles.headerMenu} onPress={this.props.onRightIconPress}>
                {this.props.rightIconOnePath!==undefined &&
                <Image resizeMode="contain" style={[styles.img,this.props.rightIconSize !== undefined ? {height:this.props.rightIconSize , width:this.props.rightIconSize}: {height: 20, width: 20}]}
                       source={this.props.rightIconOnePath}/>
                }

                {this.props.rightIconTwoPath!==undefined &&
                <Image resizeMode="contain" style={[styles.img,this.props.rightIconSize !== undefined ? {height:this.props.rightIconSize , width:this.props.rightIconSize}: {height: 20, width: 20}]}
                       source={this.props.rightIconTwoPath}/>
                }

                {this.props.rightText!==undefined &&
                <Text style={styles.text}>{this.props.rightText}</Text>
                }


            </TouchableOpacity>

        </SafeAreaView>
    )}
}




const styles = StyleSheet.create({
    container: {
        height:Platform.OS === 'ios' ? '9.5%': '7.5%',
        width:"100%",
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.app_color,

    },
    headerProfile: {
        flex: 0.15,
        // paddingLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        // backgroundColor: 'gold',

    }
    ,
    headerLogo: {
        flex: 0.70,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        // backgroundColor: 'green',
    }
    ,
    headerMenu: {
        flex: 0.15,
        flexDirection: "row",
        // paddingRight: 15,
        alignItems: 'center',
        // alignSelf: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
    },
    title:{
        fontSize: wp(4.3),
        // fontWeight:'bold',
        color:colors.white,
        fontFamily:'Roboto-Bold'

    },
    text:{
        fontSize:16,
        color:colors.white,
        fontWeight: 'bold'
    },
    img:{
        tintColor:colors.white
    }

});
