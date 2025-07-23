import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./pages/admin";


function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/' element={<Login/>} />
        <Route path ='/register' element={<Register/>} />
        <Route path ='/admin' element={<Admin/>} />
      </Routes>
    </Router>
  )
    

}

export default App;

