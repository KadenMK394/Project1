import { Button, Container, Form } from "react-bootstrap"
import { Navbar } from "../Navbar/Navbar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { store } from "../../GlobalData/store"
import axios from "axios"

export const NewReimbs:React.FC = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if(store.loggedInUser.role.length <= 0){
            navigate("/")
        }
    }, [])
    
    const [newReimb, setNewReimb] = useState({
        description:"",
        amount:""
    })

    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setNewReimb((newReimb) => ({...newReimb, [name]:value}))
    }

    const createReimbursement = async () => {
        await axios.post("http://localhost:5555/reimbursements/" + store.loggedInUser.userId, newReimb, {withCredentials:true})
        .then(
            () => {
                navigate(-1)
            }
        )
        .catch((error) => {
            console.log(error)
            alert(error.response.data)
        })
    }

    return(
        <Container>
            <Navbar/>
            <Container className="d-flex align-items-center flex-column mt-5">
            <h3>New Reimbursement</h3>
            <div className="mt-1">
                <Form.Control
                    type="text"
                    placeholder="Description of request"
                    name="description"
                    onChange={storeValues}
                />
            </div>
            <div className="mt-1">
                <Form.Control
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    onChange={storeValues}
                />
            </div>

            <div className="d-flex mt-3">
                <Button className="btn-success" onClick={createReimbursement}>Submit</Button>
            </div>
            </Container>
        </Container>
    )
}