//================================ React Native Imported Files ======================================//

import React from 'react';
import {View,Text,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {AirbnbRating} from 'react-native-ratings';

//================================ Local Imported Files ======================================//

import images from '../../../../assets/images';
import styles from './style';
import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import AppInput from '../../../Components/AppInput';
import colors from '../../../../assets/colors';



export default class ProviderConfirmDelivery extends React.Component {

    render() {
        return(
            <View style={styles.mainContainer}>

                <AppHeader
                    title={'Confirm Delivery'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />

                <View style={styles.upperView}>

                    <View>
                        <Image style={styles.imgUpperView}
                               source={images.avatar}
                        />
                    </View>

                </View>

                <View style={styles.bottomView}>

                    <Text style={styles.numberTextUpperView}>Maurice Daniels</Text>

                    <Text style={styles.textDetail}>
                        Note: By It is a long established fact that a reader will be distracted by
                        the readable content of a page when.
                    </Text>

                    <View style={styles.starView}>
                        <AirbnbRating
                            count={5}
                            style={{alignItems:'center'}}
                            reviewSize={0}
                            defaultRating={5}
                            size={24}
                            isDisabled={false}
                            showRating={false}
                        />
                        <Text style={{fontSize:hp(1.8),paddingLeft:'2%'}}>291 Reviews</Text>
                    </View>

                    <View style={styles.line}/>

                    <View style={styles.starViewBottom}>
                        <Text style={{fontSize:hp(1.8),paddingRight:'2%'}}>Tap star to rate</Text>
                        <AirbnbRating
                            count={5}
                            style={{alignItems:'center'}}
                            reviewSize={0}
                            defaultRating={5}
                            size={24}
                            isDisabled={true}
                            showRating={false}
                        />
                    </View>


                        <AppInput
                            height={150}
                            multiline={true}
                            paddingTop={'2%'}
                            placeholder={'Leave a text feedback here'}
                            borderWidth={1}
                            marginTop={20}
                        />



                    <View style={styles.btnView}>
                        <Button
                            height={hp(5)}
                            width={wp(90)}
                            buttonText={'Job Complete'}
                            bgColor={colors.app_color}
                            // onPress={() => this.props.navigation.navigate('')}
                        />
                    </View>


                </View>

            </View>

        );
    }
}






