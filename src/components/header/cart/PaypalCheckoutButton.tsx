import {PayPalButtons} from "@paypal/react-paypal-js";
import {axiosInstance} from "../../../api/axios";

interface PaypalCheckoutButtonProps {
    price: number,
}


const PaypalCheckoutButton = (props: PaypalCheckoutButtonProps) => {




    return (
        <PayPalButtons style={{color: "black"}}
                       onClick={(data, actions) => {
                           //Add validation if product shouldn't be bought
                       }}
                       createOrder={(data, actions) => {
                           return actions.order.create({
                               purchase_units: [
                                   {
                                       description: "Order from NOOB",
                                       amount: {
                                           value: props.price.toString()
                                       }
                                   }
                               ]
                           })
                       }}
                       onApprove={async (data, actions) => {
                           console.log(props.price.toString())
                           axiosInstance.patch("/ShoppingCart");

                       }}

        />

    );
}
export {PaypalCheckoutButton}