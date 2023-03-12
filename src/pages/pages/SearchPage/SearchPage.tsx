import {Button, Grid, Paper, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {axiosInstance} from "../../api/axios";
import {ProductCard} from "../../components/common/productCard";
import {Product} from "../HomePage/Featured/Featured";
import {PageButtons} from "../../components/common/pageButtons";
import {Categories} from "../../components/common/Categories";
import {Manufacturers} from "../../components/common/Manufacturers";

const SearchPage = () => {
    const pageSize = 9;
    const {query} = useParams();
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [category, setCategory] = useState("")
    const [update, setUpdate] = useState(0)
    const [manufacturer, setManufacturer] = useState("")
    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        let data = {
            "pageIndex": page,
            "pageSize": pageSize,
            "columnNameForSorting": "Id",
            "sortDirection": "desc",
            "requestFilters": {
                "logicalOperator": 0,
                "filters": [
                    {
                        "path": "productName",
                        "value": query !== undefined ? query : ""
                    },
                    {
                        "path": "manufacturer",
                        "value": manufacturer
                    },
                    {
                        "path": "category",
                        "value": category
                    }
                ]
            }
        }
        axiosInstance.post('/paginated-search', data).then(res => {
            setTotal(res.data.total)
            setProducts(res.data.items);
        });
    }, [page, query, update]);

    return (
        <>
            <h1>Result: {query}</h1>
            <Grid display="flex">
                <Grid container width="40%" maxWidth="250px">

                    <Paper elevation={10} sx={{minWidth: "100%", maxHeight: "295px"}}>
                        <Typography display="flex" justifyContent="center" variant="h4" marginTop="10px"
                                    marginBottom="10px">Filters</Typography>

                        <Manufacturers manufacturer={manufacturer} setManufacturer={setManufacturer}/>

                        <Categories sx={{padding: "10px"}} category={category} setCategory={setCategory}/>

                        <Button fullWidth sx={{mt: "3vh"}} onClick={() => {
                            setUpdate(update === 0 ? 1 : 0)
                        }}>Search</Button>
                    </Paper>

                </Grid>

                <Grid container style={{display: 'flex', justifyContent: 'center', marginLeft: "auto"}}>
                    {products.map((item, i) =>
                        <ProductCard key={i} productName={item.productName} productDescription={item.productDescription}
                                     manufacturer={item.manufacturer} price={item.price}
                                     category={item.category} iconURL={item.iconURL} id={item.id}/>)}
                </Grid>
            </Grid>
            <Box display="flex" flexDirection="row" sx={{ml: "55%"}}>
                <PageButtons setPage={setPage} disabledButton={page - 1} pages={Math.ceil(total / pageSize)}/>
            </Box>
        </>
    )
}

export {SearchPage}