import {Box, Grid, IconButton, Typography} from "@mui/material"
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function FooterInfo(props: { sx: { alignItems: string; display: string; marginBottom: string } }) {
    return <Box marginTop="1vh" marginRight="3vh">
        <Box sx={props.sx}>
            <PlaceOutlinedIcon fontSize="large" color="info"/>
            <Typography variant="h6" color="white">1 Stud ,Chishinau</Typography>
        </Box>
        <Box sx={props.sx}>
            <PhoneInTalkOutlinedIcon fontSize="large" color="info"/>
            <Typography variant="h6" color="white">+37377777777</Typography>
        </Box>
        <Box sx={props.sx}>
            <EmailOutlinedIcon fontSize="large" color="info"/>
            <Typography variant="h6" color="white">email@gmail.com</Typography>
        </Box>
    </Box>;
}

function FooterIcons(props: { sx: { border: string; marginRight: string; margin: string; borderRadius: string; borderBlockColor: string; borderStyle: string; marginTop: string } }) {
    return <>
        <a href="https://facebook.com" target="_blank">
            <IconButton sx={props.sx} size="large" edge="start" color="inherit" aria-label="logo">
                <FacebookOutlinedIcon/>
            </IconButton>
        </a>
        <a href="https://instagram.com" target="_blank">
            <IconButton sx={props.sx} size="large" edge="start" color="inherit" aria-label="logo">
                <InstagramIcon/>
            </IconButton>
        </a>
        <a href="https://linkedin.com" target="_blank">
            <IconButton sx={props.sx} size="large" edge="start" color="inherit" aria-label="logo">
                <LinkedInIcon/>
            </IconButton>
        </a>
        <a href="https://twitter.com" target="_blank">
            <IconButton sx={props.sx} size="large" edge="start" color="inherit" aria-label="logo">
                <TwitterIcon/>
            </IconButton>
        </a>
    </>;
}

const Footer = () => {

    const boxStyle = {display: "flex", alignItems: "center", marginBottom: "2vh"}
    const iconStyle = {
        border: "GrayText",
        borderBlockColor: "Menu",
        borderStyle: "solid",
        borderRadius: "20px",
        margin: "0",
        marginTop: "1vh",
        marginRight: "1vh"
    }


    return (
        <div style={{display: "table-row", height: "0", backgroundColor: "rgb(26,42,51)"}}>
            <div className="content" style={{marginBottom: "0"}}>
                <Grid sx={{display: "flex", justifyContent: "space-around", marginTop: "2vh"}}>
                    <FooterInfo sx={boxStyle}/>
                    <Box marginTop="1vh" marginLeft="auto" maxWidth="300px">

                        <Typography variant="h6" color="white">About the company</Typography>
                        <Typography variant="subtitle1" color="GrayText">Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Quia debitis ipsa ratione!</Typography>

                        <FooterIcons sx={iconStyle}/>
                    </Box>

                </Grid>
            </div>
        </div>
    )
}

export {Footer}