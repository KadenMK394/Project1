import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../GlobalData/store"
import { Navbar } from "../Navbar/Navbar"
import { UserInterface } from "../../Interfaces/UserInterface"
import './Users.css'

export const Users:React.FC = () => {

    const [users, setUsers] = useState<UserInterface[]>([])
    const [userState, setUserState] = useState<number>()

    useEffect(() => {
        if(store.loggedInUser.role != "Manager"){
            navigate("/dashboard")
        }
        getAllUsers()
    }, [])

    const navigate = useNavigate()

    const getAllUsers = async () => {
        await axios.get("http://localhost:5555/users", {withCredentials:true})
        .then((response) =>{
            setUsers(response.data)
            setUserState(0)
        })
    }

    const deleteAsk = (userId:number) => {
        setUserState(userId)
    }

    const deleteUser = async () => {
        await axios.delete("http://localhost:5555/users/" + userState, {withCredentials:true})
        .then(() => {
            setUserState(0)
            getAllUsers()
        })
        .catch((error) => {
            console.log(error)
            alert(error.response.data)
        })
    }

    const cancelDelete = () => {
        setUserState(0)
    }

    const promoteUser = async (userId:number) => {
        await axios.patch("http://localhost:5555/users/" + userId, "Manager", {withCredentials:true, headers:{'Content-Type':'text/plain',},})
        .then(() => {
            getAllUsers()
        })
        .catch((error) => {
            console.log(error)
            alert(error.response.data)
        })
    }

    const demoteUser = async (userId:number) => {
        await axios.patch("http://localhost:5555/users/" + userId, "Employee", {withCredentials:true, headers:{'Content-Type':'text/plain',},})
        .then(() => {
            getAllUsers()
        })
        .catch((error) => {
            console.log(error)
            alert(error.response.data)
        })
    }

    return(
        <Container>
            <Navbar/>
            <Container>
                <Table className="table-light table-striped-columns table-bordered table-hover table-responsive">
                <thead className="table-dark">
                        <tr>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user:UserInterface) => (
                            <tr>
                                <td className="align-middle">{user.firstName} {user.lastName}</td>
                                <td className="align-middle">{user.username}</td>
                                <td className="align-middle">{user.role}</td>
                                {store.loggedInUser.userId != user.userId ? <td className="d-flex">
                                    {userState === user.userId ? 
                                    <><p>Are you sure?</p>
                                    <Button className="btn-danger first-btn" onClick={deleteUser}>Yes</Button>
                                    <Button className="btn-success second-btn" onClick={cancelDelete}>No</Button></> :
                                    <>{user.role === "Employee" ? <Button className="btn-success first-btn" onClick={() => promoteUser(user.userId)}>Promote</Button> : <Button className="btn-warning first-btn" onClick={() => demoteUser(user.userId)}>Demote</Button>}
                                    <Button className="btn-danger second-btn" onClick={() => deleteAsk(user.userId)}>Delete</Button></> }  
                                </td> : <td className="d-flex">------</td>}
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>
        </Container>
    )
}