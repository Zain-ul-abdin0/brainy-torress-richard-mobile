import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';


export default class TabComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            leftBorderWidth:5,
            middleBorderWidth:0.5,
            rightBorderWidth:0.5,
            leftTextFontWeight:'normal',
            middleTextFontWeight:'normal',
            rightTextFontWeight:'normal',
            leftTextColor: '#000000',
            middleTextColor: '#000000',
            rightTextColor: '#000000',
            leftBottomColor: colors.red_color,
            middleBottomColor: colors.red_color,
            rightBottomColor: colors.red_color,

        }

    }

    onLeftPress=()=>{
        if(this.state.leftBottomColor === colors.white_smoke){
            this.setState({leftBottomColor:colors.app_color,middleBottomColor:colors.white_smoke,rightBottomColor:colors.white_smoke,leftTextFontWeight:'bold',middleTextFontWeight:'normal',rightTextFontWeight:'normal',leftTextColor:'#000000',middleTextColor:'#000000',rightTextColor:'#000000',leftBorderWidth:5,middleBorderWidth:1,rightBorderWidth:1,})
        }

        this.props.onLeftPress();
    };

    onMiddlePress=()=>{
        if(this.state.middleTextColor === '#000000' ){
            this.setState({leftBottomColor:colors.white_smoke,middleBottomColor:colors.app_color,rightBottomColor:colors.white_smoke,leftTextFontWeight:'normal',middleTextFontWeight:'bold',rightTextFontWeight:'normal',leftTextColor:'#000000',middleTextColor:'#000000',rightTextColor:'#000000',leftBorderWidth:1,middleBorderWidth:5,rightBorderWidth:1})
    }
        this.props.onMiddlePress();

    };

    onRightPress=()=>{
        if(this.state.rightTextColor === '#000000'){
            this.setState({leftBottomColor:colors.white_smoke,middleBottomColor:colors.white_smoke,rightBottomColor:colors.app_color,leftTextFontWeight:'normal',middleTextFontWeight:'normal',rightTextFontWeight:'bold',leftTextColor:'#000000',middleTextColor:'#000000',rightTextColor:'#000000',leftBorderWidth:1,middleBorderWidth:1,rightBorderWidth:5})
        }

        this.props.onRightPress();

    };

    render() {
        return(
            <View style={styles.mainContainer} >

           <View style={{flexDirection: 'row',justifyContent:"center",alignItems:"center" }}>


               <TouchableOpacity  onPress={()=>this.onLeftPress() } style={{backgroundColor:'transparent',
                   width:wp(33.3),
                   height:hp(7),
                   justifyContent:"center"
                   ,alignItems:"center",
                   borderBottomWidth:this.state.leftBorderWidth,
                   borderBottomColor:this.state.leftBottomColor,
               }}>

                   <Text style={{color:this.state.leftTextColor ,fontSize:wp(3.7),fontWeight:this.state.leftTextFontWeight}} >{this.props.leftText}</Text>

               </TouchableOpacity>



                   <TouchableOpacity onPress={()=>this.onMiddlePress()}  style={{backgroundColor:'transparent',
                       width:wp(33.3)
                       ,height:hp(7),
                       justifyContent:"center",
                       alignItems:"center",
                       borderBottomWidth:this.state.middleBorderWidth,
                       borderBottomColor:this.state.middleBottomColor
                   }}>
                       <Text  style={{color:this.state.middleTextColor,fontSize:wp(3.7),fontWeight:this.state.middleTextFontWeight}}>{this.props.middleText}</Text>
                   </TouchableOpacity>


                   <TouchableOpacity onPress={()=>this.onRightPress()}  style={{backgroundColor:'transparent',
                       width:wp(33.3),
                       height:hp(7),
                       justifyContent:"center",
                       alignItems:"center",
                       borderBottomWidth:this.state.rightBorderWidth,
                       borderBottomColor:this.state.rightBottomColor
                   }}>
                       <Text  style={{color:this.state.rightTextColor,fontSize:wp(3.7),fontWeight:this.state.rightTextFontWeight}}>{this.props.rightText}</Text>
                   </TouchableOpacity>


           </View>

            </View>
        );
    }
}

const styles= StyleSheet.create({
    mainContainer:{
        // flex:1,
        // backgroundColor:'grey',
    },

    container: {
        flexDirection:'row',
        alignItems: 'center',
        // backgroundColor: 'green'
    },


});


