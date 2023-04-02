//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {AirbnbRating} from 'react-native-ratings';



export default class BidderReviewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {
        return(

            <TouchableOpacity style={styles.mainContainer}
                onPress={this.props.onPress}
            >

                <View style={styles.container}>

                    <View style={styles.innerViewLeft}>
                        <View style={{paddingRight:'6%'}}>
                            <Image style={styles.imgLeft}
                                   source={this.props.image}
                            />
                        </View>
                        <View>
                            <Text>
                                {this.props.name}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.innerViewRight}>
                        <View>
                            <Text style={styles.textRight}>
                                {this.props.price}
                            </Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <AirbnbRating
                                count={5}
                                style={{alignItems:'center'}}
                                reviewSize={0}
                                defaultRating={this.props.rating}
                                size={25}
                                isDisabled={true}
                                showRating={false}
                            />
                        </View>

                    </View>

                </View>

            </TouchableOpacity>

        );
    }
}



