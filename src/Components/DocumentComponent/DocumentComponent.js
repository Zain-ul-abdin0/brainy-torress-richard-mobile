import React from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import images from "../../../assets/images";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CollapseComponent from '../collapse/CollapseComponent';
import styles from './style';
import Button from '../Button/Button';
import Dropdown from "../ModalDropdown";



export default class DocumentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(

            <View style={styles.mainContainer}>

                <View style={styles.container}>

                 <View style={styles.innerUpperView}>
                     <Image style={styles.imgUpper}
                            source={images.img_file} />
                     <Button
                         height={hp(3.5)}
                         width={wp(75)}
                         buttonText={this.props.title}
                         bgColor={'#57cc32'}
                         fontSize={13.5}
                         onPress={this.props.onPress}
                     />
                 </View>

                    <View style={styles.innerMiddleView}>

                        <Image style={styles.imgMiddle}
                               source={images.icn_calendar} />

                        <Text style={styles.text}>Expiration Date</Text>

                    </View>

                    <View style={styles.innerBottomView}>

                        <Dropdown
                            dropdownStyle = {styles.dropdownStyle}
                            dropdownOptionsStyle={styles.dropdownLeftOptionsStyle}
                            buttonTextStyle={styles.dropdownButtonText}
                            defaultButtontext={'Month'}
                            // renderButtonText={(rowDta) => {return (rowDta.name)}}
                            options={['Jan','Feb','Mar']}
                            // renderRow={(instance) => this.renderRowForInstance(instance)}
                            // onSelect = {(index,value) => {this.onDropSelect(value);}}
                        />

                        <Dropdown
                            dropdownStyle = {styles.dropdownMiddle}
                            dropdownOptionsStyle={styles.dropdownCenterOptionsStyle}
                            buttonTextStyle={styles.dropdownButtonText}
                            defaultButtontext={'Day'}
                            // renderButtonText={(rowDta) => {return (rowDta.name)}}
                            options={'123456789'}
                            // renderRow={(instance) => this.renderRowForInstance(instance)}
                            // onSelect = {(index,value) => {this.onDropSelect(value);}}
                        />
                        <Dropdown
                            dropdownStyle = {styles.dropdownRight}
                            dropdownOptionsStyle={styles.dropdownRightOptionsStyle}
                            buttonTextStyle={styles.dropdownButtonText}
                            defaultButtontext={'Year'}
                            // renderButtonText={(rowDta) => {return (rowDta.name)}}
                            options={['2000','2001','2002']}
                            // renderRow={(instance) => this.renderRowForInstance(instance)}
                            // onSelect = {(index,value) => {this.onDropSelect(value);}}
                        />

                    </View>


                </View>


            </View>


        );
    }
}


