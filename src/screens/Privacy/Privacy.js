import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,FlatList,ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from "../../../assets/images";
import styles from "./style";
import AppHeader from '../../Components/AppHeader';

export default class Privacy extends React.Component {
    constructor(props) {
        super(props);

        this.state={


        }
    }



    render() {
        return(
            <View style={styles.mainContainer}>

                <AppHeader
                    title={'Policy Privacy'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />


                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        {this.state.title}
                    </Text>
                </View>

                <ScrollView>
                    <View style={{alignItems: 'center'}}>


                        <View style={styles.innerView}>
                            <Text style={styles.textPrivacy}>
                                Policy Privacy
                            </Text>

                            <Text style={styles.text}>
                                It is a long established fact that a reader will be distracted by the
                                readable content of a page when looking at its layout.
                                The point of using Lorem Ipsum is that it has a more-or-less normal
                                distribution of letters, as opposed to using 'Content here, content here',
                                making it look like readable English.
                            </Text>


                            <Text  style={styles.text}>
                                It is a long established fact that a reader will be distracted by the
                                readable content of a page when looking at its layout.
                                The point of using Lorem Ipsum is that it has a more-or-less normal
                                distribution of letters, as opposed to using 'Content here, content here',
                                making it look like readable English.
                            </Text>


                            <Text  style={styles.text}>
                                It is a long established fact that a reader will be distracted by the
                                readable content of a page when looking at its layout.
                                The point of using Lorem Ipsum is that it has a more-or-less normal
                                distribution of letters, as opposed to using 'Content here, content here',
                                making it look like readable English.
                            </Text>

                            <Text style={styles.textPersonal}>
                                Personal Data
                            </Text>

                            <Text  style={styles.text}>
                                It is a long established fact that a reader will be distracted by the
                                readable content of a page when looking at its layout.
                                The point of using Lorem Ipsum is that it has a more-or-less normal
                                distribution of letters, as opposed to using 'Content here, content here',
                                making it look like readable English.
                            </Text>

                            <Text  style={styles.bottomText}>
                                It is a long established fact that a reader will be distracted by the
                                readable content of a page when looking at its layout.
                                The point of using Lorem Ipsum is that it has a more-or-less normal
                                distribution of letters, as opposed to using 'Content here, content here',
                                making it look like readable English.
                            </Text>


                        </View>

                    </View>
                </ScrollView>



            </View>

        );
    }
}




