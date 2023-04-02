import React from 'react';
import {
    View,
    FlatList,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../../../assets/images';
import SetupPaymentComponent from '../../../Components/SetupPaymentComponent/SetupPaymentComponent';
import styles from './style';
import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import colors from '../../../../assets/colors';


export default class SetupPayment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            items: [
                {
                    id: 0,
                    image:images.icn_visa,
                    title:'623 **** **** 6524',
                    text:'Visa',
                    img:images.delete,
                },
                {
                    id: 1,
                    image:images.icn_mastercard,
                    title:'Client',
                    text:'MasterCard',
                    img:images.delete,
                },

                {
                    id: 2,
                    image:images.icn_visa,
                    title:'623 **** **** 6524',
                    text:'Paypal',
                    img:images.delete,
                },

            ],

        }
    }

    _renderItem = item => {
        return  (
            <SetupPaymentComponent
                image={item.image}
                title={item.title}
                text={item.text}
                img={item.img}
                rightImageView={true}
            />
        );
    };


    render() {
        return (

            <View style={styles.viewStyle}>

                <AppHeader
                    title={'Setup Payment'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />


                    <View style={styles.viewFlat}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            data={this.state.items}
                            renderItem={({item}) => this._renderItem(item)}
                        />
                    </View>

               <View style={styles.btnView}>
                   <Button
                       height={hp(5)}
                       width={wp(90)}
                       buttonText={'Add New Card'}
                       bgColor={colors.app_color}
                       onPress={() => this.props.navigation.navigate('AddCard',{
                           fromWalletUser:false
                       })}
                       fontSize={16}
                       textColor={colors.white}
                   />
               </View>




            </View>

        );
    }
}

