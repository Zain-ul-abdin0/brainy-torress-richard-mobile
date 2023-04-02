import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';

export default class BiddersComponent extends React.Component {
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

                     <View style={styles.innerView}>
                         <View style={{paddingRight:'8%'}}>
                             <Image style={styles.imgLeft}
                                    source={{uri: this.props.imgLeft}}
                             />
                         </View>
                         <View>
                             <Text>
                                 {this.props.textLeft}
                             </Text>
                         </View>

                     </View>

                     <View style={styles.innerView}>
                         <View>
                             <Text style={styles.textRight}>
                                 $ {this.props.textRight}.00
                             </Text>
                         </View>

                         <View>
                             <TouchableOpacity
                             onPress={this.props.onChatPress}
                             >
                             <Image style={styles.imgRight}
                                    source={this.props.imgRight}
                             />
                             </TouchableOpacity>
                         </View>

                     </View>

                 </View>

            </TouchableOpacity>

        );
    }
}


