import { useAuth } from "../context/authContext"
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <p>Cargando...</p>
    if (!user) return <Navigate to="/iniciar-sesion" />
    return <>{children}</>;
}

export default ProtectedRoutes 