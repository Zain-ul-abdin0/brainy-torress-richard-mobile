//================================ React Native Imported Files ======================================//

import React from 'react';
import {
    View,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location';

//================================ Local Imported Files ======================================//

import styles from './style';
import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import colors from '../../../../assets/colors';
import AppLoading from '../../../Components/AppLoading';
import images from "../../../../assets/images";


export default class Directions extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            coordinates: [
                {
                    latitude: this.props.route.params.latitude,
                    longitude: this.props.route.params.longitude,
                },
                {
                    latitude: 37.78999930975220,
                    longitude: -122.4344,
                },
            ],
        };
    }

    componentDidMount() {
        this.getUserLocation();
    }


    getUserLocation = async() => {
        this.setState({loading:true})
        let {coordinates} = this.state;
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then((location) => {
                coordinates[1].latitude = location.latitude;
                coordinates[1].longitude = location.longitude;

                this.setState({
                    coordinates,
                    loading: false,
                });

            })
            .catch((error) => {
                this.setState({loading:false})
                // alert("Location Accessing failed");
            })
    }


    render() {
        return (
            <View style={styles.viewStyle}>
                {AppLoading.renderLoading(this.state.loading)}
                <AppHeader
                    title={'Directions'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />


                <MapView style={styles.mapStyle}
                         initialRegion={{
                             latitude: 37.78825,
                             longitude: -122.4324,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}
                >

                    <MapView.Marker coordinate={this.state.coordinates[0]}/>
                    <MapView.Marker coordinate={this.state.coordinates[1]}/>
                    <MapViewDirections
                        origin={this.state.coordinates[0]}
                        destination={this.state.coordinates[1]}
                        apikey={'AIzaSyAxhF267Ltfd02AIYhRAxYTe1a0eRyvocI'}
                        strokeWidth={3}
                        strokeColor="hotpink"
                    />
                </MapView>

                <View style={styles.btnView}>

                    <Button
                        height={hp(6)}
                        width={wp(90)}
                        buttonText={'Give Directions'}
                        bgColor={colors.app_color}
                        // onPress={() => this.props.navigation.navigate('')}
                    />

                </View>



            </View>
        );
    }
}

