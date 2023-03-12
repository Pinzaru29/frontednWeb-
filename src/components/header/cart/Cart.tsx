import {Alert, Drawer} from "@mui/material"
import {SetStateAction} from "react"
import {CartItem} from "./CartItem";
import {PaypalCheckoutButton} from "./PaypalCheckoutButton";

interface CartItemInterface {
    id: number,
    quantity: number,
    productId: number,
    customerId: number,
    productName: string,
    productDescription: string,
    iconURL: string,
    price: number,
    category: string,
}

interface CartProps {
    total: number,
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
    items: CartItemInterface[]
    setItems: React.Dispatch<SetStateAction<CartItemInterface[]>>
    setTotalPrice: React.Dispatch<SetStateAction<number>>

}

const Cart = (props: CartProps) => {

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                props.setState(open);

            };


    return (
        <>
            <Drawer
                open={props.state}
                anchor="right"
                onClose={toggleDrawer(false)}
                PaperProps={
                    {
                        sx: {

                            width: "30vw",
                            minWidth: "250px",
                            maxWidth: "325px",
                            backgroundColor: "rgb(233,218,218)",
                            alignItems: "center"

                        }
                    }
                }>

                <h1 style={{color: "rgb(59, 50, 48 )"}}>Your Cart</h1>
                {props.items.map((item, i) =>
                    <CartItem key={i} id={item.id}

                              iconURL={item.iconURL}
                              productName={item.productName}
                              productDescription={item.productDescription}
                              price={item.price}
                              category={item.category}
                              setTotalPrice={props.setTotalPrice} totalPrice={props.total} setItems={props.setItems}
                              quantity={item.quantity}/>
                )}
                {props.total > 0
                    ?
                    <>
                        <h2>Total:${props.total}</h2>
                        <PaypalCheckoutButton price={props.total}/>

                    </>
                    :
                    <Alert severity="info" icon={false}>There is nothing in your cart :( </Alert>}


            </Drawer>
        </>
    )
}

export {Cart}
export default CartItemInterface