import { Button, Nav } from "react-bootstrap"
import './Navbar.css'
import { useNavigate } from "react-router-dom"
import { store } from "../../GlobalData/store"

export const Navbar:React.FC = () => {

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
                <Button className="btn-danger nav-item" onClick={logout}>Log Out</Button>
            </Nav>
        </>
    )
}