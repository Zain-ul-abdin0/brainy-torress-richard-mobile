import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';

export default class MessageComponent extends React.Component {



    render() {
        return(

            <View>

                <TouchableOpacity
                    onPress={this.props.onPress}
                    style={styles.mainContainer}>


                    <View style={styles.container}>
                        <View style={styles.containerInnerUpperView}>
                            <Image style={styles.image}

                                   source={{uri: this.props.imageLeft}}
                            />


                            <View style={{paddingLeft:'7%'}}>
                                <Text style={styles.titleUpperView}>{this.props.title}</Text>
                                <Text style={styles.textUpperView}>{this.props.text}</Text>
                            </View>

                        </View>

                        <View style={styles.containerInnerBottomView}>
                            <Image style={styles.img}

                                   source={this.props.imageRight}
                            />

                        </View>


                    </View>

                </TouchableOpacity>

            </View>

        );
    }
}


const styles = StyleSheet.create({

    mainContainer:{
        height:hp(10),
        width:wp(100),
        justifyContent:'center',
        borderBottomWidth:0.8,
        borderColor:colors.greyTabs,
    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    img:{
        height: hp(5),
        width: hp(5),
        borderRadius: hp(5),
        resizeMode:"contain",
        paddingRight:'7%',
    },
    containerInnerUpperView:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:wp(3)
    },
    titleUpperView:{
        fontSize:wp(4.3),
        fontFamily:'Roboto-Bold'
    },
    textUpperView:{
        fontSize:wp(3.7),
        fontFamily:'Roboto-Regular'
    },
    containerInnerBottomView:{
        alignItems:'center',
    },
    image:{
        height: hp(7),
        width: hp(7),
        borderRadius: hp(7),
        resizeMode:"cover",
    }

});



