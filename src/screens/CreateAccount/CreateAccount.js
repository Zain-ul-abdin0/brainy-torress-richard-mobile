import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,FlatList,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from "../../../assets/images";
import ImagePicker from 'react-native-image-picker';
import styles from "./style";
import AppHeader from '../../Components/AppHeader';
import Button from '../../Components/Button/Button';
import colors from '../../../assets/colors';




export default class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCustomer: true,
            filePath: {},
        };
        }


        userSide() {
               this.props.navigation.navigate('drawerNavUser', {isDriver:false})
        }

        driverSide() {
               this.props.navigation.navigate('drawerNavProvider', {isDriver:true})
        }


    chooseFile = () => {
        var options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    filePath: source,
                });
            }
        });
    };





    render() {
        return(
            <View style={styles.mainContainer}>

                <AppHeader
                    title={'Create Account'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />


                <View style={styles.imgView}>

                    <Image style={{height: hp(15),width:wp(25),resizeMode: 'contain'}}
                           source={images.avatar} />

                    <TouchableOpacity  onPress={this.chooseFile.bind(this)}>
                        <Text style={{fontSize:hp(1.8),color:'#0C0F12',paddingTop:'1%'}}>Edit Photo</Text>
                    </TouchableOpacity>


                </View>

                <View style={styles.viewInput}>
                    <TextInput
                        style={styles.input}
                        placeholder={'First Name'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'Last Name'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'Phone Number'}
                    />

                </View>

                <View style={{marginTop:hp(3)}}>
                    <Text style={{fontSize:hp(2),color:'#0C0F12',fontWeight:'bold',textAlign:'center',marginVertical:'5%'}}>Want To Be</Text>
                    <View style={{flexDirection: 'row',justifyContent:'space-around'}}>

                        <Button
                            height={hp(5)}
                            width={wp(40)}
                            buttonText={'Customer'}
                            onPress={() => this.setState({isCustomer:true})}
                            fontSize={15}
                            bgColor={this.state.isCustomer ? colors.app_color : '#999999'}
                            textColor={colors.white}
                        />

                        <Button
                            height={hp(5)}
                            width={wp(43)}
                            buttonText={'Service Provider'}
                            onPress={() => this.setState({isCustomer:false})}
                            fontSize={15}
                            bgColor={this.state.isCustomer ? '#999999' :  colors.app_color}
                            textColor={colors.white}
                        />


                    </View>


                </View>



                <View style={styles.btnView}>

                    <Button
                        height={hp(5)}
                        width={wp(80)}
                        buttonText={'CREATE ACCOUNT'}
                        onPress={() =>{this.state.isCustomer ? this.userSide():this.driverSide()}}
                        fontSize={15}
                        textColor={colors.white}
                    />


                </View>


            </View>

        );
    }
}

