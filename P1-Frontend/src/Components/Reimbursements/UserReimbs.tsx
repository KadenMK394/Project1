import { SetStateAction, useEffect, useState } from "react"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface"
import axios from "axios"
import { store } from "../../GlobalData/store"
import { Button, Container, Form, FormSelect, Table } from "react-bootstrap"
import { Navbar } from "../Navbar/Navbar"
import { useNavigate, useParams } from "react-router-dom"
import './Reimbursements.css'

export const UserReimbs:React.FC = () => {
    const [reimbs, setReimbs] = useState<ReimbursementInterface[]>([])
    const [description, setDescription] = useState<string>()
    const [descState, setDescState] = useState<number>()
    const [reimbState, setReimbState] = useState<number>()
    const [display, setDisplay] = useState<string>()

    useEffect(() => {
        if(store.loggedInUser.role.length <= 0){
            navigate("/dashboard")
        }
        setDescState(0)
        setReimbState(0)
        setDisplay("All")
        getUserReimbs(store.loggedInUser.userId)
    }, [])
    const navigate = useNavigate()
    const searchParams = useParams()
    
    const getUserReimbs = async (userId:number) => {
        await axios.get("http://localhost:5555/reimbursements/" + userId, {withCredentials:true})
        .then((response) => {
            setReimbs(response.data)
        })
        .catch((error) => {
            console.log(error)
            alert(error.response.data)
        })
    }

    const getUserPendings = async (userId:number) => {
        await axios.get("http://localhost:5555/reimbursements/" + userId + "/pending", {withCredentials:true})
        .then((response) => {
            setReimbs(response.data)
        })
        .catch((error) => {
            console.log(error)
            alert(error.response.data)
        })
    }

    const modify = (reimbId:number) => {
        setDescState(reimbId)
    }

    const handleChange = (event: { target: { id: string; value: SetStateAction<string | undefined> } }) => {
        if(event.target.id == "displayDropdown"){
            setDisplay(event.target.value)
            if(event.target.value === "All"){
                getUserReimbs(store.loggedInUser.userId)
            } else {
                getUserPendings(store.loggedInUser.userId)
            }
        } else {
            setDescription(event.target.value)
        }
    }

    const saveModify = async () => {
        await axios.patch("http://localhost:5555/reimbursements/" + Number(searchParams.userId) + "/" + descState, description, {withCredentials:true, headers:{'Content-Type':'text/plain',},})
        .then(() => {
            setDescState(0)
            if(display === "All"){
                getUserReimbs(store.loggedInUser.userId)
            } else {
                getUserPendings(store.loggedInUser.userId)
            }
            //Is this a good way to do it? No. But it's the only way I could figure out within an hour.
        })
        .catch((error) => {
            console.log(error)
            alert(error.response.data)
        })
    }

    const cancelModify = () => {
        setDescState(0)
    }

    const deleteAsk = (reimbId:number) => {
        setReimbState(reimbId)
    }

    const deleteReimb = async () => {
        await axios.delete("http://localhost:5555/reimbursements/" + Number(searchParams.userId) + "/" + reimbState, {withCredentials:true, headers:{'Content-Type':'text/plain',},})
        .then(() => {
            setReimbState(0)
            if(display === "All"){
                getUserReimbs(store.loggedInUser.userId)
            } else {
                getUserPendings(store.loggedInUser.userId)
            }
            
        })
        .catch(() => {
            alert("Could not delete!")
        })
    }

    const cancelDelete = () => {
        setReimbState(0)
    }
    

    return(
        <Container>
            <Navbar/>
            <h3>My Reimbursements</h3>
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
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                {reimbs.map((reimb:ReimbursementInterface) => (
                        <tr>
                            <td className="align-middle">{reimb.amount}</td>
                            {descState === reimb.reimbId ? <td className="align-middle"><Form.Control className="text" type="text" defaultValue={reimb.description} onChange={handleChange}/></td> : <td className="align-middle">{reimb.description}</td>}
                            <td className="align-middle">{reimb.status}</td>
                            
                            {descState === reimb.reimbId ? <td><Button onClick={saveModify}>Save</Button> <Button className="btn-warning" onClick={cancelModify}>Cancel</Button></td> :
                            reimbState === reimb.reimbId ? <td><p>Are you sure?</p> <Button className="btn-danger" onClick={deleteReimb}>Yes</Button> <Button className="btn-success" onClick={cancelDelete}>No</Button></td> :
                            reimb.status === "Pending" ? <td><Button onClick={() => modify(reimb.reimbId)}>Modify</Button> <Button className="btn-danger" onClick={() => deleteAsk(reimb.reimbId)}>Delete</Button></td> : <td></td>}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button onClick={()=>navigate("/reimbursements/new/" + store.loggedInUser.userId)}>New Reimbursment</Button>
        </Container>
    )
}