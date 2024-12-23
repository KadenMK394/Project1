import { SetStateAction, useEffect, useState } from "react"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface"
import axios from "axios"
import { Navbar } from "../Navbar/Navbar"
import { Button, Container, FormSelect, Table } from "react-bootstrap"
import { store } from "../../GlobalData/store"
import { useNavigate } from "react-router-dom"
import './Reimbursements.css'

export const ManagerReimbs:React.FC = () => {
    const [reimbs, setReimbs] = useState<ReimbursementInterface[]>([])
    const [display, setDisplay] = useState<string>()

    useEffect(() => {
        if(store.loggedInUser.role != "Manager"){
            navigate("/dashboard")
        }
        setDisplay("All")
        getAllReimbs()
    }, [])

    const navigate = useNavigate()

    const getAllReimbs = async () => {
        const response = await axios.get("http://localhost:5555/reimbursements", {withCredentials:true})
        setReimbs(response.data)
    }

    const getAllPendings = async () => {
        const response = await axios.get("http://localhost:5555/reimbursements/pending", {withCredentials:true})
        setReimbs(response.data)
    }

    const approve = async (reimbId:number) => {
        await axios.patch("http://localhost:5555/reimbursements/" + reimbId, "Approved", {withCredentials:true, headers:{'Content-Type':'text/plain',},})
        .then(() => {
            if(display === "All"){
                getAllReimbs()
            } else {
                getAllPendings()
            }
        })
        .catch((error) => {
            console.log(error)
            alert(error.response.data)
        })
    }

    const deny = async (reimbId:number) => {
        await axios.patch("http://localhost:5555/reimbursements/" + reimbId, "Denied", {withCredentials:true, headers:{'Content-Type':'text/plain',},})
        .then(() => {
            if(display === "All"){
                getAllReimbs()
            } else {
                getAllPendings()
            }
        })
        .catch((error) => {
            console.log(error)
            alert(error.response.data)
        })
    }

    const handleChange = (event: { target: { value: SetStateAction<string | undefined> } }) => {
        setDisplay(event.target.value)
        if(event.target.value === "All"){
            getAllReimbs()
        } else {
            getAllPendings()
        }
    }

    return(
        <Container>
            <Navbar/>
            <h3>All Reimbursements</h3>
            <FormSelect name="display" id="displayDropdown" onChange={handleChange}>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Accepted" disabled>All (Not Implemented)</option>
                <option value="Denied" disabled>Denied (Not Implemented)</option>
            </FormSelect>
            <Table className="table-success table-hover table-responsive">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbs.map((reimb:ReimbursementInterface) => (
                        <tr>
                            <td className="align-middle">{reimb.amount}</td>
                            <td className="align-middle">{reimb.description}</td>
                            <td className="align-middle">{reimb.user.username}</td>
                            <td className="align-middle">{reimb.status}</td>
                            
                            {/*Very complicated way to handle all of the option buttons */}
                            {store.loggedInUser.userId != reimb.user.userId && reimb.status === "Pending" ? <td className="d-flex gap-2"><Button className="btn-success" onClick={() => approve(reimb.reimbId)}>Approve</Button> <Button className="btn-danger" onClick={() => deny(reimb.reimbId)}>Deny</Button></td> : <td></td>}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        
    )
}