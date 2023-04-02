//================================ React Native Imported Files ======================================//

import React from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';

//================================ Local Imported Files ======================================//

import AddSubscriptionView from '../../Components/AddSubscriptionView';
import AppHeader from '../../Components/AppHeader';
import AppLoading from "../../Components/AppLoading";
import styles from './style';
import FirebaseHelper from "../../firebase/FirebaseHelper";
import HelperStripe from '../HelperStripe';
import images from "../../../assets/images";


const SECRET_KEY_DEV = 'sk_test_51ICK4KCM933l4aI5iTQC8cZ6viFte17MWCcKIkDirmJIcr0ktFEoWakJOWMEznGd06b88XMSbIG1cLczCpEFR9Eq00Ls5kQOiw';
const SERVER_ERROR = 'Server Error';
const STRIPE_ERROR = 'Payment service error. Try again later.';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51ICK4KCM933l4aI57rcTHBY0rqiJHdeAih9ZovOkrrwSMIccvBNKWDXX7am70dOOof3dhf5thV4NNrhKJO4LLHpf004l3sbpjN';


//================================ Generating Token ======================================//

const getCreditCardToken = async (creditCardData) => {
    return await HelperStripe.getToken(creditCardData,STRIPE_PUBLISHABLE_KEY)
};


//================================ Charge Account ======================================//

const chargeAccount = async(token,price) => {
    return await HelperStripe.chargeAccount(SECRET_KEY_DEV,token,price)
};


//================================ Retrieve Account Balance ======================================//

const retrieveBalance = async() => {
    return await HelperStripe.retrieveBalance(SECRET_KEY_DEV)
};


//================================ Create Customer ======================================//

const createCustomer = async(creditCardData,token) => {
    let description = "Account Created";
    let mailAddress = "Hassaninayat0@gmail.com";
    let firstName   = creditCardData.values.name;
    return await HelperStripe.createCustomer(SECRET_KEY_DEV,description,mailAddress,firstName,token)
};


//================================ Create Product ======================================//

const createProduct = async() => {
    let productName = "Standard Plan"
    return await HelperStripe.createProduct(SECRET_KEY_DEV,productName)
};


//================================ Create Price of the Product ======================================//

const createPriceOfProduct = async(proId) => {
    let interval = "month";
    let amount = 100;
    let currency = "usd";
    return await HelperStripe.createPriceOfProduct(SECRET_KEY_DEV,amount,interval,currency,proId)
};


//================================ Fetch All Products ======================================//

const retrieveAllProducts = async() => {
    return await HelperStripe.retrieveAllProducts(SECRET_KEY_DEV)
}


//================================ Fetch All Product Price ======================================//

const retrieveProductPrice = async() => {
    return await HelperStripe.retrieveProductPrice(SECRET_KEY_DEV)
}


//================================ Subscribe ======================================//

const subscribeToPlan = () => {
    let customer_id = "cus_IpSlTVBs9rHMC4";
    let price_id = "price_1IK0woCM933l4aI5ZvPesJmD";
    let plan = "price";
    return  HelperStripe.subscribe(SECRET_KEY_DEV,customer_id,price_id,plan)
}


//================================ Create a plan ======================================//

const createPlan = async() => {
    let amount = 200;
    let currency = "usd";
    let interval = "month";
    let product_id = "prod_Ivsi2mzoEowITg";
    return await HelperStripe.createPlan(SECRET_KEY_DEV,amount,currency,interval,product_id)
}



class AddSubscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.route.params.response.id,
            userId: auth().currentUser.uid,
            paymentMethod:"Stripe",
            submitted: false,
            error: null,
            loading:false,
            sId:"",
            totalPrice:1,
            serviceProviders:[],
        }
    }

    componentDidMount() {
        this.getServicePrice();
        this.getAllServiceProviderProfiles();
    }


    getAllServiceProviderProfiles = () => {
        let { userId } = this.state;
        let tempArray = [];
        FirebaseHelper.getAllServiceProvidersProfile((response) => {
            if((response === undefined) || (response._docs.length < 1)){
                this.setState({loading:false})
            }else{
                response.forEach((token) => {
                    if(token.id !== userId){
                        tempArray.push({
                            uid: token.id,
                            fcmToken: token._data.fcmToken,
                        })
                    }
                })
                this.setState({serviceProviders:tempArray})
            }
        })
    }


    getServicePrice = () => {
        this.setState({loading:false});
        let { id } = this.state;
        FirebaseHelper.getServiceDocument(id,(response) => {
            if(response === undefined){
                this.setState({loading:false})
            }else{
                this.setState({
                    totalPrice: response._data.price,
                    loading:false
                })
            }
        })
    }


    //================================ Update Firebase Profile Payment Status ======================================//

    updateSubsStatusOfUser = (charge) => {
        this.setState({loading:true})
        let { id,serviceProviders } = this.state;
        let value = true;
        FirebaseHelper.updateService(id,charge)
            .then(() => {
                this.setState({loading:false})
                setTimeout(() => {
                    alert("Payment Successful")
                    this.props.navigation.navigate('JobOrder');
                },300)
                if(serviceProviders.length !== 0){
                    serviceProviders.map((token) => {
                        FirebaseHelper.onSendNotifications(
                            token.fcmToken,
                            "New Job",
                            'There is a new job in your area',
                        )
                    })
                }
            })
    };



    onSubmit = async (creditCardInput) => {

        this.setState({ submitted: true });
        let creditCardToken;
        try {
            creditCardToken = await getCreditCardToken(creditCardInput);
            // if (creditCardToken.error) {
            //     this.setState({ submitted: false, loading:false, error: STRIPE_ERROR });
            //     return;
            // }
        } catch (e) {
            this.setState({ submitted: false, loading:false, error: STRIPE_ERROR });
            return;
        }

        let value;
        if (creditCardToken) {
            this.setState({ submitted: false, loading:false, error: null })
            value = await chargeAccount(creditCardToken,this.state.totalPrice)
            if(value.paid === true)
            {
                this.updateSubsStatusOfUser(value.id);
            }
            else{
                alert("Failed to Make Payment");
            }
        }
        else{
            alert("Failed to Make Payment");
        }
    };


    render() {
        const { submitted, error } = this.state;
        return (
            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}
                    {/* //================================ App Header ======================================// */}

                    <AppHeader
                        title={'Stripe Payment'}
                        leftIconPath={images.ic_back}
                        // onLeftIconPress={() => this.props.navigation.navigate("RequestNewService")}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />

                <View style={styles.subscribeView}>

                    {/* //================================ Subscription View ======================================// */}

                    <View style={styles.addSubscribe}>

                        <AddSubscriptionView
                            error={error}
                            submitted={submitted}
                            onSubmit={this.onSubmit}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default AddSubscription;
