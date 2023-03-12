import {Box, Tab, Tabs} from "@mui/material"
import {Login} from "./login"
import {useState} from "react";
import {Registration} from "./registration";


const LoginPage = () => {

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box paddingTop="1vh" display="flex" alignItems="center" flexWrap="wrap" flexDirection="column">
            <Box sx={{width: "34vh"}}>
                <Tabs variant="fullWidth" value={tabIndex} textColor="primary" onChange={handleTabChange}>
                    <Tab sx={{color: "white"}} label="Sign In"/>
                    <Tab sx={{color: "white"}} label="Sign Up"/>
                </Tabs>
            </Box>
            <Box>
                {tabIndex === 0 && (
                    <Box>
                        <Login/>
                    </Box>
                )}
                {tabIndex === 1 && (
                    <Box>
                        <Registration/>
                    </Box>
                )}
            </Box>
        </Box>
    );


}


export {LoginPage}