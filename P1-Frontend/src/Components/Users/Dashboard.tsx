import { Button, Container } from "react-bootstrap"
import { store } from "../../GlobalData/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "../Navbar/Navbar"

//{user.role === "Employee" ? <Button className="btn-verify">Promote</Button> 
// : <Button className="button-warning">Demote</Button>}
export const Dashboard:React.FC = () => {

    useEffect(() => {
        if(store.loggedInUser.role.length <= 0){
            navigate("/")
        }
    }, [])

    const navigate = useNavigate()
        
    return(
        <Container>
            <Navbar/>
            <Container className="d-flex align-items-center flex-column mt-5">
                <h2>
                    {store.loggedInUser.role === "Manager" ? "Manager Dashboard" : "Employee Dashboard"}
                </h2>
                <h3 className="d-flex mt-5">Welcome, {store.loggedInUser.firstName}!</h3>
                <div className="d-flex mt-5">
                    <Button className="btn-success" onClick={() => navigate("/reimbursements/" + store.loggedInUser.userId)}>My Reimbursements</Button>
                </div>
                
                <div className="d-flex gap-5 mt-3">
                    {store.loggedInUser.role === "Manager" ? <Button onClick={() => navigate("/reimbursements")}>View Reimbursements</Button> :""}
                    {store.loggedInUser.role === "Manager" ? <Button onClick={() => navigate("/users")}>View Users</Button> : ""}
                </div>
            </Container>
        </Container>
    )
}