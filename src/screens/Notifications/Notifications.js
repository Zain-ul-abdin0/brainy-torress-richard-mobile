//================================ React Native Imported Files ======================================//

import React from 'react';
import {View,FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

//================================ Local Imported Files ======================================//

import AppHeader from '../../Components/AppHeader';
import images from "../../../assets/images";
import NotificationComponent from "../../Components/NotificationComponent/NotificationComponent";
import styles from "./style";
import FirebaseHelper from '../../firebase/FirebaseHelper';


export default class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            items: [
                // {
                //     id: 0,
                //     image:images.ic_Check,
                //     title:'Drivename has accepted your pickup request.',
                //     text:'Click here to view details.',
                //     time:'2 hours ago'
                // },
                // {
                //     id: 1,
                //     image:images.ic_Times,
                //     title:'Drivename has accepted your pickup request.',
                //     text:'Click here to view details.',
                //     time:'2 hours ago'
                // },
                // {
                //     id: 2,
                //     image:images.ic_CreditCard2,
                //     title:'Drivename has accepted your pickup request.',
                //     text:'Click here to view details.',
                //     time:'2 hours ago'
                //
                //
                // },
                // {
                //     id: 3,
                //     image:images.ic_Times,
                //     title:'Drivename has accepted your pickup request.',
                //     text:'Click here to view details.',
                //     time:'2 hours ago',
                //     button:true,
                //
                //
                // },
                //
                //
            ],

        }
    }

    componentDidMount() {
        this.focusListner = this.props.navigation.addListener('focus', () => {
            this.getNotifications();
        });
    }


    componentWillUnmount() {
        this.focusListner();
    }


    getNotifications = () => {
        this.setState({loading:false})
        let { userId } = this.state;
        let tempArray = [];
        FirebaseHelper.getNotifications(userId,(response) => {
                if (response === undefined || response._docs.length === 0) {
                    this.setState({
                        loading: false,
                    });
                }else {
                    response.forEach((resp) => {
                        tempArray.push({
                            image:images.ic_Check,
                            title:resp._data.title,
                            text:resp._data.message,
                            time: moment(resp._data.createdAt.toDate()).fromNow(),
                            button:false,
                        })
                    })
                    this.setState({
                        items: tempArray,
                        loading:false
                    })
                }
        })
    }


    _renderItem = item => {
        return (
            <NotificationComponent
                title={item.title}
                image={item.image}
                time={item.time}
                text={item.text}
                buttons={item.button}
                // onPress={() => this.props.navigation.navigate('')}
            />

        );
    };


    render() {
        const nav = this.props.navigation;
        return (
            <View style={styles.main}>

                <AppHeader
                    title={'Notifications'}
                    leftIconPath={images.ic_menu}
                    onLeftIconPress={() => nav.openDrawer()}
                />



                <View style={styles.viewFlat}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        data={this.state.items}
                        renderItem={({item})=> this._renderItem(item)}
                    />
                </View>


            </View>
        );
    }
}





