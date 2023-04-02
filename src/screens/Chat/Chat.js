import React from 'react';
import {View,StyleSheet,} from 'react-native';
import {Bubble, GiftedChat} from 'react-native-gifted-chat/lib/index';
import styles from "./style";
import images from "../../../assets/images";
import AppHeader from '../../Components/AppHeader';


export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
    }
    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }


    renderBubble(props) {
        return ( <Bubble {...props}
                         wrapperStyle={{
                             left: {
                                 backgroundColor: 'white',
                             },
                             right: {
                                 backgroundColor: '#43464B'
                             }
                         }} />
                         )}



    render() {
        return(
            <View style={styles.mainContainer}>

                <AppHeader
                    title={'Harriet Hunt'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />

                <GiftedChat
                    renderBubble={this.renderBubble}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}

                />


            </View>

        );
    }
}




