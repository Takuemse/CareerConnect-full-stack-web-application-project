import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({
    children,
    allowedRoles
}) {

    const { user, token } = useAuth();


    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    if (
        !allowedRoles.includes(user?.role)
    ) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }


    return children;
}

export default RoleRoute;