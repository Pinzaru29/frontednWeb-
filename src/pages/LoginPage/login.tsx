import LoginIcon from '@mui/icons-material/Login';
import {Alert, Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField} from "@mui/material"
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import {axiosInstance} from "../../api/axios";

interface FormValues {
    username: string,
    password: string,
    remember: boolean
}

const Login = () => {

    const [error, setError] = useState(false);

    const INITIAL_VALUES: FormValues = {
        username: '',
        password: '',
        remember: false
    }

    const FORM_VALIDATION = Yup.object().shape({
        username: Yup.string().min(6).max(18).required("Required"),
        password: Yup.string().min(8).max(25).required("Required")
    });

    const dispatch = useDispatch()


    const Login = (Role: string, Id: number) => {
        dispatch({type: "AuthState", payload: true})
        dispatch({type: "RoleState", payload: Role})
        dispatch({type: "IdState", payload: Id})
    }

    const navigate = useNavigate();


    const paperStyle = {padding: 20, height: "60vh", width: "30vh"};


    return (

        <Grid>
            <Paper elevation={7} style={paperStyle}>
                <Grid container direction='column' alignItems='center'>
                    <Avatar><LoginIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Grid container direction='column'>
                    <Formik initialValues={INITIAL_VALUES}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={async (values) => {
                                let data = {
                                    "userName": values.username,
                                    "password": values.password
                                };
                                let res = await axiosInstance.post('/login', data).catch((error) => {
                                    setError(true);
                                });
                                if (res && res.data.role === "Admin") {
                                    sessionStorage.setItem('token', res.data.token);
                                    sessionStorage.setItem('id', res.data.id);
                                    Login(res.data.role, res.data.id);
                                    navigate('/admin');
                                } else if (res && values.remember) {
                                    localStorage.setItem('token', res.data.token)
                                    localStorage.setItem('id', res.data.id)
                                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                                    Login(res.data.role, res.data.id);
                                    navigate('/');
                                } else if (res) {
                                    sessionStorage.setItem('token', res.data.token);
                                    sessionStorage.setItem('id', res.data.id);
                                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
                                    Login(res.data.role, res.data.id);
                                    navigate('/');
                                }
                            }
                            }
                    >
                        {(props: FormikProps<FormValues>) => (

                            <Form>
                                <Field sx={{marginTop: "2vh"}} fullWidth margin="normal"
                                       as={TextField} label='Username' name='username' placeholder='Enter username'
                                       error={props.errors.username ? true : false}
                                       helperText={<ErrorMessage component="span" name="username"/>}/>

                                <Field sx={{marginTop: "0.2vh"}} fullWidth as={TextField} type='password'
                                       label='Password'
                                       name='password' placeholder='Enter password'
                                       error={props.errors.password ? true : false}

                                       helperText={<ErrorMessage name="password"/>}/>

                                <Field as={FormControlLabel} name='remember' control={<Checkbox/>} label="Remember me"/>
                                {error && <Alert severity="error">User not found</Alert>}

                                <Button color='error' type='submit'
                                        disabled={(!props.isValid && props.dirty) || props.isSubmitting}
                                        variant="contained" sx={{marginTop: '3vh'}} fullWidth>Sign In</Button>
                            </Form>
                        )

                        }


                    </Formik>

                </Grid>

            </Paper>
        </Grid>
    )
}

export {Login}