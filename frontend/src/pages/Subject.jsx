import React, { useState, useEffect } from "react";
//import "../styles/Subject.css";

export default function Subject() {

    const [subjectData, setSubjectData] = useState(null);
    const [name, setName] = useState('');
    const [hours, setHours] = useState([]);

    const [editingSubject, setEditingSubject] = useState(null);
    const [editName, setEditName] = useState('');
    const [editHours, setEditHours] = useState('');


    // Busca as disciplinas cadastradas
    useEffect(() => {
        async function fetchSubjectData() {
            try {
                const response = await fetch("http://127.0.0.1:3000/api/subjects/all");

                const data = await response.json();
                console.log("📌 Dados recebidos da API:", data);

                if (response.ok) {
                    setSubjectData(data);
                } else {
                    console.error("Erro ao buscar disciplinas", data.message);
                }
            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
            }
        }
        fetchSubjectData();
    }, []);

    // Cadastra uma nova disciplina
    async function clickSubscribe() {
        try {
            const response = await fetch('http://127.0.0.1:3000/api/subjects', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    hours: hours
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            const data = await response.json();
            if (response.ok) {
                alert("Disciplina cadastrada");
                console.log("Disciplina cadastrada", data);
                window.location.reload();
            } else {
                alert("Erro ao cadastrar!");
                console.error("Erro ao cadastrar:", data.message);
                window.location.reload();
            }
        } catch (err) {
            console.log(err.message);
        };

    }

    //Recebe o evento do formulário submit
    const handleSubmit = (e) => {
        e.preventDefault();
        clickSubscribe();
    };

    // Deleta uma disciplina
    async function clickDelete(id) {

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/subjects/delete/${id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            if (response.ok) {
                // Remove a disciplina do estado local
                setSubjectData(subjectData.filter(subject => subject._id !== id));
            } else {
                console.error("Erro ao deletar disciplina");
            }
        } catch (err) {
            console.error("Erro ao deletar:", err.message);
        }
    }

    const handleDelete = (e) => {

        if (window.confirm("Deseja excluir?"))
            clickDelete(e);
        window.location.reload();
    };

    //Atualiza disciplina
    async function clickUpdate(id) {

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/subjects/edit/${id}`, {
                method: 'POST',
                body: JSON.stringify({
                    name: editName,
                    hours: editHours
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            if (response.ok) {
                alert("Disciplina atualizada");
                window.location.reload();
            } else {
                console.error("Erro ao atualizar disciplina");
            }
        } catch (err) {
            console.error("Erro ao atualizar:", err.message);
        }
    }

    const handleUpdate = async (e, id) => {
        e.preventDefault();
        if (window.confirm("Deseja atualizar?")) {
            await clickUpdate(id);
            setEditingSubject(null); // Fecha o formulário após edição
            window.location.reload();
        }
    };


    return (
        <div className="container mt-5">


            <div className="card shadow p-4">
                {/* Exibir disciplinas matriculadas */}
                <div className="mt-4">
                    <h2 className="text-center ">Sistema IFPE</h2>
                    <h3 className="text-success">Disciplinas Cadastradas:</h3>
                    {subjectData?.length > 0 ? (
                        <ul className="list-group mt-3">
                            {subjectData.map((subject) => (
                                <li key={subject._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {/* Div dos textos */}
                                    <div>
                                        <strong>Nome:</strong> {subject.name} <br />
                                        <strong>Carga Horária:</strong> {subject.hours} horas
                                    </div>

                                    {/* Div dos botões */}
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-warning me-2"
                                            onClick={() => {
                                                setEditingSubject(subject); // Define a disciplina que será editada
                                                setEditName(subject.name); // Preenche o campo Nome
                                                setEditHours(subject.hours); // Preenche o campo Carga Horária
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger me-2"
                                            onClick={() => handleDelete(subject._id)}
                                        >
                                            Deletar
                                        </button>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-danger">📌 Nenhuma disciplina encontrada.</p>
                    )}
                </div>

                {/* Cadastra disciplina */}
                <div className="mt-4">
                    <h3 className="text-success">Cadastre uma nova disciplina</h3>
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
                            <label>Carga Horária:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Cadastrar
                        </button>
                    </form>
                </div>

                {/* Editar disciplina */}
                {editingSubject && (
                    <div className="mt-4">
                        <h3 className="text-success">Editar disciplina</h3>
                        <form onSubmit={(e) => handleUpdate(e, editingSubject._id)} className="login-form">
                            <div className="form-group">
                                <label>Nome:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Carga Horária:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editHours}
                                    onChange={(e) => setEditHours(e.target.value)}
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
                                    onClick={() => setEditingSubject(null)} // Fecha o formulário ao cancelar
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