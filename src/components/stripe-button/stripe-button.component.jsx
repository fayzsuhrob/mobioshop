import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HShdUKzGEWJojNpfqCsvk2MGN2kYaCZHW0725SVQB4I2R0tCfYmaKEY99o838mT7ktdma9SvWvdBbdA0WArmKsl00JaiYbjnO';

    const onToken = token => {
        console.log(token);
        alert('You payment was successful');
    }

    return (
        <StripeCheckout 
            label = 'Pay Now'
            name = 'Mobio LTD'
            billingAddress
            shippingAddress
            image = 'https://svgshare.com/i/CUz.svg'
            description = {`Your total is ${price}`}
            amount = {priceForStripe}
            panelLabel = 'Mobio Secure Payment'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton;