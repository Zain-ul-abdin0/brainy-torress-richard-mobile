//================================ React Native Imported Files ======================================//

import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';


//================================ Local Imported Files ======================================//

import Dropdown from "../../../Components/ModalDropdown";
import colors from "../../../../assets/colors";
import styles from './style';
import AppHeader from '../../../Components/AppHeader';
import AppInput from '../../../Components/AppInput';
import images from "../../../../assets/images";
import AppLoading from '../../../Components/AppLoading';
import FirebaseHelper from '../../../firebase/FirebaseHelper';
import Picker from '../../../Components/ImagePickerView/Picker';


export default class RequestNewService extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            filePath:'',
            DateTimePickerModal:false,
            time:'Time',
            date:'Date',
            isTime:false,
            location:'Location',

            title:'',
            description:'',
            tagWords:'',
            price:null,

            loading:false,
            categories:[],
            subCategories:[],
            catId:'',
            subCatId:'',
            paymentId:'',
            url:'',

            subCategory:'Sub Category',
            category:'Category',

            status:'Waiting for Service Provider',

            catName:"",
            subCatName:"",
            latitude:null,
            longitude: null,

            result:[],
            generatedTagWords:[],
            urls:[],
            bidding:[],
            show:false,
        }
    }


    componentDidMount() {
        // this.focusListner = this.props.navigation.addListener('focus', () => {
        this.getCategories();
        // });
    }


    // componentWillUnmount() {
    //     this.focusListner();
    // }


    getCategories = () => {
        this.setState({loading:true})
        FirebaseHelper.getCategories((resp) => {
            if (resp === undefined || resp._docs.length === 0) {
                this.setState({
                    loading: false,
                });
            } else {
                let tempArray = [];
                resp.forEach((response) => {
                    tempArray.push(response._data.name)
                })
                this.setState({
                    categories:tempArray,
                    loading:false
                })
            }
        })
    }


    onCategorySelect = (value) => {
        this.setState({loading:true})
        this.getCategoryId(value)
    }


    getCategoryId = (value) => {
        FirebaseHelper.getCatId(value,(resp) => {
            resp.forEach((res) => {
                if(res._data.name === value)
                {
                    this.setState({catId:res.id,category:res._data.name,catName:res._data.name})
                }
            });
        }).then(() => {
            FirebaseHelper.getSubCategory(this.state.catId,(response) => {
                if (response === undefined || response._docs.length === 0) {
                    this.setState({
                        loading: false,
                    });
                } else {
                    let tempArray1 = [];
                    response.forEach((resp) => {
                        tempArray1.push(resp._data.name)
                    })
                    this.setState({subCategories:tempArray1,loading:false})
                }
            })
        })
    }


    onSelectSubcategory = (value) => {
        FirebaseHelper.getSubCategoryId(value,(resp) => {
            resp.forEach((res) => {
                if(res._data.name === value)
                {
                    this.setState({subCatId:res.id,subCategory:res._data.name,subCatName:res._data.name})
                }
            });
        })
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
                this.setState({result: [...this.state.result, res]});
                this.setState({show:true});
            }
        });
    };


    removeImages = (item) => {
        this.setState({
            result: this.state.result.filter((img) => img.uri !== item.uri),
        },() => {
            if(this.state.result.length < 1) {
                this.setState({show:false})
            }
        });

    };


    onPressTime= () => {
        this.setState({DateTimePickerModal:true,isTime:true})
    }


    onPressDate= () => {
        this.setState({DateTimePickerModal:true,isTime:false})
    }


    onConfirmTime = (value) => {
        let finalTime = moment(value).format('h:mm A');
        this.setState({time:finalTime,DateTimePickerModal:false},()=>{
        })
    }


    onCancelTime = () => {
        this.setState({DateTimePickerModal:false})
    }


    onConfirmDate = (value) => {
        let finalDate = value.toString().substring(3,15);
        this.setState({date:finalDate,DateTimePickerModal:false})
    }


    onCancelDate = () => {
        this.setState({DateTimePickerModal:false})
    }


    onSetLocation = (value) => {
        this.setState({location:value.address,latitude:value.latitude,longitude:value.longitude});
    }


    uploadImage = (ImagesArray, callback) => {
        let imagesUrlArray = [];
        ImagesArray.map((item) => {
            if (item) {
                const image =
                    Platform.OS === 'android'
                        ? item.uri
                        : item.uri.replace('file:///', ''); //imagePath.uri;
                const imageRef = storage().ref(`serviceImages/${item.fileName}`);
                imageRef
                    .putFile(image)
                    .then(() => {
                        storage()
                            .ref(`serviceImages/${item.fileName}`)
                            .getDownloadURL()
                            .then((url) => {
                                if (url) {
                                    imagesUrlArray.push(url);
                                    if (ImagesArray.length === imagesUrlArray.length) {
                                        callback(imagesUrlArray);
                                    }
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
            } else {
                this.setState({loading: false});
                alert('Please Select Image.');
            }
        });
    };


    onPost = () => {
        this.setState({loading:true})
        let { time,date,location,title,description,tagWords, catId, subCatId,price,result } = this.state;
        if(time === 'Time'){
            this.setState({loading:false})
            alert("Please enter time")
        }else if(date === 'Date'){
            this.setState({loading:false})
            alert("Please enter date")
        }else if(location === 'Location'){
            this.setState({loading:false})
            alert("Please select location")
        }else if(title === ''){
            this.setState({loading:false})
            alert("Please select title")
        }else if(description === ''){
            this.setState({loading:false})
            alert("Please enter description")
        }else if(tagWords === ''){
            this.setState({loading:false})
            alert("Please enter tag Words")
        }else if(catId === ''){
            this.setState({loading:false})
            alert("Please select category")
        }else if(subCatId === ''){
            this.setState({loading:false})
            alert("Please select sub category")
        }else if(price === null){
            this.setState({loading:false})
            alert("Please enter price")
        }else if(result.length > 0){
            this.uploadImage(result, (callback) => {
                this.setState({urls: callback});
                this.createTagsAndStoreDataToFirebase();
            });
        }else {
            this.createTagsAndStoreDataToFirebase();
        }
    }


    createTagsAndStoreDataToFirebase = () => {
        let { tagWords } = this.state;
        let tags = tagWords.split(',');
        this.setState({generatedTagWords:tags},() => {
            this.storeDataTOFirebase();
        })
    }


    storeDataTOFirebase = () => {
        let createdAt = new Date();
        let { time, date, location, title, description, generatedTagWords, catId, subCatId, price, urls, userId, status, paymentId, catName, subCatName, latitude, longitude, bidding } = this.state;
        FirebaseHelper.addService(
            time,
            date,
            location,
            title,
            description,
            generatedTagWords,
            catId,
            subCatId,
            price,
            userId,
            urls,
            status,
            paymentId,
            createdAt,
            catName,
            subCatName,
            latitude,
            longitude,
            bidding,
            (response) => {
                if(response){
                    this.setState({loading: false});
                    this.setState({
                        title:'',
                        description:'',
                        categories:[],
                        subCategories:[],
                        location:'Location',
                        time:'Time',
                        date:'Date',
                        result:[],
                        tagWords:'',
                        subCategory:'Sub Category',
                        category:'Category',
                        catName:'',
                        subCatName:'',
                        price: null,
                        show:false,
                    },() => {
                        this.props.navigation.navigate('AddSubscription',{
                            response:response,
                        })
                    })
                }
            });
    }


    render() {
        const nav = this.props.navigation;
        return (
            <View style={[styles.viewStyle]}>
                {AppLoading.renderLoading(this.state.loading)}
                <AppHeader
                    title={'Request a New Service'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                    rightText={'Post'}
                    onRightIconPress={()=> this.onPost()}
                />

                <ScrollView
                    contentContainerStyle={styles.scroll}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableWithoutFeedback
                        style={styles.mainContainer}
                        onPress={() => Keyboard.dismiss()}>
                        <View style={[styles.inputView]}>

                            <AppInput
                                height={50}
                                width={wp(90)}
                                placeholder={'Job Title'}
                                placeholderTextColor={colors.placeholder_text_color}
                                colortextInput={colors.black}
                                borderWidth={1}
                                marginTop={0.1}
                                onChangeText={(title) => this.setState({title})}
                                value={this.state.title}
                            />

                            <AppInput
                                height={130}
                                width={wp(90)}
                                placeholder={'Description'}
                                placeholderTextColor={colors.placeholder_text_color}
                                colortextInput={colors.black}
                                borderWidth={1}
                                multiline={true}
                                textAlignVertical={'top'}
                                paddingBottom={'18%'}
                                onChangeText={(description) => this.setState({description})}
                                value={this.state.description}
                            />

                            <Dropdown
                                dropdownStyle = {styles.dropdownStyle}
                                dropdownOptionsStyle={styles.dropdownLeftOptionsStyle}
                                buttonTextStyle={{color: this.state.category === 'Category' ? colors.placeholder_text_color : colors.black}}
                                defaultButtontext={this.state.category}
                                arrowBackgroundColor={colors.app_color}
                                options={this.state.categories}
                                onSelect = {(value,index) => this.onCategorySelect(index)}
                            />
                            <Dropdown
                                dropdownStyle = {styles.dropdownStyle}
                                dropdownOptionsStyle={styles.dropdownLeftOptionsStyle}
                                buttonTextStyle={{color:this.state.subCategory === 'Sub Category' ? colors.placeholder_text_color : colors.black}}
                                defaultButtontext={this.state.subCategory}
                                arrowBackgroundColor={colors.app_color}
                                options={this.state.subCategories}
                                onSelect = {(value,index) => this.onSelectSubcategory(index)}
                            />


                            <TouchableOpacity style={styles.touchable1} onPress={() => this.props.navigation.navigate('SelectLocation',{
                                onGoBack:(address) => {
                                    this.onSetLocation(address);
                                }
                            })} >

                                <Text style={{color:this.state.location === 'Location' ? colors.placeholder_text_color : colors.black,width:wp(75)}}>{this.state.location}</Text>
                                <View style={{ height:'100%',width:'11%',backgroundColor:colors.red_color,
                                    alignItems:'center',justifyContent:'center',borderRadius:wp(1)}}>

                                    <Image style={styles.icon} source={images.ic_pin}/>

                                </View>
                            </TouchableOpacity>


                            {/*<TouchableOpacity style={styles.touchable} onPress={() => this.props.navigation.navigate('SelectLocation')}>*/}
                            {/*    <Text style={{color:'#1F2023'}}>Drop off Location</Text>*/}
                            {/*</TouchableOpacity>*/}

                            <TouchableOpacity style={styles.touchable2} onPress={this.onPressDate}>
                                <Text style={{color:this.state.date === 'Date' ? colors.placeholder_text_color : colors.black}}>{this.state.date}</Text>
                                <View style={{ height:'100%',width:'11%',backgroundColor:colors.red_color,alignItems:'center',justifyContent:'center',borderRadius:3,}}>

                                    <Image style={[styles.icon,{tintColor:colors.white,height:18}]} source={images.ic_CalenderWhite}/>

                                </View>
                            </TouchableOpacity>

                            <DateTimePickerModal
                                isVisible={this.state.DateTimePickerModal}
                                mode={this.state.isTime ? 'time' : 'date'}
                                minimumDate={new Date()}
                                onConfirm={this.state.isTime ? this.onConfirmTime : this.onConfirmDate}
                                onCancel={this.state.isTime ? this.onCancelTime : this.onCancelDate}
                                customHeaderIOS={() =>
                                    <>
                                        {this.state.isTime ?
                                            <Text style={{
                                                textAlign: 'center',
                                                paddingTop: wp(4),
                                                fontSize: wp(4),
                                            }}>
                                                Pick a Time
                                            </Text> :  <Text style={{
                                                textAlign: 'center',
                                                paddingTop: wp(4),
                                                fontSize: wp(4),
                                            }}>
                                                Pick a Date
                                            </Text>
                                        }
                                    </>
                                }
                            />

                            <TouchableOpacity style={styles.touchable1}
                                              onPress={this.onPressTime}
                            >
                                <Text style={{color:this.state.time === 'Time' ? colors.placeholder_text_color : colors.black}}>{this.state.time}</Text>
                                <View style={{ height:'100%',width:'11%',backgroundColor:colors.red_color,
                                    alignItems:'center',justifyContent:'center',borderRadius:wp(1)}}>
                                    <Image style={[styles.icon,{tintColor:colors.white,height:12}]} source={images.ic_dropDown2}/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.touchableImage} onPress={this.selectFile}>
                                <Text style={{color:colors.placeholder_text_color}}>Photo (Optional)</Text>
                                <View style={{ height:'100%',width:'11%',backgroundColor:colors.red_color,alignItems:'center',justifyContent:'center',borderRadius:3}}>
                                    <Image style={styles.icon} source={images.icn_camera}/>
                                </View>
                            </TouchableOpacity>

                            {this.state.show && <View style={styles.imageSelected}>
                                <FlatList
                                    data={this.state.result}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(val) => val.uri}
                                    renderItem={({item}) => {
                                        return <Picker item={item} remove={this.removeImages}/>;
                                    }}
                                />
                            </View>}

                            <AppInput
                                height={50}
                                width={wp(90)}
                                placeholder={'Enter Tag words with comma seperated'}
                                placeholderTextColor={colors.placeholder_text_color}
                                colortextInput={colors.black}
                                borderWidth={1}
                                onChangeText={(tagWords) => this.setState({tagWords})}
                                value={this.state.tagWords}
                            />

                            <AppInput
                                height={50}
                                width={wp(90)}
                                placeholder={'Price'}
                                placeholderTextColor={colors.placeholder_text_color}
                                colortextInput={colors.black}
                                borderWidth={1}
                                onChangeText={(price) => this.setState({price})}
                                value={this.state.price}
                                keyboardType={'numeric'}
                            />

                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>

            </View>
        );
    }
}


