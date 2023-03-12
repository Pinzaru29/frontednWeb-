import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {Field, Form, Formik, FormikProps} from 'formik';
import {useNavigate} from 'react-router-dom';

interface FormValues {
    search: string
}

const SearchBar = () => {

    const INITIAL_VALUES: FormValues = {
        search: ""
    }
    const navigate = useNavigate()
    return (
        <Paper
            sx={{marginLeft: "3vw", width: 300}}
        >
            <Formik initialValues={INITIAL_VALUES}
                    onSubmit={async (values) => {
                        navigate(`/search/${values.search}`)
                    }
                    }>
                {(props: FormikProps<FormValues>) => (
                    <Form style={{display: 'flex', alignItems: 'center', width: 300}}>
                        <Field
                            placeholder="Search"
                            as={InputBase}
                            sx={{ml: 1}}
                            name="search"
                        />
                        <IconButton type="submit"
                                    sx={{p: '10px', ml: "auto"}} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                    </Form>
                )}
            </Formik>
        </Paper>
    )
}

export {SearchBar}