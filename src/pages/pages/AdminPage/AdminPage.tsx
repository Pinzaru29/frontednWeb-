import ProductForm from "./Forms/ProductForm"
import {CategoryForm} from "./Forms/CategoryForm";
import {Grid} from "@mui/material";

const AdminPage = () => {
    return (
        <Grid display="flex" flexDirection="row">
            <ProductForm/>
            <CategoryForm/>
        </Grid>

    )
}

export default AdminPage