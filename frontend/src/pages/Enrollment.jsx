import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Enrollment() {
    const { studentId } = useParams();
    const [subjectId, setSubjectId] = useState('');
    const [enrollmentData, setEnrollmentData] = useState(null);

    console.log("📌 ID do estudante capturado da URL:", studentId);

    //Busca disciplinas cadastradas
    useEffect(() => {
        async function fetchEnrollmentData() {
            try {
                const response = await fetch(`http://localhost:3000/api/subjects/all`);
                const data = await response.json();
                console.log("📌 Dados recebidos do backend:", data);

                if (response.ok) {
                    setEnrollmentData(data);
                } else {
                    console.error("Erro ao buscar dados do estudante:", data.message);
                }
            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
            }
        }


        fetchEnrollmentData();

    }, [studentId]);

    //Realiza matrícula
    async function clickEnroll(subjectId) {

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/enrollments/${studentId}`, {
                method: 'POST',
                body: JSON.stringify({
                    studentId: studentId,
                    subjectId: subjectId,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            if (response.ok) {
                alert("Matrícula realizada");
                window.location.reload();
            } else {
                console.error("Erro ao realizar matrícula");
            }
        } catch (err) {
            console.error("Erro:", err.message);
        }
    }

    const handleEnroll = async (subjectId) => {
        console.log("📌 Tentando matricular na disciplina:", subjectId);

        if (!subjectId || subjectId.length !== 24) {
            console.error("Erro: subjectId inválido");
            return;
        }

        if (window.confirm("Deseja se matricular nessa disciplina?")) {
            await clickEnroll(subjectId);
            window.location.reload();
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center ">Realize aqui sua matrícula</h2>

                {/* Exibir disciplinas */}
                <h3 className="text-success">Disciplinas:</h3>
                {enrollmentData?.length > 0 ? (
                    <ul className="list-group mt-3">
                        {enrollmentData.map((enrollment) => (
                            <li key={enrollment._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {/* Div dos textos */}
                                <div>
                                    <strong>Nome:</strong> {enrollment.name} <br />
                                    <strong>Carga Horária:</strong> {enrollment.hours} horas
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-primary me-2"
                                        onClick={() => handleEnroll(enrollment._id)}
                                    >
                                        Matricular
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-danger">📌 Nenhuma disciplina encontrada.</p>
                )}
            </div>
        </div>
    )

}