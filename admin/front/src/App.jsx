
import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Admin/>
      <ToastContainer />
    </div>
  )
}

export default App