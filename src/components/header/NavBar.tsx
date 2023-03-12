import {AppBar, Badge, IconButton, Toolbar} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Stack} from "@mui/system";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../..";
import LogoDevIcon from '@mui/icons-material/LogoDev';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CartItemInterface, {Cart} from "./cart/Cart";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../api/axios";
import {SearchBar} from "./SearchBar";


interface NavBarProps{
    items:CartItemInterface[],
    setItems: React.Dispatch<React.SetStateAction<CartItemInterface[]>>,
    totalPrice : number,
    setTotalPrice:React.Dispatch<React.SetStateAction<number>>,

}

function NavBarIcons(props: { role: string, onClick: () => Promise<void>, cartItemInterfaces: CartItemInterface[], logged: boolean, sx: { border: string; margin: string; borderBlockColor: string; borderStyle: string }, onClick1: () => void }) {
    return <Stack direction="row" spacing={1} sx={{marginLeft: "auto"}} alignItems="revert">
        {props.role === "Admin"
            ? <Link to="/admin">
                <IconButton sx={{margin: "0"}} size="large" edge="start" color="inherit"
                            aria-label="logo">
                    <LogoDevIcon/>
                </IconButton>
            </Link>
            : <></>}

        <Link to="/profile">
            <IconButton sx={{margin: "0"}} size="large" edge="start" color="inherit"
                        aria-label="logo">
                <AccountCircleIcon/>
            </IconButton>
        </Link>
        <IconButton sx={{margin: "0"}} size="large" edge="start" color="inherit" aria-label="logo"
                    onClick={props.onClick}>
            <Badge badgeContent={props.cartItemInterfaces.length} color="primary">
                <ShoppingCartIcon/>
            </Badge>
        </IconButton>
        {!props.logged
            ? <Link to="/login">
                <IconButton sx={props.sx} size="large" edge="start" color="inherit"
                            aria-label="logo">
                    <LoginIcon/>
                </IconButton>
            </Link>
            : <IconButton sx={props.sx} size="large" edge="start" color="inherit" aria-label="logo"
                          onClick={props.onClick1}>
                <LogoutIcon/>
            </IconButton>
        }


    </Stack>;
}

const NavBar = ({items,setItems,totalPrice,setTotalPrice}:NavBarProps) => {

    const [isCartVisible, setCartVisible] = useState(false)

    //const [items, setItems] = useState<CartItemInterface[]>([])

    //const [totalPrice, setTotalPrice] = useState(0)

    const isLogged = useSelector((state: RootState) => state.isLogged);
    const Role = useSelector((state: RootState) => state.Role);


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const LogOut = () => {
        dispatch({type: "AuthState", payload: false})
        dispatch({type: "RoleState", payload: ""})
        setItems([])
    }

    const handleClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id")
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("id");
        LogOut();
    }


    const handleCartClick = async () => {
        isLogged ? setCartVisible(true) : navigate("/login")
    }

    useEffect(() => {
        if (isLogged) {
            axiosInstance.get(`/ShoppingCart/active`).then(res => {
                setItems(res.data.cartItems)
                setTotalPrice(res.data.fullPrice)
            })
        }
    }, [isLogged, isCartVisible])

    const iconStyle = {border: "GrayText", borderBlockColor: "Menu", borderStyle: "solid", margin: "0"}


    return (
        <div className="navbar">
            <div className="content">
                <AppBar position="sticky" elevation={0} style={{backgroundColor: "rgb(26,42,51)", padding: "0"}}>
                    <Toolbar sx={{display: "flex", alignContent: "center"}}>

                        <Link to='/'>
                            <img src="https://imgur.com/QDpfmD5.png" alt="logo"/>
                        </Link>

                        <SearchBar/>
                        <NavBarIcons role={Role} onClick={handleCartClick} cartItemInterfaces={items} logged={isLogged}
                                     sx={iconStyle} onClick1={handleClick}/>
                    </Toolbar>
                </AppBar>
            </div>
            <Cart state={isCartVisible} setState={setCartVisible} items={items} setItems={setItems} total={totalPrice}
                  setTotalPrice={setTotalPrice}/>
        </div>
    );
}
export {NavBar}