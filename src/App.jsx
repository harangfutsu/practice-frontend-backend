import './App.css'
import { Routes, Route, Navigate } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CourseEntry from './pages/CourseEntry'
import CourseDetail from './pages/CourseDetail'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/login" replace/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/entry' element={<CourseEntry/>}/>
      <Route path='/update/:id' element={<CourseEntry isUpdate/>}/>
      <Route path='/detail' element={<CourseDetail/>}/>
    </Routes>
  )
}

export default App
