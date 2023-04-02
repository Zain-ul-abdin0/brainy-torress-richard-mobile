import React from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SimpleButton from '../SimpleButton';
import styles from './style';
import Button from '../Button/Button';
import colors from '../../../assets/colors';
import images from '../../../assets/images';



export default class GardenToolComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return(

            <View style={styles.mainContainer}>

                <View
                    style={styles.container}>


                  <View style={styles.upperView}>


                      <Text style={styles.heading}>{this.props.name}</Text>
                      <Text style={styles.description}>Date: {this.props.date}, {this.props.time}</Text>

                  </View>

                  <View style={styles.lineView} />

                  <View  style={styles.middleView}>

                      { this.props.textView ?
                      <View style={styles.textView}>

                          <Text style={styles.textBid}>{this.props.textBid}</Text>
                          <Text style={styles.textPrice}>{this.props.textPrice}</Text>

                      </View>:null
                      }

                      { this.props.imageView ?
                      <View style={styles.imageView}>

                          {this.props.imageMessage && <View style={styles.viewType}>
                              <Text style={styles.textType}>{this.props.type}</Text>
                              <TouchableOpacity
                                  onPress={this.props.onPressImg}
                              >
                                  <Image style={{height: hp(3), width: wp(5.5), resizeMode: 'contain'}}
                                         source={images.icn_message_alert}
                                  />
                              </TouchableOpacity>
                          </View>}

                          <View style={{flexDirection:'row',alignItems:'center'}}>
                              <Image style={styles.msgImage} source={{uri: this.props.otherPersonImage}}/>

                              <View style={{paddingLeft:'5%'}}>
                                  <Text>{this.props.name}</Text>
                                  <Text style={{fontSize:hp(1.7),fontWeight:'bold',color:colors.Green_color}}>${this.props.price}.00</Text>

                              </View>
                          </View>

                      </View>:null
                      }

                      <View style={[styles.viewStatus,{width: this.props.onlyStatus ? '100%' : '50%'}]}>

                          <Text style={{fontSize:wp(4.7),fontFamily:'Roboto-Regular'}}>Status</Text>
                          <Text style={{paddingTop:'4%',fontSize:13,color:colors.red_color}}>{this.props.status}</Text>
                      </View>


                  </View>

                    <View style={styles.bottomView}>
                        <Button
                            height={hp(5)}
                            width={wp(80)}
                            buttonText={'View Details'}
                            bgColor={colors.app_color}
                            onPress={this.props.onPress}
                            fontSize={15}
                            textColor={colors.white}
                        />
                    </View>


                </View>

            </View>

        );
    }
}


