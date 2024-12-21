import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../GlobalData/store"

interface User{
    userId:number,
    firstName:string,
    lastName:string,
    username:string,
    role:string,
    reimbs:any
}

export const Users:React.FC = () => {

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        if(store.loggedInUser.role != "Manager"){
            navigate("/employee")
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
            <Button className="btn-info" onClick={() => navigate("/")}>Back</Button>

            <Table className="table-success table-hover">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Pending Reimbursements</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                {/* map() for users gathered from the GET request */}
                {users.map((user:User) => (
                        <tr>
                            <td>{user.userId}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>{user.reimbs}</td>
                            <td>
                                <Button className="btn-danger">Delete</Button>
                                {user.role === "Employee" ? <Button className="btn-verify">Promote</Button> : <Button className="button-warning">Demote</Button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container>
    )
}