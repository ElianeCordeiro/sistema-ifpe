import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login  from "./pages/Login";
import Subscribe from "./pages/Subscribe";
//import Enrollments from "./pages/Enrollments";
import Main from "./pages/Main";
import Subject from "./pages/Subject";
import Enrollment from "./pages/Enrollment";


export default function RoutesApp(){
    return(
    <BrowserRouter>
      <Routes>
        <Route  path="/login" exact element={<Login />} />
        <Route path="/cadastro" exact element={<Subscribe/>}/>
        <Route path="/inicio/:studentId" exact element={<Main/>}/>
        <Route path="/disciplinas" exact element={<Subject/>}/>
        <Route path="/matricula/:studentId" exact element={<Enrollment/>}/>
        {/* <Route path="/matriculas/:studentId" exact element={<Enrollments/>}/> */}
      </Routes>
    </BrowserRouter>
    );
}