import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Reimbursements } from './Components/Reimbursements/Reimbursements'
import { Users } from './Components/Users/Users'

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          {/* Empty string or / for path to render a component at startup */}
          <Route path="/reimbursements" element={<Reimbursements/>}/>
          <Route path="/users" element={<Users/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
