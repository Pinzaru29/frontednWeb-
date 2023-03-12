import {Box, Button, ButtonGroup, Chip, Divider, Grid, Typography} from "@mui/material"
import {useState} from "react";
import {axiosInstance} from "../../api/axios";
import {useAuthorized} from "../../helpers/useAuthrorized";
import CartItemInterface from "../../components/header/cart/Cart";

interface InfoProps {
    id: number,
    productName: string,
    description: string,
    price: number,
    category: string,
    setItems: React.Dispatch<React.SetStateAction<CartItemInterface[]>>,
    setTotalPrice:React.Dispatch<React.SetStateAction<number>>
}


const Info = (props: InfoProps) => {

    const [quantity, setQuantity] = useState(1);

    const customerId = useAuthorized();

    const handleIncrement = () => {
        setQuantity(quantity + 1)
    }

    const handleDecrement = () => {
        setQuantity(quantity - 1)
    }

    const handleClick = () => {
        let data = {
            "id": 0,
            "quantity": quantity,
            "productId": props.id,
            "customerId": customerId,
            "productName": "",
            "productDescription": "",
            "iconURL": "",
            "category": "",
            "price": 0
        }

        axiosInstance.post("cartItem", data)
            .then(() => {
                axiosInstance.get(`/ShoppingCart/active`).then(res => {
                    props.setItems(res.data.cartItems)
                    props.setTotalPrice(res.data.fullPrice)
                })
            })
            .catch(() => {
            })
    }

    return (
        <Grid container direction='column' style={{height: '100%'}}>
            <Typography variant="h4">{props.productName}</Typography>
            <Divider/>
            <Box mt={2}>
                <Typography style={{marginBottom: "5vh"}} variant="subtitle1">{props.description}</Typography>
                <Typography style={{marginBottom: "1vh"}} variant="h5">${props.price}</Typography>
                <Chip style={{marginBottom: "2vh"}} label={props.category} variant="outlined"/>
            </Box>
            <Typography style={{marginBottom: "1vh"}} variant="h5">Quantity</Typography>
            <ButtonGroup size="small" aria-label="small outlined button group">

                <Button disabled={quantity <= 1} onClick={handleDecrement}>-</Button>

                <Button disabled>{quantity}</Button>

                <Button onClick={handleIncrement}>+</Button>

            </ButtonGroup>

            <Button variant='contained' color="primary" onClick={handleClick} style={{marginTop: '1vh'}}>Add to
                Cart</Button>
        </Grid>
    )
}

export default Info