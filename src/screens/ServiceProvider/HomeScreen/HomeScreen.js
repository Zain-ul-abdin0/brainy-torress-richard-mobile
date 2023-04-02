//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Image, TouchableOpacity, Text,Platform} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { getDistance } from 'geolib';
import auth from '@react-native-firebase/auth';
import GetLocation from 'react-native-get-location';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader';
import Dropdown from "../../../Components/ModalDropdown";
import styles from './style';
import images from '../../../../assets/images';
import FirebaseHelper from '../../../firebase/FirebaseHelper';
import AppLoading from '../../../Components/AppLoading';
import colors from '../../../../assets/colors';


export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            currentLatitude:  0,
            currentLongitude: 0,
            radius:1000,
            minDistance: 1000,
            maxDistance: 10000,
            categories:[],
            markers:[],
            date:'Date',
            loading:false,
            DateTimePickerModal:false,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta:  0.18235285963591252,
                longitudeDelta: 0.3401634469628192,
            },
            markerComponent:[],
            tempMarkers:[],
            selectCategory:'',
            selectDistance:null,
        }
    }


    componentDidMount() {
        this.focusListner = this.props.navigation.addListener('focus', () => {
            this.getCurrentPosition();
            this.getCategories();
            this.getLatLong();
        });
    }


    componentWillUnmount() {
        this.focusListner();
    }


    getLatLong = () => {
        let { userId } = this.state;
        let tempArray = [];
        FirebaseHelper.getAllJobsExceptMyJobs(userId,(resp) => {
            if (resp._docs.length === 0) {
                this.setState({
                    loading: false
                })
            } else {
                resp.forEach((response) => {
                    if(response._data.status === 'Waiting for Service Provider')
                        tempArray.push({
                            docId:         response.id,
                            latitude:      response._data.latitude,
                            longitude:     response._data.longitude,
                            userId:        response._data.userId,
                            catName:       response._data.catName,
                            createdAt:     moment(response._data.createdAt.toDate()).format('MMM DD YYYY'),
                        });
                });
                this.setState({
                    markers: tempArray,
                });
            }
        })
    }


    getCurrentPosition = async() => {
                this.setState({loading: true})
                await GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 15000,
                })
                    .then((location) => {
                        this.setState({
                            currentLatitude: location.latitude,
                            currentLongitude: location.longitude,
                            region:{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta:  0.18235285963591252,
                                longitudeDelta: 0.3401634469628192,
                            },
                            loading: false,
                        });
                    })
                    .catch(error => {
                        this.setState({loading: false})
                        const {code, message} = error;
                        console.warn(code, message);
                    })
    }


    getCategories = () => {
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
                })
            }
        })
    }


    onSelectCategory = (value) => {
        let { userId } = this.state;
        let tempArray = [];
            FirebaseHelper.getAllJobsExceptMyJobs(userId,(resp) => {
                if (resp._docs.length === 0) {
                    this.setState({
                        loading: false
                    })
                } else {
                    resp.forEach((response) => {
                        if((response._data.catName === value) && (response._data.status === 'Waiting for Service Provider'))
                        tempArray.push({
                            docId:         response.id,
                            latitude:      response._data.latitude,
                            longitude:     response._data.longitude,
                            userId:        response._data.userId,
                            catName:       response._data.catName,
                            createdAt:     response._data.createdAt,
                        });
                    });
                    this.setState({
                        markers: tempArray,
                    });
                }
            })
    }


    onSelectDistance = (val) => {
        let {markers} = this.state;
        this.getLatLong();
        setTimeout(() => {
            let tempMarker = [];
            this.setState({
                radius:val * 1000,
                loading:false,
            })

            markers.map((marker) => {
                let dis = getDistance(
                    {latitude: this.state.currentLatitude, longitude: this.state.currentLongitude},
                    {latitude: marker.latitude, longitude: marker.longitude},
                )
                if(dis <= this.state.radius) {
                    tempMarker.push({
                        docId:         marker.id,
                        latitude:      marker.latitude,
                        longitude:     marker.longitude,
                        userId:        marker.userId,
                        catName:       marker.catName,
                        createdAt:     marker.createdAt,
                    });
                }else{
                    this.setState({loading:false})
                    console.log("No data found");
                }
            })
            this.setState({
                markers:tempMarker
            });
        },1000)

    }


    onConfirmDate = (value) => {
        let finalDate = value.toString().substring(3,15);
        this.setState({date:finalDate,DateTimePickerModal:false},() => {
            this.onSelectDate(this.state.date)
        })
    }


    onCancelDate = () => {
        this.setState({DateTimePickerModal:false})
    }


    onPressDate= () => {
        this.setState({DateTimePickerModal:true})
    }


    onSelectDate = () => {
        let { markers,date } = this.state;
        let value = moment(date).format('MMM DD YYYY');
        this.getLatLong();
        setTimeout(() => {
            let tempMarker = [];
            markers.map((marker) => {
                if(marker.createdAt === value) {
                    tempMarker.push({
                        docId:         marker.id,
                        latitude:      marker.latitude,
                        longitude:     marker.longitude,
                        userId:        marker.userId,
                        catName:       marker.catName,
                        createdAt:     marker.createdAt,
                    });
                }else{
                    this.setState({loading:false})
                    console.log("No data found");
                }
            })
            this.setState({
                markers:tempMarker,
            });
        },1000)
    }



    render() {
        const nav = this.props.navigation;
        return (
            <View style={styles.viewStyle}>
                {AppLoading.renderLoading(this.state.loading)}
                <AppHeader
                    title={'Home'}
                    leftIconPath={images.ic_menu}
                    onLeftIconPress={() => nav.openDrawer()}
                />

                <View style={styles.upperView}>
                    <View style={styles.innerUpperView}>
                        <Dropdown
                            dropdownStyle = {styles.dropdownCategory}
                            dropdownOptionsStyle = {styles.dropdownCategoryOptionsStyle}
                            defaultButtontext = {'Category/Sub-Category'}
                            buttonTextStyle = {styles.dropdownButtonText}
                            marginTop = {0.0001}
                            options = {this.state.categories}
                            onSelect = {(index,value) => {this.onSelectCategory(value)}}
                        />

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProviderJobOrder',{
                            markerValue: false
                        })}>
                            <Image style={styles.img} source={images.ic_List2} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewLine}/>

                    <View style={styles.viewCollapse}>
                        <DateTimePickerModal
                            isVisible={this.state.DateTimePickerModal}
                            mode={'date'}
                            onConfirm = {this.onConfirmDate}
                            onCancel  = {this.onCancelDate}
                        />

                         <TouchableOpacity style={{height: Platform.OS === 'android' ? hp(5.6) : hp(4.5),width:wp(45),borderColor:colors.app_color,borderWidth:1,justifyContent:'center',alignSelf:'center',marginTop: Platform.OS === 'android' ? hp(2.1) : hp(1.7),borderRadius:wp(2)}} onPress={this.onPressDate}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:wp(1.5)}}>
                            <Text style={{alignSelf:'center',color:colors.placeholder_text_color,fontSize:wp(3.9),paddingLeft:wp(1)}}>{this.state.date}</Text>
                             <Image style={[styles.loginDropdownImages,{tintColor:colors.app_color}]} source={images.dropdown}/>
                            </View>
                            </TouchableOpacity>

                        <View style={{marginTop:wp(0.7)}}>
                        <Dropdown
                            dropdownStyle = {styles.dropdownStyle}
                            dropdownOptionsStyle={styles.dropdownRightOptionsStyle}
                            buttonTextStyle={styles.dropdownButtonText}
                            defaultButtontext={'Distance in Km'}
                            options={['1','2','3','4','5','6','7','8','9','10']}
                            onSelect = {(index,value) => {this.onSelectDistance(value)}}
                        />
                        </View>
                    </View>

                </View>
                <MapView
                    style={styles.mapStyle}
                    region={this.state.region}
                    onRegionChange={(region) => console.log("Region")}
                    showsUserLocation       = { true }
                    followUserLocation      = { true }
                    showsMyLocationButton   = { true }
                    loadingEnabled          = { true }
                >
                    <MapView.Circle
                        key = { (this.state.currentLongitude + this.state.currentLatitude).toString() }
                        center = {{
                            latitude:   this.state.currentLatitude,
                            longitude:  this.state.currentLongitude,
                        }}
                        radius = { this.state.radius ? this.state.radius : 0}
                        strokeWidth = { 1 }
                        strokeColor = { '#1a66ff' }
                        fillColor = { 'rgba(230,238,255,0.5)' }
                    />

                    {this.state.markers.map((marker) => (
                        <Marker
                            onPress={() => this.props.navigation.navigate('ProviderJobOrder',{
                                docId:marker.docId,
                                markerValue:true,
                            })}
                            key = { (marker.latitude + marker.longitude).toString() }
                            coordinate={{
                                latitude:   marker.latitude,
                                longitude:  marker.longitude,
                            }}
                            title={marker.catName}
                        />
                    ))}
                </MapView>

            </View>

        );
    }
}




