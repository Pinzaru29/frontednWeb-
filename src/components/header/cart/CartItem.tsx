import {Avatar, Box, Chip, Divider, IconButton, Typography} from "@mui/material";
import {axiosInstance} from "../../../api/axios";
import {useAuthorized} from "../../../helpers/useAuthrorized";
import CloseIcon from '@mui/icons-material/Close';
import CartItemInterface from "./Cart";

interface CartItemProps {
    id: number,
    iconURL: string,
    productName: string,
    productDescription: string,
    price: number
    category: string,
    totalPrice: number,
    quantity: number,
    setItems: React.Dispatch<React.SetStateAction<CartItemInterface[]>>,
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>,
}


const CartItem = (props: CartItemProps) => {
    const customerId = useAuthorized();

    return (
        <Box key={props.id} sx={{width: "100%"}}>
            <Box
                display="flex"
                sx={{pt: 2, pb: 2, ml: 2, mr: 2}}
                alignItems="start"
                justifyContent="left">
                <Box>
                    <Avatar src={props.iconURL} sx={{width: 96, height: 96, mr: 2}} variant="rounded"></Avatar>
                    <Chip label={`Quantity:${props.quantity}`} variant="outlined" size="medium"
                          sx={{marginTop: "5px", maxWidth: "120"}}></Chip>
                </Box>
                <Box display="flex" flexDirection="column">
                    <Typography variant="h6">{props.productName}</Typography>
                    <Chip label={props.category} variant="outlined" size="small" sx={{maxWidth: "70px"}}></Chip>
                    <Typography variant="h5" marginTop="2vh" alignItems="end" justifyContent="">Price:
                        ${props.price}</Typography>
                </Box>

                <IconButton sx={{ml: "auto"}} onClick={() => {
                    axiosInstance.delete(`/cartItem?cartItemId=${props.id.valueOf()}&issuerId=${customerId}`).then(() => {
                        axiosInstance.get(`/ShoppingCart/active`).then(res => {
                            props.setItems(res.data.cartItems)
                            props.setTotalPrice(res.data.fullPrice)
                        })
                    })

                }}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <Divider variant="inset"/>
        </Box>
    )
}

export {CartItem}