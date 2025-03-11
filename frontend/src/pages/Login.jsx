import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function clickLogin() {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login realizado com sucesso!");
        // Salvar ID do estudante no localStorage
        localStorage.setItem("studentId", data.response.studentId);

        // Navegar para o Inicio e passar o ID do estudante na URL
        console.log("Redirecionando para:", `/inicio/${data.response.studentId}`);
        navigate(`/inicio/${data.response.studentId}`);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    clickLogin();
  }

  return (
    <div className="login-container">
      <h2 className="text-center">Sistema IFPE</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
          Entrar
        </button>
      </form>
      <p className="text-center">
        Não tem conta? <a href="/cadastro">Cadastre-se</a>
      </p>
    </div>

  );
}
