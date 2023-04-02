//================================ React Native Imported Files ======================================//

import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

//================================ local Imported Files ======================================//

import styles from './style';
import Swiper from '../../Components/swiper';
import images from '../../../assets/images';


export default class OnBoarding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newIndex:1,
            currentIndex:0,
            show:false,
        }
    }

    onIndexChanged(index){
        if(index !== 2)
        {
            this.setState({ currentIndex: index,show:false});
        }else{
            this.setState({ currentIndex: index,show:true});
        }
    }

    scrollItem(){
        if (this.state.currentIndex === 2){
            this.props.navigation.navigate('SignUpWith');
        } else {
            this.refs.swiper.scrollBy(1)
        }
    }

    render() {

        return (
            <View style={styles.main}>
                <View style={{flex: 4}}>
                    <Swiper
                        loop={false}
                        showsButtons={false}
                        paginationStyle={styles.pagination}
                        dotStyle={styles.dotStyle}
                        activeDotStyle={styles.activeDotStyle}
                        activeDotColor={'#fff'}
                        ref='swiper'
                        onIndexChanged={this.onIndexChanged.bind(this)}
                    >

                        <View style={styles.backgroundImage2}>
                            <View style={styles.viewUpper}/>
                            <Image style={{height:'50%',width:'50%',resizeMode:"contain",alignSelf:'center'}}  source={images.ic_logoSplash}/>

                            <View style={styles.viewMiddle}>
                              <Text style={styles.textHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. </Text>
                              <Text style={styles.text}>There are many variations of passages of Lorem Ipsum available,
                                  but the majority have suffered alteration in some form, by injected humour, or
                                  randomised words which don't look even slightly believable.</Text>
                            </View>
                            <View style={styles.viewBottom}>

                            </View>
                        </View>

                        <View style={styles.backgroundImage2}>
                            <View style={styles.viewUpper}/>
                            <Image style={{height:'50%',width:'50%',resizeMode:"contain",alignSelf:'center'}}  source={images.ic_logoSplash}/>

                            <View style={styles.viewMiddle}>
                                <Text style={styles.textHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. </Text>
                                <Text style={styles.text}>There are many variations of passages of Lorem Ipsum available,
                                    but the majority have suffered alteration in some form, by injected humour, or
                                    randomised words which don't look even slightly believable.</Text>
                            </View>
                            <View style={styles.viewBottom}>

                            </View>
                        </View>

                        <View style={styles.backgroundImage2}>
                            <View style={styles.viewUpper}/>
                            <Image style={{height:'50%',width:'50%',resizeMode:"contain",alignSelf:'center'}}  source={images.ic_logoSplash}/>

                            <View style={styles.viewMiddle}>
                                <Text style={styles.textHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. </Text>
                                <Text style={styles.text}>There are many variations of passages of Lorem Ipsum available,
                                    but the majority have suffered alteration in some form, by injected humour, or
                                    randomised words which don't look even slightly believable.</Text>
                            </View>
                            <View style={styles.viewBottom}>

                            </View>
                        </View>

                    </Swiper>
                </View>


                {this.state.show === false ? <View style={{flex: 1, alignItems: 'center'}}>

                    <TouchableOpacity style={styles.addButton} onPress={() => this.scrollItem()}>
                        <Text style={styles.textAddButton}>NEXT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchSkip}
                                      onPress={() => this.props.navigation.navigate('SignUpWith')}>
                        <Text style={styles.textSkip}>SKIP</Text>
                    </TouchableOpacity>

                </View> : null}

                {this.state.show === true ? <View style={{flex: 1, alignItems: 'center'}}>

                    <TouchableOpacity style={styles.addButton} onPress={() => this.scrollItem()}>
                        <Text style={styles.textAddButton}>Done</Text>
                    </TouchableOpacity>

                </View> : null}
            </View>

        );


    }
}
