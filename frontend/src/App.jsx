import React from 'react'
import {Routes,Route} from 'react-router-dom'
import ChooseRole from './pages/ChooseRole'
import EmployeeAuth from './pages/auth/EmployeeAuth'
import RecruiterAuth from './pages/auth/RecruiterAuth'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ChooseRole/>}/>
        <Route path='/auth-employee' element={<EmployeeAuth/>}/>
        <Route path='/auth-recruiter' element={<RecruiterAuth/>}/>
      </Routes>
    </div>
  )
}

export default App