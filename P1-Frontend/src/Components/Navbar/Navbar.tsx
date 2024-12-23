import { Button, Nav } from "react-bootstrap"
import './Navbar.css'
import { useLocation, useNavigate } from "react-router-dom"
import { store } from "../../GlobalData/store"

export const Navbar:React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const logout = () => {
        store.loggedInUser = {
            userId:0,
            firstName:"",
            lastName:"",
            username:"",
            role:""
        }
        navigate("/")
    }

    return(
        <>
            <Nav className="navbar bg-light">
                {location.pathname != "/dashboard" ? <Button className="nav-item nav-right" onClick={() => navigate(-1)}>Back</Button> : ""}
                <Button className="btn-danger nav-item nav-left" onClick={logout}>Log Out</Button>
            </Nav>
        </>
    )
}