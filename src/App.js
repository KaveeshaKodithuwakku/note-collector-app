import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import AddNotes from './pages/addNotes/AddNotes';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewNotes from './pages/viewNotes/ViewNotes';




function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<AddNotes/>}/> 
        <Route path='/view' element={<ViewNotes/>}/> 
      </Routes>
        {/* <Login/> */}
    </div>
  );
}

export default App;
