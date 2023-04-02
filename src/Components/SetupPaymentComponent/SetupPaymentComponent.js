import React from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from './style';
import CheckBox from '../CheckBox';



export default class SetupPaymentComponent extends React.Component {



    render() {
        return(

            <View>

                <View
                    style={styles.mainContainer}>


                    <View style={styles.container}>
                        <View style={styles.containerInnerUpperView}>
                            <Image style={styles.image}

                                   source={this.props.image}
                            />


                            <View style={{paddingLeft:'7%'}}>
                                <Text style={styles.titleUpperView}>{this.props.title}</Text>
                                <Text style={styles.textUpperView}>{this.props.text}</Text>
                            </View>

                        </View>

                        {this.props.rightImageView? <TouchableOpacity style={styles.containerInnerBottomView} onPress={this.props.onPress}>

                            <Image style={styles.img}

                                   source={this.props.img}
                            />
                        </TouchableOpacity> :
                            <CheckBox />
                        }


                    </View>


                </View>

            </View>

        );
    }
}



