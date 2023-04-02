//================================ React Native Imported Files ======================================//

import React from 'react';
import {View,Text, Image, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//================================ React Native Imported Files ======================================//

import styles from './style';
import Button from '../Button/Button';
import colors from '../../../assets/colors';


export default class DriverGardenToolComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return(

            <View style={styles.mainContainer}>

                <View style={styles.container}>


                    <View style={styles.upperView}>


                        <Text style={styles.heading}>{this.props.name}</Text>
                        <Text style={styles.description}>Pick Up Date: <Text style={styles.textTime}>{this.props.date}, {this.props.time}</Text></Text>

                    </View>

                    <View style={styles.lineView} />

                    { this.props.textView &&
                    <View  style={styles.textMiddleView}>


                     <View style={{flexDirection:'row'}}>
                         <View style={styles.textView}>
                             <View style={styles.viewInnerTextView}>
                                 <Image style={styles.imgInnerTextView}
                                        source={{uri: this.props.image}}
                                 />
                                 <Text style={{paddingLeft:'5%'}}>{this.props.userName}</Text>
                             </View>

                         </View>

                         <View style={styles.bottomViewInnerTextView}>
                             <Text style={styles.textAvgBid}>Payment</Text>
                             <Text style={styles.textBid}>${this.props.price}.00</Text>
                         </View>
                     </View>

                        <View style={styles.lineView} />

                        <Text style={styles.textStatus}>Status: <Text style={styles.innerTextStatus}>{this.props.status}</Text></Text>

                        <View style={styles.textBottomView}>
                            <Button
                                height={hp(5)}
                                width={wp(85)}
                                buttonText={'View Details'}
                                bgColor={colors.red_color}
                                onPress={this.props.onPress}
                                fontSize={15}
                            />
                        </View>


                    </View>
                    }
                    { this.props.imageView &&
                    <View  style={styles.imageMiddleView}>

                       <View style={styles.imgViewInnerView}>

                           <View style={styles.imageView}>

                               {this.props.imageMessage && <View style={styles.viewType}>
                                   <Text style={styles.textType}>{this.props.type}</Text>
                                   <TouchableOpacity
                                       onPress={this.props.onPressImg}
                                   >
                                       <Image style={styles.msgImage}
                                              source={this.props.msgImage}
                                       />
                                   </TouchableOpacity>
                               </View>}

                               <View style={styles.viewImg}>
                                   <Image style={styles.img}
                                          source={{uri: this.props.img}}
                                   />

                                   <View style={{paddingLeft:'5%'}}>
                                       <Text>{this.props.name}</Text>
                                       <Text style={styles.textPrice}>${this.props.price}.00</Text>

                                   </View>
                               </View>


                           </View>


                           <View style={styles.viewImgStatus}>
                               <Text style={{fontSize:hp(2)}}>Status</Text>
                               <Text style={{color:colors.app_color,paddingTop:'4%'}}>{this.props.status}</Text>
                           </View>
                       </View>


                        <View style={styles.imageBottomView}>
                            <Button
                                height={hp(5)}
                                width={wp(85)}
                                buttonText={'View Details'}
                                bgColor={colors.app_color}
                                onPress={this.props.onPress}
                                // fontSize={15}
                            />
                        </View>


                    </View>
                    }



                </View>

            </View>

        );
    }
}





