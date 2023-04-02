//================================ React Native Imported Files ======================================//
import React, { Component } from 'react';
import { View,TouchableOpacity,Image } from 'react-native';

//================================ Local Imported Files ======================================//

import images from '../../../assets/images';
import styles from './Style';


class LicensePick extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {item,remove} = this.props;

        return (
            <View style={styles.mainContainer}>
                <Image
                    source={{ uri: item.uri }}
                    style={styles.imgBox}
                />
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.btn}
                    onPress={() => remove(item)}
                >
                    <Image
                        source={images.notification_cancel}
                        style={styles.cancleImage}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export default LicensePick;
