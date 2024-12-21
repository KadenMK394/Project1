import { Button, Container, Table } from "react-bootstrap"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Navbar } from "../Navbar/Navbar"
import { store } from "../../GlobalData/store"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface"

export const Reimbursements:React.FC<any> = ({reimbs}) => {
    const navigate = useNavigate()
    
    const searchParams = useSearchParams()
    

    return(
        <Container>
            <Navbar/>
            <Container>
                <Button className="btn-info" onClick={()=>{navigate("/dashboard")}}>Back</Button>
                <h3>
                    {store.loggedInUser.role === "Manager" ? "All Reimbursements" : "My Reimbursements"}
                </h3>
                
                <Table className="table-success table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>User</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reimbs.map((reimb:ReimbursementInterface) => (
                            <tr>
                                <td className="align-middle">{reimb.amount}</td>
                                <td className="align-middle">{reimb.description}</td>
                                <td className="align-middle">{reimb.user.username}</td>
                                <td>
                                    {store.loggedInUser.userId != reimb.user.userId ? <td className="d-flex gap-2">
                                        <Button className="btn-success">Approve</Button>
                                        <Button className="btn-danger">Deny</Button>
                                    </td> : <td><Button>Modify</Button></td>}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </Container>
        </Container>
    )
}