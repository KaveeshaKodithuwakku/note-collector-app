import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewNotes from './pages/viewNotes/ViewNotes';
import SignUp from './pages/signUp/SignUp';
import AuthContextProvider from './contexts/AuthContext'
import Calendar from './pages/calendar/Calendar';
import Settings from './pages/settings/Settings';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import FavoriteNotes from './pages/favoriteNote/FavoriteNotes';
import Reminders from './pages/reminders/Reminders';

function App() {
  return (
    <div>
  
<AuthContextProvider>
  
      <Routes>
        <Route  path='/home' element={<Home/>}/>
        <Route  path='/view' element={<ViewNotes/>}/> 
        <Route  path='/calendar' element={<Calendar/>}/> 
        <Route  path='/favorite-notes' element={<FavoriteNotes/>}/> 
        {/* <Route  path='/reminders' element={<Reminders/>}/> */}
        <Route  path='/settings' element={<Settings/>}/> 
        <Route  path='/forgot_password' element={<ForgotPassword/>}/> 
        <Route exact  path='/' element={<Login/>}/> 
        <Route path='/signup' element={<SignUp/>}/> 
      </Routes>
  </AuthContextProvider>

    </div>
  );
}

export default App;
