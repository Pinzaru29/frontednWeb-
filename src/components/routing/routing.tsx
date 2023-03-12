import {Navigate, Route, Routes} from "react-router-dom";
import AdminPage from "../../pages/AdminPage/AdminPage";
import {HomePage} from "../../pages/HomePage/HomePage";
import {LoginPage} from "../../pages/LoginPage/LoginPage";
import {ProductPage} from "../../pages/ProductPage/ProductPage";
import {ProfilePage} from "../../pages/ProfilePage/ProfilePage";
import {SearchPage} from "../../pages/SearchPage/SearchPage";
import {Footer} from "../footer/Footer";
import {NavBar} from "../header/NavBar";
import {AdminGuard, AuthorizedGuard, UnAuthorizedGuard} from "./RouteGuards";
import CartItemInterface from "../header/cart/Cart";
import {useState} from "react";


const Routing = () => {
    const [items, setItems] = useState<CartItemInterface[]>([])
    const [totalPrice,setTotalPrice]= useState(0)
    return (
        <>
            <NavBar items={items} setItems={setItems}  setTotalPrice={setTotalPrice} totalPrice={totalPrice}/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<UnAuthorizedGuard children={<LoginPage/>}/>}/>
                    <Route path="/profile" element={<AuthorizedGuard children={<ProfilePage/>}/>}/>
                    <Route path="/admin" element={<AdminGuard children={<AdminPage/>}/>}/>
                    <Route path="/product/:id" element={<AuthorizedGuard children={<ProductPage setItems={setItems} setTotalPrice={setTotalPrice}/>}/>}/>
                    <Route path="/search/:query" element={<SearchPage/>}/>
                    <Route path="/search" element={<SearchPage/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/" replace/>}
                    />

                </Routes>

            </div>
            <Footer/>
        </>
    );
}

export {Routing}