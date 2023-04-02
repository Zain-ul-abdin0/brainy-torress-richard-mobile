import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,FlatList} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../../../assets/images';
import styles from './style';
import AppHeader from '../../../Components/AppHeader';


export default class Profile extends React.Component {






    render() {
        return(
            <View style={styles.mainContainer}>

                <AppHeader
                    title={'My Profile'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                    rightIconOnePath={images.ic_edit}
                    onRightIconPress={()=>this.props.navigation.navigate("DriverEditProfile")}
                />


                <View style={styles.upperView}>

                    <View>
                        <Text style={styles.titleUpperView}>Jobs Completed</Text>
                        <Text style={styles.numberTextUpperView}>09</Text>
                    </View>

                    <View>
                        <Image style={styles.imgUpperView}
                               source={images.avatar}
                        />
                    </View>

                    <View>
                        <Text style={styles.titleUpperView}>Jobs Canceled</Text>
                        <Text style={styles.numberTextUpperView}>01</Text>
                    </View>
                </View>

                <View style={styles.bottomView}>
                    <Text style={styles.numberTextUpperView}>Jonny Devinport</Text>
                    <View style={styles.starView}>
                        <Image style={styles.imgStar} source={images.icn_full_star}/>
                        <Image style={styles.imgStar} source={images.icn_full_star}/>
                        <Image style={styles.imgStar} source={images.icn_full_star}/>
                        <Image style={styles.imgStar} source={images.icn_half_star}/>
                        <Image style={styles.imgStar} source={images.icn_empty_star}/>
                    </View>

                    <Text style={styles.textBottom}>-Everything Fine</Text>
                    <Text style={styles.text}>-Canceled Job 30 Min</Text>
                    <Text style={styles.text}>-Friendly, No issues</Text>

                </View>






            </View>

        );
    }
}



