import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,FlatList} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../../../assets/images';
import MessageComponent from '../../../Components/MessageComponent/MessageComponent';
import styles from './style';
import AppHeader from '../../../Components/AppHeader';


export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    id: 0,
                    title:'Garden Tools',
                    text:'Jason Snoker',
                    imageLeft:images.avatar,
                    imageRight:images.icn_error_small,
                },
                {
                    id: 1,
                    title:'Old Sofa',
                    text:'Jason Snoker',
                    imageLeft:images.avatar,

                },
                {
                    id: 2,
                    title:'Garden Tools',
                    text:'Jason Snoker',
                    imageLeft:images.avatar,
                    imageRight:images.icn_error_small,
                },
                {
                    id: 3,
                    title:'Garden Tools',
                    text:'Jason Snoker',
                    imageLeft:images.avatar,
                },


            ],

        }
    }

    _renderItem = item => {
        return (
            < MessageComponent
                title={item.title}
                text={item.text}
                imageLeft={item.imageLeft}
                imageRight={item.imageRight}
                onPress={() => this.props.navigation.navigate('Chat')}
            />
        );
    };





    render() {
        const nav = this.props.navigation;
        return(

            <View style={styles.mainContainer}>
                <AppHeader
                    title={'Messages'}
                    leftIconPath={images.ic_menu}
                    onLeftIconPress={() => nav.openDrawer()}
                />



                <View style={styles.viewFlat}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        data={this.state.items}
                        renderItem={({item}) => this._renderItem(item)}
                    />
                </View>











            </View>

        );
    }
}



