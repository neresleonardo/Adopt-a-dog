import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";


export default function NewCasos() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [raca, setValue] = useState("");

  const userId = localStorage.getItem("userId");

  const history = useHistory();

  async function handleNewCasos(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      raca
    };

    try {
      await api.post("/casos", data, {
        headers: { Authorization: userId }
      });

      history.push("/profile");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente");
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o cachorro em detalhadamente para encontrar um dono para ele.
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewCasos}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={raca}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}