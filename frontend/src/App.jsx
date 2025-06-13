import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/LogIn';
import FormBuilder from './components/FormBuilder';
import FormRender from './components/FormRender';
import SignIn from './components/SignIn'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/build" element={<FormBuilder />} />
        <Route path="/render" element={<FormRender />} />
      </Routes>
    </Router>
  );
}

export default App;
