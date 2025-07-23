
import { Routes,Route } from 'react-router-dom';
import './App.css';
import { Signup } from './component/Signup';
import { Login } from './component/Login';
function App() {
  return (
    <div className="App">
     <h1>Hello Akash! Notes App</h1>
     <Routes>
      <Route path='/signup' element={<Signup />} > </Route>
      <Route path='/login' element={<Login />} > </Route>
     </Routes>
       <Signup />
    </div>
  );
}

export default App;
