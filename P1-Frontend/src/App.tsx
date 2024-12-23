import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Users } from './Components/Users/Users'
import { Login } from './Components/Authentication/Login'
import { Register } from './Components/Authentication/Register'
import { Dashboard } from './Components/Users/Dashboard'
import { ManagerReimbs } from './Components/Reimbursements/ManagerReimbs'
import { UserReimbs } from './Components/Reimbursements/UserReimbs'
import { NewReimbs } from './Components/Reimbursements/NewReimbs'

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="reimbursements" element={<ManagerReimbs/>}/>
          <Route path="reimbursements/:userId" element={<UserReimbs/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="reimbursements/new/:userId" element={<NewReimbs/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
