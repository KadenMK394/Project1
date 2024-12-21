import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { store } from "../../GlobalData/store"
import { Button, Container, Form } from "react-bootstrap"

export const Register:React.FC = () => {

    const [newUser, setNewUser] = useState({
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        role:""
    })
    const navigate = useNavigate()

    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setNewUser((newUser) => ({...newUser, [name]:value}))
    }

    const register = async () => {
        await axios.post("http://localhost:5555/auth/register", newUser, {withCredentials:true})
        .then((response) => {
            store.loggedInUser = response.data
                
            navigate("/dashboard")
        })
        .catch((error) => {
            console.log(error)
            alert(error.response.data)
        })
    }

    return(
        <Container className="d-flex align-items-center flex-column mt-5">
            <h3>Register</h3>

            <div className="mt-1">
                <Form.Control
                    type="text"
                    placeholder="first name"
                    name="firstName"
                    onChange={storeValues}
                    id="firstname"
                />
            </div>
            <div className="mt-1">
                <Form.Control
                    type="text"
                    placeholder="last name"
                    name="lastName"
                    onChange={storeValues}
                />
            </div>
            <div className="mt-1">
                <Form.Control
                    type="text"
                    placeholder="username"
                    name="username"
                    onChange={storeValues}
                />
            </div>
            <div className="mt-1">
                <Form.Control
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={storeValues}
                />
            </div>
            <div className="d-flex gap-5 mt-3">
                <Button onClick={() => navigate("/")}>Back to login</Button>
                <Button className="btn-success" onClick={register}>Register</Button>
            </div>

        </Container>
    )
}