import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { store } from "../../GlobalData/store"
import { Button, Container, Form } from "react-bootstrap"

export const Login:React.FC = () => {

    const [loginCreds, setLoginCreds] = useState({
        username:"",
        password:""
    })

    const navigate = useNavigate()

    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setLoginCreds((loginCreds) => ({...loginCreds, [name]:value}))
    }

    const login = async () => {
        await axios.post("http://localhost:5555/auth", loginCreds, {withCredentials:true})
        .then(
            (response) => {
                store.loggedInUser = response.data

                navigate("/dashboard")
            }
        )
        .catch((error) => {
            console.log(error)
            alert(error.response.data)
        })
    }

    return(
        <Container className="d-flex align-items-center flex-column mt-5">
            <h3>Login</h3>

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
                <Button className="btn-success" onClick={login}>Login</Button>
                <Button onClick={()=>navigate("/register")}>Register</Button>
            </div>

        </Container>
    )
}