import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import AddNotes from './pages/addNotes/AddNotes';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewNotes from './pages/viewNotes/ViewNotes';
import SignUp from './pages/signUp/SignUp';
import AuthContextProvider from './contexts/AuthContext'
import Calendar from './pages/calendar/Calendar';




function App() {
  return (
    <div>

<AuthContextProvider>
{/* <NavBar/> */}
      <Routes>
        <Route  path='/home' element={<Home/>}/>
        <Route  path='/add' element={<AddNotes/>}/> 
        <Route  path='/view' element={<ViewNotes/>}/> 
        <Route  path='/calendar' element={<Calendar/>}/> 
        <Route exact  path='/' element={<Login/>}/> 
        <Route path='/signup' element={<SignUp/>}/> 
      </Routes>
  </AuthContextProvider>
    
        {/* <Login/> */}
    </div>
  );
}

export default App;
