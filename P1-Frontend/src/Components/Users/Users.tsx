import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

interface User{
    userId:number,
    username:string,
    role:string,
    teamId:number
}

export const Users:React.FC = () => {

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getAllUsers()
    }, [])

    const navigate = useNavigate()

    const getAllUsers = async () => {
        const response = await axios.get("http://localhost:4444/users")
        .then((response) =>{
            setUsers(response.data)
        })
    }

    return(
        <Container>
            <Button className="btn-info" onClick={() => navigate("/")}>Back</Button>

            <Table className="table-success table-hover">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Team Name</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                {/* map() for users gathered from the GET request */}
                {users.map((user:User) => (
                        <tr>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>{user.teamId}</td>
                            <td>
                                <Button className="btn-danger">Delete</Button>
                                <Button className="btn-verify">Promote</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container>
    )
}