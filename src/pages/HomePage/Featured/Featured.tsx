import {Box, Grid, Paper} from "@mui/material";
import {Link} from "react-router-dom"
import {useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import {axiosInstance} from "../../../api/axios";
import {ProductCard} from "../../../components/common/productCard";
import PanoramaFishEyeTwoToneIcon from '@mui/icons-material/PanoramaFishEyeTwoTone';

interface Product {
    id: number
    productName: string,
    productDescription: string,
    manufacturer: string,
    price: number,
    category: string,
    iconURL: string
}

export type {Product}


function Item(props: any) {
    return (
        <Link to={`/product/${props.item.id}`}>
            <Paper sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${props.item.iconURL})`,
                backgroundColor: "#c0c5ce",
                backgroundPosition: "center",
                backgroundSize: "auto 100%",
                //backgroundSize:"contain",
                backgroundRepeat: "no-repeat",
                maxWidth: "100%",
                minHeight: "480px"
            }}>
            </Paper>
            <div style={{display: "flex", justifyContent: "center", color: "rgb(70,53,53"}}>
                <h1>Price: ${props.item.price}</h1>
            </div>
        </Link>
    )
}

const FeaturedItems = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        let data = {
            "pageIndex": 1,
            "pageSize": 7,
            "columnNameForSorting": "Id",
            "sortDirection": "desc",
        }
        axiosInstance.post('/paginated-search', data).then(res => {
            setProducts(res.data.items);
        });
    }, []);


    return (
        <>

            <Box sx={{marginTop: "3vh"}}>
                <Carousel IndicatorIcon={<PanoramaFishEyeTwoToneIcon/>} animation="fade">
                    {products.slice(0, 3).map((item, i) =>
                        <Item key={i} item={item}/>
                    )}
                </Carousel>
            </Box>
            <Grid container style={{display: 'flex', justifyContent: 'center', marginTop: '4vh'}}>
                {products.slice(3, 7).map((item, i) =>
                    <ProductCard key={i} productName={item.productName} productDescription={item.productDescription}
                                 manufacturer={item.manufacturer} price={item.price}
                                 category={item.category} iconURL={item.iconURL} id={item.id}/>)}
            </Grid>
        </>
    )
}

export {FeaturedItems}