import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material"
import {Link} from "react-router-dom"

interface ProductCardProps {
    id: number
    productName: string,
    productDescription: string,
    manufacturer: string,
    price: number,
    category: string,
    iconURL: string
}

const ProductCard = (props: ProductCardProps) => {
    return (
        <Link to={`/product/${props.id}`}>
            <Card sx={{maxWidth: "23vh", ml: "1vh", mr: "1vh", mb: "1vh"}}>


                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={props.iconURL}
                        height="190"
                        sx={{objectFit: "scale-down", marginTop: "10px"}}
                        alt={props.productName}
                    />
                    <CardContent sx={{minHeight: "14vh", maxHeight: "14vh"}}>
                        <Typography variant="h6" component="div" sx={{color: 'black'}}>
                            {props.productName}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                            ${props.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>


                </CardActions>

            </Card>
        </Link>
    )
}

export {ProductCard}
export type {ProductCardProps}
