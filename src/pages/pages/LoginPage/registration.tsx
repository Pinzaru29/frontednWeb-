import LockOpenIcon from '@mui/icons-material/LockOpen';
import {Alert, Avatar, Button, Grid, Paper, TextField} from "@mui/material"
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import {useState} from "react";
import * as Yup from 'yup';
import {axiosInstance} from "../../api/axios";


interface FormValues {
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmationPassword: string,
    profileImageURL: string
}

const Registration = () => {

    const [error, setError] = useState(false);

    const INITIAL_VALUES: FormValues = {
        userName: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmationPassword: '',
        profileImageURL: '',

    }

    const FORM_VALIDATION = Yup.object().shape({
        userName: Yup.string().min(6).max(18).required("Required"),
        password: Yup.string().min(8).max(25).required("Required"),
        confirmationPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    });


    const paperStyle = {padding: 20, height: "70vh", width: "30vh"};

    return (

        <Grid>
            <Paper elevation={7} style={paperStyle}>
                <Grid container direction='column' alignItems='center'>
                    <Avatar><LockOpenIcon/></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <Grid container direction='column'>
                    <Formik initialValues={INITIAL_VALUES}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={async (values) => {
                                let data = {
                                    "userName": values.userName,
                                    "password": values.password,
                                    "confirmationPassword": values.confirmationPassword,
                                    "firstName": values.firstName,
                                    "lastName": values.lastName,
                                    "profileImageURL": values.profileImageURL
                                };
                                await axiosInstance.post('/registration', data)
                                    .then(() => {
                                        setError(false);
                                        window.location.reload();

                                    })
                                    .catch((error) => {
                                        setError(true);

                                    });
                            }
                            }
                    >
                        {(props: FormikProps<FormValues>) => (

                            <Form>
                                <Field sx={{marginTop: "2vh"}} fullWidth margin="normal"
                                       as={TextField} label='Username' name='userName' placeholder='Enter username'
                                       error={props.errors.userName ? true : false}
                                       helperText={<ErrorMessage name="userName"/>}/>

                                <Field sx={{marginTop: "0.2vh"}} fullWidth margin="normal" as={TextField}
                                       label='First name'
                                       name='firstName' placeholder='Enter first name'
                                />

                                <Field sx={{marginTop: "0.2vh"}} margin="normal" fullWidth as={TextField}
                                       label='Last name'
                                       name='lastName' placeholder='Enter last name'
                                />

                                <Field sx={{marginTop: "0.2vh"}} margin="normal" fullWidth as={TextField}
                                       label='Profile image URL'
                                       name='profileImageURL' placeholder='Enter image URL'
                                />

                                <Field sx={{marginTop: "0.2vh"}} margin="normal" fullWidth as={TextField}
                                       type='password' label='Password'
                                       name='password' placeholder='Enter password'
                                       error={props.errors.password ? true : false}
                                       helperText={<ErrorMessage name="password"/>}/>

                                <Field sx={{marginTop: "0.2vh"}} margin="normal" fullWidth as={TextField}
                                       type='password' label='Confirmation password'
                                       name='confirmationPassword' placeholder='Confirm password'
                                       error={props.errors.confirmationPassword ? true : false}
                                       helperText={<ErrorMessage name="confirmationPassword"/>}/>

                                {error && <Alert severity="error">User already exists</Alert>}

                                <Button color='error' type='submit'
                                        disabled={(!props.isValid && props.dirty) || props.isSubmitting}
                                        variant="contained" sx={{marginTop: '3vh'}} fullWidth>Sign Up</Button>
                            </Form>
                        )

                        }


                    </Formik>

                </Grid>

            </Paper>
        </Grid>
    )
}
export {Registration}