import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const { user } = useAuth();
    const navigate = useNavigate()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('paymnet error ', error)
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confimError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confimError) {
            console.log('confirm error', confimError)
            setError(confimError.message);
        }

        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log("Transection id", paymentIntent.id)
                setTransactionId(paymentIntent.id)
            }


            // now save the payment in the database 
            const payment = {
                email: user?.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(), //utc date convert . user moment js 
                cartIds: cart.map(item => item._id),
                menuItemIds: cart.map(item => item.menuId),
                status: 'pending'
            }

            // const res = await axiosSecure.post('/payments', payment)
            // console.log('payment saved', res.data)
            // refetch();
            // if(res.data?.paymentResult?.insertedId){
            //     Swal.fire({
            //         position: "top-end",
            //         icon: "success",
            //         title: "Thank you for the nogod taka",
            //         showConfirmButton: false,
            //         timer: 1500
            //     });
            // }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log('Payment saved:', res.data);
                    refetch();
                    if (res.data?.paymentResult?.insertedId) { // Corrected nested property access
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Thank you for your payment",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/dashboard/paymentHistory')
                    }
                })
                .catch(err => console.log('Payment error:', err));
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn-sm btn-primary bg-red-500 my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {
                transactionId && <p className=" text-green-500">Your Transaction id : {transactionId}</p>
            }
        </form>
    );
};

export default CheckOutForm;