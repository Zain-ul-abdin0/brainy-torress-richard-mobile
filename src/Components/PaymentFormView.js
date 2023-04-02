//================================ React Native Imported Files ======================================//

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import PropTypes from "prop-types";

export default class PaymentFormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cardData: { valid: false } };
    }

    render() {
        const { onSubmit, submitted, error } = this.props;

        return (
            <View>
                <View>

                    {/* //================================ Credit Card Input  ======================================// */}

                    <CreditCardInput onChange={(cardData) => this.setState({ cardData })} />

                </View>
                <View style={styles.buttonWrapper}>

                    {/* //================================ Subscribe Button  ======================================// */}

                    <Button
                        title='Pay'
                        disabled={!this.state.cardData.valid || submitted}
                        onPress={() => onSubmit(this.state.cardData)}
                    />

                    {/* //================================ Errors Dealing Section  ======================================// */}

                    {error && (
                        <View style={styles.alertWrapper}>
                            {/*<View style={styles.alertIconWrapper}>*/}
                            {/*<FontAwesome name="exclamation-circle" size={20} style={{ color: '#c22' }} />*/}
                            {/*</View>*/}
                            <View style={styles.alertTextWrapper}>
                                <Text style={styles.alertText}>{error}</Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    buttonWrapper: {
        padding: 10,
        zIndex: 100
    },
    alertTextWrapper: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertIconWrapper: {
        padding: 5,
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertText: {
        color: '#c22',
        fontSize: 16,
        fontWeight: '400'
    },
    alertWrapper: {
        backgroundColor: '#ecb7b7',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 5,
        paddingVertical: 5,
        marginTop: 10
    },
});
