import {Grid, Paper} from "@mui/material"
import {useEffect, useState} from "react"
import Info from "./Info"
import {MainImage} from "./MainImage"
import {Product} from "../HomePage/Featured/Featured"
import {axiosInstance} from "../../api/axios"
import {useParams} from "react-router-dom"
import CartItemInterface from "../../components/header/cart/Cart";

interface ProductPageProps{
    setItems: React.Dispatch<React.SetStateAction<CartItemInterface[]>>,
    setTotalPrice:React.Dispatch<React.SetStateAction<number>>
}

const ProductPage = ({setItems,setTotalPrice}:ProductPageProps) => {
    const {id} = useParams();
    const [product, setProduct] = useState<Product>({
        id: 0,
        productName: '',
        productDescription: '',
        manufacturer: '',
        price: 0,
        category: '',
        iconURL: ''
    });
    useEffect(() => {
        axiosInstance.get(`/product/${id}`).then(res => {
            setProduct(res.data);
        });

    },[])
    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: "5vh"}}>
            <Paper style={{padding: "2vh"}}>
                <Grid container spacing={1} style={{maxWidth: 1100, margin: "0"}}>
                    <Grid item sm={5}>
                        <MainImage source={product.iconURL}/>
                    </Grid>
                    <Grid item sm={6}>
                        <Info productName={product.productName} description={product.productDescription}
                              price={product.price} category={product.category} id={product.id} setItems={setItems} setTotalPrice={setTotalPrice}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
export {ProductPage}