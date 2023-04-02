//================================ React Native Imported Files ======================================//

import React from 'react';
import {View,TouchableOpacity,Image,Keyboard} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

//================================ Local Imported Files ======================================//

import AppInput from '../../../Components/AppInput';
import images from '../../../../assets/images';
import styles from './style';
import AppHeader from '../../../Components/AppHeader';
import AppLoading from '../../../Components/AppLoading';
import FirebaseHelper from '../../../firebase/FirebaseHelper';
import CommonDataManager from '../../../common/Singleton';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';


export default class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            filePath: '',
            name:'',
            userName: '',
            imageUrl:'',
            introduction:'',
            url:'',
            loading:false,
        };

    }


    componentDidMount() {
        this.getUser();
    }


    selectFile = () => {
        let options = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.errorMessage) {
                console.log('ImagePicker Error: ', res.errorMessage);
            } else {
                this.setState({filePath:res});
            }
        });
    };


    getUser = () => {
        this.setState({loading:true})
        let { userId } = this.state;
        FirebaseHelper.getUserProfile(userId,(resp) => {
            if (resp === undefined) {
                this.setState({
                    loading: false,
                });
            } else {
                this.setState({
                    imageUrl:resp._data.imageUrl,
                    name:resp._data.name,
                    userName:resp._data.userName,
                    introduction:resp._data.introduction,
                    loading:false
                })
            }
        })
    }


    uploadImage = (ImagesArray, callback) => {
        const item = ImagesArray;
        const image = Platform.OS === 'android' ? item.uri : item.uri.replace('file:///', ''); //imagePath.uri;
        const imageRef = storage().ref(`ProfileImages/${item.fileName}`);
        imageRef
            .putFile(image)
            .then(() => {
                storage()
                    .ref(`ProfileImages/${item.fileName}`)
                    .getDownloadURL()
                    .then((urli) => {
                        if (urli) {
                            console.log('urli', urli);
                            callback(urli);
                        } else {
                            this.setState({loading: false});
                            alert('No Image Url found');
                        }
                    });
            })
            .catch((error) => {
                this.setState({loading: false});
                console.log(error);
            });
    };


    updateProfileData = () => {
        let { userId,name,userName,introduction,imageUrl } = this.state;
        FirebaseHelper.updateUserProfile(userId,name,userName,introduction,imageUrl)
            .then(() => {
                CommonDataManager.getInstance().setImage(imageUrl);
                CommonDataManager.getInstance().setName(name);
                    this.setState({loading:false})
                    alert("Profile Updated")
            })
    }


    onSaveButton = () => {
        this.setState({loading:true})
        let { name,userName,introduction,filePath } = this.state;
        if(name === ''){
            this.setState({loading:false})
            alert("Please enter name")
        }if(userName === ''){
            this.setState({loading:false})
            alert("Please enter user name")
        }if(introduction === ''){
            this.setState({loading:false})
            alert("Please enter introduction")
        } else if(filePath !== ''){
            this.uploadImage(filePath, (callback) => {
                this.setState({imageUrl: callback}, () => {
                    this.updateProfileData();
                });
            });
        }else{
            this.updateProfileData();
        }
    }


    render() {
        return(

            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}
                <AppHeader
                    title={'Edit Profile'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                    rightText={'Save'}
                    onRightIconPress={this.onSaveButton}
                />

                <View style={styles.upperView}>
                    <TouchableOpacity  onPress={this.selectFile}>
                        <Image style={styles.imgUpperView}
                               source={this.state.filePath ? {uri:this.state.filePath.uri} : {uri: this.state.imageUrl}}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback
                    style={styles.mainContainer}
                    onPress={() => Keyboard.dismiss()}>
                <View>
                    <AppInput
                        placeholder={'First Name'}
                        borderWidth={1}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}

                    />
                    {/*<AppInput*/}
                    {/*    placeholder={'Last Name'}*/}
                    {/*    borderWidth={1}*/}
                    {/*/>*/}

                <AppInput
                    placeholder={'Username'}
                    borderWidth={1}
                    onChangeText={(userName) => this.setState({userName})}
                    value={this.state.userName}
                />

                <AppInput
                    height={hp(20)}
                    placeholder={'Introduction'}
                    borderWidth={1}
                    paddingBottom={'10%'}
                    multiline={true}
                    textAlignVertical={'top'}
                    onChangeText={(introduction) => this.setState({introduction})}
                    value={this.state.introduction}
                />
                </View>
                </TouchableWithoutFeedback>
            </View>

        );
    }
}







