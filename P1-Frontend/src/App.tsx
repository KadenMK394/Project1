import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Reimbursements } from './Components/Reimbursements/Reimbursements'
import { Users } from './Components/Users/Users'
import { Login } from './Components/Authentication/Login'
import { Register } from './Components/Authentication/Register'
import { Employee } from './Components/Users/Employee'
import { Manager } from './Components/Users/Manager'

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="reimbursements" element={<Reimbursements/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="employee" element={<Employee/>}/>
          <Route path="manager" element={<Manager/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
