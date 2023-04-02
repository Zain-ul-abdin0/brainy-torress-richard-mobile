import React from 'react';
import {
    View,
    FlatList,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../../../assets/images';
import DocumentComponent from '../../../Components/DocumentComponent/DocumentComponent';
import styles from './style';
import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';


export default class MyDocuments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            items: [
                {
                    id: 0,
                    title: 'Upload Drive\'s License' ,
                },

                {
                    id: 1,
                    title: 'Upload Selfie with License',
                },

                {
                    id: 2,
                    title:'Upload Vehicle Registration',
                },
                {
                    id: 3,
                    title:'Upload Proof of Insurance',
                },

            ],

        }
    }

    _renderItem = item => {
        return  (
            <DocumentComponent
                title={item.title}
                // onPress={() => this.props.navigation.navigate('AddCard')}
            />
        );
    };



    render() {
        return (

            <View style={styles.viewStyle}>

                <AppHeader
                    title={'My Documents'}
                    leftIconPath={images.ic_back}
                    onLeftIconPress={() => this.props.navigation.goBack()}
                />



                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    data={this.state.items}
                    renderItem={({item}) => this._renderItem(item)}
                />


                <View style={styles.upperBtnView}>

                    <Button
                        height={hp(5)}
                        width={wp(90)}
                        buttonText={'Save'}
                        onPress={() => this.props.navigation.navigate('AddCard')}
                    />
                </View>


                <View style={styles.btnView}>

                    <Button
                        height={hp(5)}
                        width={wp(90)}
                        buttonText={'Verify Account'}
                        bgColor={'#3275cc'}
                        onPress={() => this.props.navigation.navigate('AddCard')}
                    />
                </View>



            </View>

        );
    }
}

