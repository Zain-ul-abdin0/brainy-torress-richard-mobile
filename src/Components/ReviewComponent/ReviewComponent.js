import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';


export default class ReviewComponent extends React.Component {

    render() {
        return(

            <View>
            <View style={styles.mainContainer}>

                <View style={styles.container}>
                    <View style={styles.containerInnerUpperView}>

                        <View style={{paddingLeft:'7%'}}>
                            <Text style={styles.textUpperView}>"{this.props.text}"</Text>
                        </View>

                    </View>

                    <View style={styles.containerInnerBottomView}>
                        <Image style={styles.img}
                               source={this.props.image}
                        />

                        <Text style={{paddingLeft:'3%'}}>{this.props.rate}</Text>

                    </View>

                </View>

            </View>

            </View>

        );
    }
}






