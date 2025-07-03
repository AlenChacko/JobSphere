import React from 'react'
import {Routes,Route} from 'react-router-dom'
import ChooseRole from './pages/ChooseRole'
import EmployeeAuth from './pages/auth/EmployeeAuth'
import RecruiterAuth from './pages/auth/RecruiterAuth'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ChooseRole/>}/>
        <Route path='/auth-employee' element={<EmployeeAuth/>}/>
        <Route path='/auth-recruiter' element={<RecruiterAuth/>}/>
        <Route path="/employee/dashboard/:id" element={<EmployeeDashboard />} />
        <Route path="/recruiter/dashboard/:id" element={<RecruiterDashboard />} />
      </Routes>
    </div>
  )
}

export default App