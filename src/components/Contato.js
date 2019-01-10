import React, { Component } from 'react';
import './css/add-style.css';
import { NavLink } from 'react-router-dom';

class Contato extends Component {
    
    constructor(){
        super();
        this.state = {
            nome: '',
            email: '',
            assunto: '',
            messagem: ''
        }
    }

    render(){
        return(
            <div className="contato-container">
                <NavLink to="/" className={"App-link"}>
                    <div className="btn-volta">X</div>
                </NavLink>
                <div className="contato-title">Contato</div>
                <div className="contato-form">
                    <div className="contato-info">
                        <input className="input-text" type="text" name="firstname" value={this.state['nome']} placeholder="Seu Nome" onChange={(a)=>this.isbnChange(a.target.value)}/>
                        <input className="input-text" type="text" value={this.state['email']} placeholder="Seu E-mail"  onChange={(a)=>this.titleChange(a.target.value)}/>
                        <input className="input-text" type="text" value={this.state['assunto']} placeholder="Assunto" onChange={(a)=>this.authorsChange(a.target.value)}/>
                    </div>
                    <div className="msg-info">
                        <textarea className="textarea-text" rows="9" cols="50"  placeholder="Mensagem..." ></textarea><br/>
                    </div>
                </div>
                <div className="envia-contato">
                    ENVIAR
                </div>
            </div>
        )
    }
}

export default Contato;