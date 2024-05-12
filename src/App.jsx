import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LayoutPage from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Apod from './pages/Apod';
import SolarSystemPage from './pages/SolarSystemPage';
import AsteroidsPage from './pages/AsteroidsPage';
import NeoPage from './pages/NeoPage';
import NeoTable from './pages/NeoTable';
import Planets from './pages/Planets';
import Test from './pages/Test';


import { useAuth } from "./contexts/AuthContext";


function App() {
  const { userLoggedIn } = useAuth();

  return (
   
   
      // <Router>
       
      //     <Routes>
      //       <Route exact path="/" element={<Login />} />
      //       <Route path="/login" element={<Login />} />
      //       <Route path="/register" element={<Register />} />
      //       <Route path="/home" element={<LayoutPage />} />
      //       <Route path="/apod" element={<Apod/>} />
      //       <Route path="/solar" element={<SolarSystemPage/>} />
      //       <Route path="/as" element={<AsteroidsPage/>} />
      //       <Route path="/neo" element={<NeoPage/>} />
      //       <Route path="/neoT" element={<NeoTable/>} />
      //       <Route path="/pl" element={<Planets/>} />


      //       {/* Add more routes here */}
      //     </Routes>
       
      // </Router>


<Router>
<Routes>
  {!userLoggedIn ? (
    <>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </>
  ) : (
    <>
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<Home />} />
        <Route path="apod" element={<Apod />} />
        <Route path="neoT" element={<NeoTable />} />
        <Route path="pl" element={<Planets />} />
        <Route path="test" element={<Test />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </>
  )}
</Routes>
</Router>
   
  );
}

export default App;
