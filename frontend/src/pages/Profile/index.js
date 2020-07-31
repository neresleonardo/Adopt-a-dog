import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";
import "./styles.css";

export default function Profile() {
  const [casos, setCasos] = useState([]);

  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  const history = useHistory();

  useEffect(() => {
    api
      .get("/profile", {
        headers: { Authorization: userId }
      })
      .then(response => {
        setCasos(response.data);
      });
  }, [userId]);

  async function handleDeleteCasos(id) {
    try {
      await api.delete(`casos/${id}`, {
        headers: {
          Authorization: userId
        }
      });

      setCasos(casos.filter(casos => casos.id !== id));
    } catch (err) {
      alert("Erro ao deletar o caso");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="profile-container">
      <header>
        <span>Bem vindo(a), {userName}</span>

        <Link to="/casos/new" className="button">
          Cadastrar novo cachorro
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1> Cachorros cadastrados</h1>

      <ul>
        {casos.map(casos => (
          <li key={casos.id}>
            <strong>CASO:</strong>
            <p>{casos.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{casos.description}</p>

            <strong>VALOR:</strong>
            <p>
            <p>{casos.raca}</p>
            </p>

            <button
              type="button"
              onClick={() => handleDeleteCasos(casos.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  
  );
}