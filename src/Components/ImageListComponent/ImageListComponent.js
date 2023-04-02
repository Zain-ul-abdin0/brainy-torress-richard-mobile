//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Image} from 'react-native';

//================================ React Native Imported Files ======================================//

import styles from './style';


export default class ImageListComponent extends React.Component {


    render() {
        return(

                <View
                    style={styles.mainContainer}>
                            <Image style={styles.image}
                                   source={{uri: this.props.image}}
                            />

                </View>


        );
    }
}






