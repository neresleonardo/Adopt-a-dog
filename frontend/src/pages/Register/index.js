import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Register() {    
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [whatsapp, setWhatsapp] = useState('');
        const [city, setCity] = useState('');
        const [uf, setUf] = useState('');

        const history = useHistory();


   async function handleRegister(e){
        e.preventDefault();

       const date = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {

        const response = await api.post('user', date);

        alert(`Seu ID de acesso: ${response.data.id}`);

        history.push('/');
        } catch(err) {
            alert('Erro no cadastro,tente novamente')
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
            

                  <h1>Faca seu cadastro</h1>
                  <p>Quando você adotar um cachorro você entenderá que não está salvando uma vida, está salvando a si mesmo.</p>
                  
                  <Link className="back-link" to="/">
                <FiArrowLeft size={16} color="red" />
                Não tenho cadastro ainda.</Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Seu Nome"
                    value={name}
                    required
                    onChange={e => setName(e.target.value)}/>


                    <input 
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)} />



                    <input 
                    placeholder="WhatsApp" 
                    value={whatsapp}
                    required
                    onChange={e => setWhatsapp(e.target.value)}/>

                    <div className="input-group">

                    <input 
                    placeholder="Cidade"
                    value={city}
                    required
                    onChange={e => setCity(e.target.value)} />

                    <input placeholder="UF"
                     style={{width:80 }}
                     value={uf}
                     required
                    onChange={e => setUf(e.target.value)} />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}