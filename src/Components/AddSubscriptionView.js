//================================ React Native Imported Files ======================================//

import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PropTypes from 'prop-types';


//================================ Local Imported Files ======================================//

import PaymentFormView from "./PaymentFormView";


export default class AddSubscriptionView extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                {/* //================================ Scroll View ======================================// */}

                <ScrollView style={styles.container} ref={ref => (this.scrollViewRef = ref)}>
                    <View style={styles.cardFormWrapper}>

                        {/* //================================ Payment Form View ======================================// */}

                        <PaymentFormView {...this.props}/>
                    </View>
                </ScrollView>

                {/* //================================ Keyboard Spacer ======================================// */}

                <KeyboardSpacer
                    onToggle={() => { setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }),0)} }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardFormWrapper: {
        padding: 10,
        margin: 10
    }
});
