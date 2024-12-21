import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../GlobalData/store"
import { Navbar } from "../Navbar/Navbar"
import { UserInterface } from "../../Interfaces/UserInterface"

export const Users:React.FC = () => {

    const [users, setUsers] = useState<UserInterface[]>([])

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
            console.log(response.data)
        })
    }

    return(
        <Container>
            <Navbar/>
            <Container>
                <Button className="btn-info" onClick={() => navigate("/dashboard")}>Back</Button>

                <Table className="table-success table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Pending Reimbursements</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user:UserInterface) => (
                            <tr>
                                <td className="align-middle">{user.firstName} {user.lastName}</td>
                                <td className="align-middle">{user.username}</td>
                                <td className="align-middle">{user.role}</td>
                                <td className="align-middle">{user.reimbs}</td>
                                {store.loggedInUser.userId != user.userId ? <td className="d-flex gap-2">
                                    {user.role === "Employee" ? <Button className="btn-success">Promote</Button> : <Button className="btn-warning">Demote</Button>}
                                    <Button className="btn-danger">Delete</Button>
                                </td> : <td></td>}
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>
        </Container>
    )
}