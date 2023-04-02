//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Modal, FlatList} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import colors from '../../../../assets/colors';
import SetupPaymentComponent from '../../../Components/SetupPaymentComponent/SetupPaymentComponent';
import images from '../../../../assets/images';
import styles from './style';


export default class PaymentMethod extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            showAlert: false,
            price:this.props.route.params.price,
            items: [
                {
                    id: 0,
                    image:images.icn_visa,
                    title:'623 **** **** 6524',
                    text:'Visa',
                },
                {
                    id: 1,
                    image:images.icn_mastercard,
                    title:'Client',
                    text:'MasterCard',
                },
            ],
        }
    };

    componentDidMount() {
        this.getServiceDetails();
    }


    getServiceDetails = () => {
       this.setState({})
    }


    accept = () => {
        this.togglePrivacyAlertModal();
        this.props.navigation.navigate('JobOrder')
    }


    togglePrivacyAlertModal = () => {
        this.setState({ showAlert: !this.state.showAlert });
    };


    renderPrivacyAlert() {
        return (
            <View style={{flex: 1,borderWidth:1,borderColor:colors.black, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0, 0, 0, 0.5)",}}>
                <View style={{
                    width: wp('75%'),
                    height: hp('20%'),
                    backgroundColor: '#fff',
                    borderColor:'#fff',
                    borderWidth: 1,
                    borderRadius: 5,
                }}>


                    <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>


                        <Text style={{fontSize:wp('3.5%'),marginTop:wp('1%'),color:colors.black,}}>Payment has been processed</Text>
                        <Text style={{fontSize:wp('3.5%'),marginTop:wp('1%'),color:colors.black,}}>Reference #: 0938726387</Text>
                        <Text style={{fontSize:wp('3.5%'),marginTop:wp('1%'),color:colors.black,}}>A recipt has been sent to User@email.com</Text>


                    </View>

                    {/*Buttons*/}
                    <View
                        style={{flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{marginLeft: wp('2%',)}}

                        >

                            <TouchableOpacity  onPress={()=>this.accept()} style={{
                                width: wp('70%'), height: hp('5%'),
                                backgroundColor: 'red',
                                borderRadius: 25,
                                justifyContent: 'center', alignItems: 'center',
                                borderColor: colors.black,
                                borderWidth: 1,
                            }}>
                                <Text style={{color: colors.white, fontSize: wp('4%'),}}>Back to HomeScreen</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>


            </View>


        )
    }

    _renderItem = (item) => {
        return  (
            <SetupPaymentComponent
                image={item.image}
                title={item.title}
                text={item.text}
                img={item.img}
                rightImageView={false}
            />
        );
    };



    render() {
        return(
            <View style={styles.mainContainer}>


                <AppHeader
                    onLeftIconPress={() => this.props.navigation.goBack()}
                    title={'Payment Method'}
                    leftIconPath={images.ic_back}
                />


            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.upperView}>

                 <Text style={styles.upperViewText}>Choose the Credit Card/Debit Card you wish to use for payment</Text>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        data={this.state.items}
                        renderItem={({item}) => this._renderItem(item)}
                    />

                    {/*<View style={styles.viewMaster}>*/}

                    {/*    <View style={styles.viewCard}>*/}
                    {/*        <Image style={styles.image}*/}
                    {/*               source={images.icn_mastercard}*/}
                    {/*        />*/}
                    {/*        <View style={{paddingLeft:'7%'}}>*/}
                    {/*            <Text style={styles.headingCard}>6423 **** **** 6542</Text>*/}
                    {/*            <Text style={styles.subTextCard}>Mastercard</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}


                    {/*    <CheckBox />*/}


                    {/*</View>*/}

                    {/*<View style={styles.viewLine}>*/}
                    {/*    <View style={styles.line}/>*/}
                    {/*</View>*/}


                    {/*<View style={styles.viewVisa}>*/}

                    {/*    <View style={styles.viewCard}>*/}
                    {/*        <Image style={styles.image}*/}
                    {/*               source={images.icn_visa}*/}
                    {/*        />*/}
                    {/*        <View style={{paddingLeft:'7%'}}>*/}
                    {/*            <Text style={styles.headingCard}>6423 **** **** 6542</Text>*/}
                    {/*            <Text style={styles.subTextCard}>Visa</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}


                    {/*    <CheckBox />*/}

                    {/*</View>*/}

                </View>

                <View style={styles.bottomView}>

                    <Button
                        height={hp(5)}
                        width={wp(90)}
                        buttonText={'Add New Card'}
                        bgColor={colors.red_color}
                        onPress={() => this.props.navigation.navigate('SetupPayment')}
                    />

                    <Text style={styles.textDetailBottom}>
                        Note: By It is a long established fact that a reader will be distracted by
                        the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is that it has a
                        more-or-less normal distribution
                    </Text>

                    <View style={styles.viewTotalPrice}>
                        <View style={styles.processingFeeView}>
                        <View style={styles.innerViewProcessingFee}>
                            <Text style={styles.processingText}>Processing Fee</Text>
                            <Text style={styles.processingFeeText}>$5.00</Text>
                        </View>
                            <View style={styles.innerViewProcessingFee}>
                                <Text style={styles.processingText}>Price of Service</Text>
                                <Text style={styles.processingFeeText}>${this.state.price}.00</Text>
                            </View>
                        </View>

                        <View style={styles.totalPriceView}>
                            <Text style={styles.textTotal}>Total Price</Text>
                            <Text style={styles.totalHeading}>${this.state.price}.00</Text>
                        </View>
                    </View>

                    <Button
                        height={hp(5)}
                        width={wp(90)}
                        bgColor={colors.app_color}
                        buttonText={'Process Payment'}
                        onPress={this.togglePrivacyAlertModal}
                    />

                    <View style={styles.imgViewBottom}>

                        <Image style={styles.img} source={images.warning}/>

                        <Text style={{paddingLeft:'5%',fontFamily:'Roboto-Regular'}}>
                            {/*Note: By It is a long established fact that a reader will be distracted by*/}
                            {/*the readable content of a page when*/}
                            {/*looking at its layout.*/}
                            Note: If you choose to cancel service you will be charged a cancellation fee and will be
                            refunded the amount below.
                        </Text>
                    </View>

                    <View style={styles.line}/>

                    <View style={styles.viewLast}>
                        <Text style={[styles.textLastView,{color:colors.black,fontSize:wp(4),fontFamily:'Roboto-MediumItalic'}]}>Refund if service is canceled</Text>
                        <Text style={styles.textLastView}>$45.00</Text>

                    </View>

                    <Modal
                        visible={this.state.showAlert}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={this.togglePrivacyAlertModal}
                    >
                        {this.renderPrivacyAlert()}
                    </Modal>


                </View>



</ScrollView>


            </View>

        );
    }
}





