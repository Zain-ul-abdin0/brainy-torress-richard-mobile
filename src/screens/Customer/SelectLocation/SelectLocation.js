//================================ React Native Imported Files ======================================//

import React from 'react';
import {
    View,
    Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoder';

//================================ local Imported Files ======================================//

import Button from '../../../Components/Button/Button';
import colors from '../../../../assets/colors';
import styles from './style';
import AppHeader from '../../../Components/AppHeader';
import images from "../../../../assets/images";


export default class SelectLocation extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            region: {
                latitudeDelta: null,
                longitudeDelta: null,
                latitude: 37.78825,
                longitude: -122.4324,
            },

        }
    }


    onRegionChange = (region) => {
        this.setState({
            region
        }, () => {
            this.setState({
                latitude: region.latitude,
                longitude: region.longitude
            })
        })
    };


    onDone = () => {
        let { latitude,longitude } = this.state;
            let coordinate = {
                lat: latitude,
                lng: longitude,
            };

            Geocoder.geocodePosition(coordinate).then(res => {
                let address = res[0].formattedAddress
                this.props.route.params.onGoBack({address:address,latitude:this.state.latitude,longitude:this.state.longitude})
                this.props.navigation.goBack();
            })
    }


    render() {
        return (
            <View style={styles.viewStyle}>
                <AppHeader
                    onLeftIconPress={() => this.props.navigation.goBack()}
                    title={'Select Location'}
                    leftIconPath={images.ic_back}
                />

                <MapView
                    style={styles.mapStyle}
                    onRegionChangeComplete={this.onRegionChange}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />

                <View style={styles.fixMarker}>
                    <Image
                        source={images.marker}
                        style={{ tintColor:colors.app_color,height: 40, width: 40, resizeMode: 'contain', }} />
                </View>


                {/*<View style={styles.input}>*/}
                {/*    <AppInput*/}
                {/*        width={wp(90)}*/}
                {/*        leftIconPath={images.icn_search_grey}*/}
                {/*        placeholder={'Enter Location'}*/}
                {/*        borderWidth={1}*/}
                {/*        marginTop={0.1}*/}
                {/*    />*/}

                {/*</View>*/}

                <View style={styles.btnView}>
                    <Button
                        height={hp(5)}
                        width={wp(90)}
                        buttonText={'Done'}
                        bgColor={colors.app_color}
                        textColor={colors.white}
                        onPress={this.onDone}
                    />

                </View>
            </View>
        );
    }
}

