import { Route, Routes } from "react-router"
import Home from "./Pages/Home"
import Login from "./Pages/auth/Login"
import Register from "./Pages/auth/Register"
import Jobs from "./Pages/Jobs"
import Browse from "./Pages/Browse"
import Profile from "./Pages/Profile"
import {PrivateRoute , PublicRoute } from "./components/Route/PrivateRoute"
import JobDescription from "./Pages/JobDescription"

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/jobs" element = {<Jobs />} />
          <Route path='/browse' element={<Browse />} />
          <Route path='/jobdetail/:id' element={<JobDescription/>} />

          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />

          <Route path="/login" element={ <PublicRoute><Login/></PublicRoute>}/>
          <Route path='/register' element={<PublicRoute><Register/></PublicRoute>} />
          
        </Routes>
    </>
  )
}

export default App
