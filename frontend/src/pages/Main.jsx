import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import "../styles/Main.css";

export default function Main() {

  const { studentId } = useParams(); // Pega o ID da URL
  const [studentData, setStudentData] = useState(null);
  const [enrollmentData, setEnrollmentData] = useState(null);

  const [editingStudent, setEditingStudent] = useState(null);
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editCourse, setEditCourse] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const navigate = useNavigate();

  //Busca dados do Aluno
  useEffect(() => {

    async function fetchStudentData() {
      try {
        const response = await fetch(`http://localhost:3000/api/students/${studentId}`);
        const data = await response.json();
        console.log("📌 Dados recebidos da API:", data);

        if (response.ok) {
          setStudentData(data);
        } else {
          console.error("Erro ao buscar dados do estudante:", data.message);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    }

    if (studentId) {
      fetchStudentData();
    }
  }, [studentId]);

  //Busca disciplinas matriculadas
  useEffect(() => {
    async function fetchEnrollmentData() {
      try {
        const response = await fetch(`http://localhost:3000/api/enrollments/${studentId}`);
        const data = await response.json();
        console.log("📌 Dados recebidos do backend ver:", data);

        if (response.ok) {
          setEnrollmentData(data);
        } else {
          console.error("Erro ao buscar dados do estudante:", data.message);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    }

    if (studentId) {
      fetchEnrollmentData();
    }
  }, [studentId]);

  async function clickDeleteEnrollment(enrollmentId) {
    console.log("📌 ID do enrollment 2:", enrollmentId);
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/enrollments/delete/${enrollmentId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Erro ao cancelar matrícula");
      }
    } catch (err) {
      console.error("Erro ao cancelar matrícula:", err.message);
    }
  }
  const handleDeleteEnrollment = (enrollmentId) => {
    console.log("📌 ID do enrollment:", enrollmentId);
    if (window.confirm("Deseja deletar sua conta?"))
      clickDeleteEnrollment(enrollmentId);
  };

  //Deletar Conta
  async function clickDelete(id) {

    try {
      const response = await fetch(`http://127.0.0.1:3000/api/students/delete/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      if (response.ok) {
        navigate(`/login`);
        // setSubjectData(subjectData.filter(subject => subject._id !== id));
      } else {
        console.error("Erro ao deletar conta");
      }
    } catch (err) {
      console.error("Erro ao deletar:", err.message);
    }
  }

  const handleDelete = (e) => {

    if (window.confirm("Deseja deletar sua conta?"))
      clickDelete(e);
  };

  //Atualizar dados
  async function clickUpdate(id) {

    try {
      const response = await fetch(`http://127.0.0.1:3000/api/students/edit/${id}`, {
        method: 'POST',
        body: JSON.stringify({
          phone: editPhone,
          email: editEmail,
          course: editCourse,
          address: editAddress,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      if (response.ok) {
        alert("Dados atualizados com sucesso");
        window.location.reload();
      } else {
        console.error("Erro ao atualizar dados");
      }
    } catch (err) {
      console.error("Erro ao atualizar:", err.message);
    }
  }

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Deseja atualizar seus dados?")) {
      await clickUpdate(id);
      setEditingStudent(null); // Fecha o formulário após edição
      window.location.reload();
    }
  };


  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center ">Logado no Sistema IFPE</h2>

        {/* Exibir dados do estudante */}
        {studentData && (
          <div className="mt-4">
            <h2 className="text-success">Bem-vindo, {studentData.name}!</h2>
            <ul className="list-group mt-3">
              <li className="list-group-item"><strong>Nome:</strong> {studentData.name}</li>
              <li className="list-group-item"><strong>Email:</strong> {studentData.email}</li>
              <li className="list-group-item"><strong>Telefone:</strong> {studentData.phone}</li>
              <li className="list-group-item"><strong>Curso:</strong> {studentData.course}</li>
            </ul>
          </div>
        )}

        {/* Exibir disciplinas matriculadas */}
        <div className="mt-4">
          <h3 className="text-success">Disciplinas Matriculadas:</h3>
          {enrollmentData?.subjects?.length > 0 ? (
            <ul className="list-group mt-3">
              {enrollmentData.subjects.map((enrollment) => (
                <li key={enrollment._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Nome:</strong> {enrollment.subject.name} <br />
                    <strong>Carga Horária:</strong> {enrollment.subject.hours} horas
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={() => handleDeleteEnrollment(enrollment._id)}>
                      Cancelar Matrícula
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-danger">📌 Nenhuma disciplina encontrada.</p>
          )}
        </div>

        {/* Exibir menu*/}
        <div className="mt-4">
          <h3 className="text-success">Menu</h3>
          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-primary ms-2" onClick={() => navigate(`/matricula/${studentId}`)}>
              Realizar Matrícula
            </button>

            <button
              type="button"
              className="btn btn-warning ms-2"
              onClick={() => {
                setEditingStudent(studentData);
                setEditPhone(studentData.phone);
                setEditEmail(studentData.email);
                setEditCourse(studentData.course);
                setEditAddress(studentData.address);
              }}
            >
              Atualizar dados
            </button>

            <button
              type="button"
              className="btn btn-danger  ms-2"
              onClick={() => handleDelete(studentData._id)} >
              Deletar Conta
            </button>
          </div>
        </div>

        {/* Atualizar dados */}
        {editingStudent && (
          <div className="mt-4">
            <h3 className="text-success">Atualizar dados</h3>
            <form onSubmit={(e) => handleUpdate(e, editingStudent._id)} className="login-form">
              <div className="form-group">
                <label>Telefone:</label>
                <input
                  type="text"
                  className="form-control"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>E-mail:</label>
                <input
                  type="text"
                  className="form-control"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Curso:</label>
                <input
                  type="text"
                  className="form-control"
                  value={editCourse}
                  onChange={(e) => setEditCourse(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Endereço:</label>
                <input
                  type="text"
                  className="form-control"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex align-items-center">
                <button type="submit" className="btn btn-primary ms-2">
                  Enviar
                </button>
                <button
                  type="button"
                  className="btn btn-primary ms-2"
                  onClick={() => setEditingStudent(null)} // Fecha o formulário ao cancelar
                >
                  Cancelar
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  )
}