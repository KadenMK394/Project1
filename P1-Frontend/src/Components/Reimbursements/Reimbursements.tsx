import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

interface Reimbursement {
    reimbId:number,
    description:string,
    amount:number,
    user:any
}

export const Reimbursements:React.FC = () => {
    const [reimbs, setReimbs] = useState<Reimbursement[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        getAllReimbs()
    }, [])

    const getAllReimbs = async () => {
        const response = await axios.get("http://localhost:5555/reimbursements", {withCredentials:true})
        setReimbs(response.data)
    }

    const getUserReimbs = async (reimbId:number) => {
        const response = await axios.get("http://localhost:5555/reimbursements/" + reimbId, {withCredentials:true})
        setReimbs(response.data)
    }
    
    return(
        <Container>
            <Button className="btn-info" onClick={()=>{navigate("/")}}>Back</Button>
            <h3>Reimbursements:</h3>
            
            <Table>
                <thead>
                    <tr>
                        <th>Reimbursement ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>User</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbs.map((reimb:Reimbursement) => (
                        <tr>
                            <td>{reimb.reimbId}</td>
                            <td>{reimb.description}</td>
                            <td>{reimb.amount}</td>
                            <td>{reimb.user.username}</td>
                            <td>

                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
        </Container>
    )
}