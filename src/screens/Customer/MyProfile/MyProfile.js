//================================ React Native Imported Files ======================================//

import React from 'react';
import {View,Text,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {AirbnbRating} from 'react-native-ratings';
import auth from '@react-native-firebase/auth';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader';
import images from '../../../../assets/images';
import styles from './style';
import AppLoading from '../../../Components/AppLoading';
import FirebaseHelper from '../../../firebase/FirebaseHelper';


export default class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            userId: auth().currentUser.uid,
            imageUrl:'',
            name:'',
            rating:'',
            complete: 0,
            cancel: 0,
            loading:false,
        }
    }

    componentDidMount() {
        this.focusListner = this.props.navigation.addListener('focus', () => {
            this.getUserData();
            this.getUserJobsCompleted();
        });
    }


    componentWillUnmount() {
        this.focusListner();
    }

    fetchMessages = () => {
        FirebaseHelper.fetchChat((resp) => {
            resp._docs.map((map) => {
                if( map._data.user._id === this.state.userId)
                {
                    let object = {
                        _id :   this.state.userId,
                        avatar: this.state.urls,
                        name:   this.state.name ,
                    }
                    FirebaseHelper.updateAvatar(map.id,object);
                }
            })
        })
    }


    getUserJobsCompleted = () => {
        let completed = 0;
        let cancelled = 0;
        FirebaseHelper.completeServices((response) => {
            if ((response === undefined) || (response._docs.length < 1)) {
                this.setState({
                    loading: false,
                });
            }else {
                response.forEach((resp) => {
                    if(resp._data.bidding.length > 0)
                    {
                        if(resp._data.userId === this.state.userId){
                            if(resp._data.status === 'Cancelled'){
                                cancelled = cancelled + 1;
                            }else if(resp._data.status === 'Job Completed'){
                                completed = completed + 1;
                            }
                        }
                    }
                })
                this.setState({
                    complete: completed,
                    cancel: cancelled,
                })
            }
        })
    }


    getUserData = () => {
        this.setState({loading: true})
        let {userId} = this.state;
        FirebaseHelper.getUserProfile(userId, (response) => {
            if (response === undefined) {
                this.setState({loading: false});
            } else {
                this.setState({
                    imageUrl: response._data.imageUrl,
                    name: response._data.name,
                    rating: response._data.rating,
                    email: response._data.email,
                    loading:false
                });
            }
        })
    }


    render() {
        return(
            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}
                <AppHeader
                    title={'My Profile'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                    rightIconOnePath={images.ic_EditPen}
                    onRightIconPress={()=>this.props.navigation.navigate("EditProfile",{
                        name:this.state.name,
                        rating:this.state.rating,
                        imageUrl:this.state.imageUrl
                    })}
                />

                <View style={styles.upperView}>

                    <View>
                        <Text style={[styles.titleUpperView,{fontSize:wp(3.5),fontFamily:'Roboto-Medium'}]}>Jobs Completed</Text>
                        <Text style={styles.numberTextUpperView}>{this.state.complete}</Text>
                    </View>

                    <View>
                        <Image style={[styles.imgUpperView,{marginTop:10}]}
                               source={{uri: this.state.imageUrl}}
                        />
                    </View>

                    <View>
                        <Text style={[styles.titleUpperView,{fontSize:wp(3.5),fontFamily:'Roboto-Medium'}]}>Jobs Canceled</Text>
                        <Text style={styles.numberTextUpperView}>{this.state.cancel}</Text>
                    </View>
                </View>

                <View style={styles.bottomView}>
                    <Text style={styles.numberTextUpperView}>{this.state.name}</Text>
                    <Text style={{fontSize:hp(2),paddingTop:'1%'}}>{this.state.email}</Text>
                    <View style={styles.starView}>
                        <AirbnbRating
                            count={5}
                            style={{alignItems:'center'}}
                            reviewSize={0}
                            defaultRating={this.state.rating}
                            size={24}
                            isDisabled={true}
                            showRating={false}
                        />
                    </View>

                    <Text style={styles.textBottom}>-Everything Fine</Text>
                    <Text style={styles.text}>-Canceled Job 30 Min</Text>
                    <Text style={styles.text}>-Friendly, No issues</Text>

                </View>




            </View>

        );
    }
}



