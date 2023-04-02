import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class TabsComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            radioButtonChecked:false,
            leftBorderWidth:3,
            rightBorderWidth:0,
            leftTextColor:"#ffffff",
            rightTextColor:"#ffffff",


        }

    }

    onLeftPress=()=>{
        if(this.state.leftTextColor==="#ffffff"){
            this.setState({leftTextColor:"#ffffff",rightTextColor:"#ffffff",leftBorderWidth:3,rightBorderWidth:0,})
        }

        this.props.onLeftPress();
    };


    onRightPress=()=>{
        if(this.state.rightTextColor==="#ffffff"){
            this.setState({rightTextColor:"#ffffff",leftTextColor:"#ffffff",leftBorderWidth:0,rightBorderWidth:3})
        }

        this.props.onRightPress();

    };

    render() {
        return(
            <View style={styles.mainContainer} >

                <View style={{flexDirection: 'row',justifyContent:"center",alignItems:"center" }}>


                    <TouchableOpacity  onPress={()=>this.onLeftPress() } style={{backgroundColor:'transparent',
                        width:wp(50),
                        height:hp(7),
                        justifyContent:"center"
                        ,alignItems:"center",
                        borderBottomWidth:this.state.leftBorderWidth,
                        borderBottomColor:"white"
                    }}>

                        <Text style={{color:this.state.leftTextColor,fontSize:wp(3.7),}} >{this.props.leftText}</Text>

                    </TouchableOpacity>



                    <TouchableOpacity onPress={()=>this.onRightPress()}  style={{backgroundColor:'transparent',
                        width:wp(50)
                        ,height:hp(7),
                        justifyContent:"center",
                        alignItems:"center",
                        borderBottomWidth:this.state.rightBorderWidth,
                        borderBottomColor:"white"
                    }}>
                        <Text  style={{color:this.state.rightTextColor,fontSize:wp(3.7),}}>{this.props.rightText}</Text>
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
    text: {
        color:'grey',
        // fontFamily:'Montserrat-Regular'
    },
    container: {
        flexDirection:'row',
        alignItems: 'center',
        // backgroundColor: 'green'
    },
    touchViewRadio: {
        height:wp(3.3),
        width:wp(3.7),
        backgroundColor: '#fff',
        borderRadius:wp(10),
        borderWidth:wp(5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:wp(2),
        borderColor:'grey'
    },
    innerTouchViewRadio:{
        backgroundColor: 'red',
        width:'80%',
        height:'80%',
        borderRadius:wp(5),
        margin:1,
    },

});


