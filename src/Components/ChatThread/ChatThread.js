
//================================ React Native Imported Files ======================================//

import React from 'react';
import { View, Text,Image,TouchableOpacity } from "react-native";

//================================ Local Imported Files ======================================//

import styles from "./style";


class ChatThread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.mainContainer}
                onPress={this.props.onPress}
            >
                <View style={{ flexDirection: "row" }}>
                    <Image
                        style={styles.imageStyle}
                        source={{ uri: this.props.image }}
                    />
                    <View style={styles.upperViewStyle}>
                        <View style={styles.bottomView}>
                            <Text
                                style={styles.userName}
                            >
                                {this.props.name}
                            </Text>
                            <Text style={styles.timeAgo}>

                                {this.props.timeAgo}

                            </Text>
                        </View>
                        <Text style={styles.lastMessage}>
                            {this.props.lastmessage}
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomView} />
            </TouchableOpacity>
        );
    }
}
export default ChatThread;
