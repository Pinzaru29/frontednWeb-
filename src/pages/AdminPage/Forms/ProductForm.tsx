import {Alert, Button, Grid, Paper, TextField} from "@mui/material"
import {Field, Form, Formik, FormikProps} from "formik";
import {useState} from "react";
import * as Yup from 'yup';
import {axiosInstance} from "../../../api/axios";
import {Categories} from "../../../components/common/Categories";


interface FormValues {

    productName: string,
    productDescription: string,
    manufacturer: string,
    price: number,
    iconUrl: string

}


const ProductForm = () => {


    const [category, setCategory] = useState("")

    const INITIAL_VALUES: FormValues = {
        productName: "",
        productDescription: "",
        manufacturer: "",
        price: 0,
        iconUrl: ""
    }

    const FORM_VALIDATION = Yup.object().shape({
        productName: Yup.string().min(3).required(),
        productDescription: Yup.string().required(),
        manufacturer: Yup.string().required(),
        iconUrl: Yup.string().min(1).required(),
        price: Yup.number().min(1).required(),

    });

    const paperStyle = {padding: 20, height: "100%", width: "30vh"};

    const formStyle = {marginTop: "2vh"}


    return (

        <Grid>
            <Paper elevation={7} style={paperStyle}>
                <h3>Add Product</h3>
                <Grid container direction='column'>
                    <Formik initialValues={INITIAL_VALUES}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={async (values) => {
                                let data = {
                                    id: 0,
                                    productName: values.productName,
                                    productDescription: values.productDescription,
                                    manufacturer: values.manufacturer,
                                    price: values.price,
                                    category: category,
                                    iconURL: values.iconUrl
                                };
                                await axiosInstance.post('/product', data).catch(() => {

                                });

                            }
                            }
                    >
                        {(props: FormikProps<FormValues>) => (

                            <Form>
                                <Field sx={formStyle} fullWidth margin="normal"
                                       as={TextField} label='Product Name' name='productName'
                                />
                                {props.errors.productName && <Alert severity="error">{props.errors.productName}</Alert>}
                                <Field sx={formStyle} fullWidth margin="normal"
                                       as={TextField} label='Product Description' name='productDescription'
                                />
                                {props.errors.productDescription &&
                                    <Alert severity="error">{props.errors.productDescription}</Alert>}
                                <Field sx={formStyle} fullWidth margin="normal"
                                       as={TextField} label='Manufacturer' name='manufacturer'
                                />
                                {props.errors.manufacturer &&
                                    <Alert severity="error">{props.errors.manufacturer}</Alert>}
                                <Field sx={formStyle} fullWidth margin="normal"
                                       as={TextField} label='Price' name='price'
                                />
                                {props.errors.price && <Alert severity="error">{props.errors.price}</Alert>}
                                <Categories sx={formStyle} category={category} setCategory={setCategory}/>
                                {category === "" && <Alert severity="error">Platform is required</Alert>}

                                <Field sx={formStyle} fullWidth margin="normal"
                                       as={TextField} label='Icon URL' name='iconUrl'
                                />
                                {props.errors.iconUrl && <Alert severity="error">{props.errors.iconUrl}</Alert>}


                                <Button color='error' type='submit'
                                        disabled={!props.isValid || !props.dirty}
                                        variant="contained" sx={{marginTop: '3vh'}} fullWidth>Add Product</Button>

                            </Form>
                        )

                        }


                    </Formik>

                </Grid>

            </Paper>
        </Grid>
    )
}

export default ProductForm