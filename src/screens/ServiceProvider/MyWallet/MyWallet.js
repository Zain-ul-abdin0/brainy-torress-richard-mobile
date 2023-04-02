//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import BankAccountComponent from '../../../Components/BankAccountComponent/BankAccountComponent';
import styles from './style';
import FirebaseHelper from '../../../firebase/FirebaseHelper';
import AppLoading from '../../../Components/AppLoading';


export default class MyWallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            id: '',
            price:55,
            newArray:[],
            loading:false,
            items: [
                {
                    id: 0,
                    image:images.img_bank,
                    title:'Bank of Pakistan',
                    text:'Account No: **** **** 3214',
                },
                {
                    id: 1,
                    image:images.img_bank,
                    title:'Bank of India',
                    text:'Account No: **** **** 3214',
                },

                {
                    id: 2,
                    image:images.img_bank,
                    title:'Bank of America',
                    text:'Account No: **** **** 3214',
                },

            ],

        }
    }

    payoutCash = () => {
        if(this.props.route.params.fromHome === true) {
            alert()
            Alert.alert(
                "Withdraw Cash",
                "Are you sure you want to Withdraw?",
                [
                    {
                        text: "No",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {text: "Yes", onPress: () => this.confirmPayout()}
                ]
            );
        }else if(this.props.route.params.fromHome === false){
            alert('Payout Done')
            this.props.navigation.navigate('HomeScreen')

        }
    }


    confirmPayout = () => {
        this.setState({loading:true})
        let tempArray=[];
        let { id,userId } = this.state;
        this.props.route.params.item.bidding.map((bid) => {
            if(bid.userId === userId){
                tempArray.push({
                    name:bid.name,
                    bid:bid.bid,
                    image:bid.image,
                    userId: bid.userId,
                    status:"Payout Done"
                })
            }else{
                tempArray.push(bid)
            }
        })
        this.setState({newArray:tempArray},() => {
            // FirebaseHelper.onSendNotifications(
            //     this.props.route.params.item.userFcmToken,
            //     "Payout Done",
            //     `${this.state.name} withdraw the cash`,
            //     () => {
            //         let object = {
            //             createdAt: new Date(),
            //             message: `${this.state.name} withdraw cash`,
            //             title: 'Job Confirmation Pending',
            //             receiverId: this.props.route.params.item.userId,
            //         };
            //         FirebaseHelper.createNotification(object).then(() => {
                        FirebaseHelper.acceptService(id, this.state.newArray, 'Job Completed').then(() => {
                            this.setState({loading:false},() => {
                                alert("Job Closed")
                                this.props.navigation.navigate('HomeScreen')
                            })
                        })

                //     })
                // })
        })
    }


    _renderItem = item => {
        return  (
            <BankAccountComponent
                image={item.image}
                title={item.title}
                text={item.text}
            />
        );
    };


    componentDidMount() {
        this.checkData();
    }

    checkData = () => {
        if(this.props.route.params.fromHome === true) {
            this.setState({
                id: this.props.route.params.item.id,
                price: this.props.route.params.item.price,
            })
        }else if(this.props.route.params.fromHome === false){

        }
    }


    addOtherBank = () => {
        if(this.props.route.params.fromHome === true) {
            this.props.navigation.navigate('AddCard',{
                item: this.props.route.params.item,
                fromWallet:true
            })
        }else if(this.props.route.params.fromHome === false){
            this.props.navigation.navigate('AddCard',{
                fromWallet:false
            })
        }
    }

    render() {
        console.log('this.props',this.props)
        return (
            <View style={styles.viewStyle}>
                {AppLoading.renderLoading(this.state.loading)}
                <AppHeader
                    title={'My Wallet'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />

              <View style={{
                  height: hp(17),
                  width: wp(92),
                  borderWidth:1,
                  borderColor:colors.blue,
                  marginTop: hp(2),
                  borderRadius:hp(0.5),
                  alignItems: 'center',
              }}
              >
                  <Text style={styles.heading}>Wallet balance</Text>
                  <Text style={styles.subHeading}>${this.state.price}.00</Text>

                  <Button
                      height={hp(4)}
                      width={wp(85)}
                      buttonText={'Cash Out'}
                      bgColor={colors.app_color}
                      marginTop={hp(2)}
                      onPress={() => this.payoutCash()}
                  />


              </View>

                <View style={styles.headingView}>
                    <Text style={{fontSize:hp(2)}}>Bank Accounts</Text>
                </View>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        data={this.state.items}
                        renderItem={({item}) => this._renderItem(item)}
                    />


                <View style={styles.btnView}>
                    <Button
                        height={hp(5)}
                        width={wp(90)}
                        buttonText={'Add Another Bank Account'}
                        bgColor={colors.app_color}
                        onPress={() => this.addOtherBank()}
                    />
                </View>



            </View>

        );
    }
}

