import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Subscribe() {

   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [phone, setPhone] = useState([]);
   const [birthdate, setBirthdate] = useState([]);
   const [email, setEmail] = useState([]);
   const [course, setCourse] = useState([]);
   const [address, setAddress] = useState([]);
   const [password, setPassword] = useState([]);

   async function clickSubscribe() {
      try {
         const response = await fetch('http://127.0.0.1:3000/api/students', {
            method: 'POST',
            body: JSON.stringify({
               name: name,
               phone: phone,
               birthdate: birthdate,
               email: email,
               course: course,
               address: address,
               password: password
            }),
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
            },
         })
         const data = await response.json();
         if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            console.log("Cadastro realizado com sucesso:", data);

            // Redirecionar após sucesso
            navigate("/login");
         } else {
            alert("Erro ao cadastrar!");
            console.error("Erro ao cadastrar:", data.message);
         }
      } catch (err) {
         console.log(err.message);
      };
   }

   //Recebe o evento do formulário
   const handleSubmit = (e) => {
      e.preventDefault();
      clickSubscribe();
   };

   return (
      <div className="login-container">
         <h2 className="text-center">Crie uma conta</h2>
         <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
               <label>Nome:</label>
               <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
               />
            </div>
            <div className="form-group">
               <label>Telefone:</label>
               <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
               />
            </div>
            <div className="form-group">
               <label>Data de nascimento:</label>
               <input
                  type="text"
                  className="form-control"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
               />
            </div>
            <div className="form-group">
               <label>Email:</label>
               <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>
            <div className="form-group">
               <label>Curso:</label>
               <input
                  type="text"
                  className="form-control"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
               />
            </div>
            <div className="form-group">
               <label>Endereço:</label>
               <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
               />
            </div>
            <div className="form-group">
               <label>Senha:</label>
               <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
               Cadastrar
            </button>
         </form>

      </div>
   )
}
