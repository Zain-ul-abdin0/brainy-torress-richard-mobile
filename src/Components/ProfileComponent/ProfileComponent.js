import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,SafeAreaView,FlatList,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from "../../../assets/images";
import styles from './style';




export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        }






    render() {
        return(

                <View style={styles.mainContainer}>


                    <View style={styles.container}>
                        <View style={styles.innerView}>
                            <Image style={styles.img}
                             source={this.props.image}  />

                            <View style={{paddingLeft:'7%'}}>
                                <Text style={styles.textTitle}>{this.props.title}</Text>
                            </View>

                        </View>

                        <TouchableOpacity style={{paddingRight:'4%'}} onPress={this.props.onPress}>
                            <Text style={styles.textRight}>{this.props.rightText}</Text>
                        </TouchableOpacity>


                    </View>

                </View>



        );
    }
}


