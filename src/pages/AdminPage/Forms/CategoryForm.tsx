import * as Yup from "yup";
import {Alert, Button, Grid, Paper, TextField} from "@mui/material";
import {Field, Form, Formik, FormikProps} from "formik";
import {axiosInstance} from "../../../api/axios";


interface FormValues {
    categoryName: string,
}

const CategoryForm = () => {

    const INITIAL_VALUES: FormValues = {
        categoryName: "",

    }

    const FORM_VALIDATION = Yup.object().shape({
        categoryName: Yup.string().min(1).required()
    });

    const paperStyle = {padding: 20, height: "35vh", width: "30vh", marginLeft: "2vh"};

    const formStyle = {marginTop: "2vh"}


    return (

        <Grid>
            <Paper elevation={7} style={paperStyle}>
                <h3>Add Category</h3>
                <Grid container direction='column'>
                    <Formik initialValues={INITIAL_VALUES}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={async (values) => {
                                let data = {
                                    id: 0,
                                    name: values.categoryName,
                                };
                                await axiosInstance.post('/category', data).catch(() => {
                                });

                            }
                            }
                    >
                        {(props: FormikProps<FormValues>) => (

                            <Form>
                                <Field sx={formStyle} fullWidth margin="normal"
                                       as={TextField} label='Category Name' name='categoryName'
                                />
                                {props.errors.categoryName &&
                                    <Alert severity="error">{props.errors.categoryName}</Alert>}

                                <Button color='error' type='submit'
                                        disabled={(!props.isValid || !props.dirty) || props.isSubmitting}
                                        variant="contained" sx={{marginTop: '3vh'}} fullWidth>Add Category</Button>
                            </Form>
                        )
                        }

                    </Formik>

                </Grid>

            </Paper>
        </Grid>
    )
}

export {CategoryForm}