import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {RootState} from "../..";


const AuthorizedGuard = ({children}: { children: JSX.Element }) => {
    const isLogged = useSelector((state: RootState) => state.isLogged);


    if (isLogged) {
        return children;
    } else {
        return <Navigate to="/login" replace/>
    }
}

const UnAuthorizedGuard = ({children}: { children: JSX.Element }) => {
    const isLogged = useSelector((state: RootState) => state.isLogged);


    if (!isLogged) {
        return children;
    } else {
        return <Navigate to="/" replace/>
    }
}

const AdminGuard = ({children}: { children: JSX.Element }) => {
    const Role = useSelector((state: RootState) => state.Role);


    if (Role === "Admin") {
        return children;
    } else {
        return <Navigate to="/" replace/>
    }
}

export {AuthorizedGuard, UnAuthorizedGuard, AdminGuard}