import React, { Component } from 'react';
import './css/add-style.css';
import { NavLink } from 'react-router-dom';
import back from '../icone-voltar.png';
import * as firebase from 'firebase';

class Contato extends Component {
    
    _saving = false;

    constructor(){
        super();
        this.state = {
            nome: '',
            email: '',
            assunto: '',
            mensagem: ''
        }
        
    }

    render(){
        return(
            <div className="contato-container">
                <div className="volta-container">
                    <NavLink to="/" className={"App-link"}>
                        <div className="btn-volta"><img alt='' src={back} /></div>
                    </NavLink>
                </div>
                <div className="contato-title">Contato</div>
                <div className="contato-form">
                    <div className="contato-info">
                        <input className="input-text" type="text" name="firstname" value={this.state['nome']} placeholder="Seu Nome" onChange={(a)=>this.nomeChange(a.target.value)}/>
                        <input className="input-text" type="text" value={this.state['email']} placeholder="Seu E-mail"  onChange={(a)=>this.emailChange(a.target.value)}/>
                        <input className="input-text" type="text" value={this.state['assunto']} placeholder="Assunto" onChange={(a)=>this.assuntoChange(a.target.value)}/>
                    </div>
                    <div className="msg-info">
                        <textarea className="textarea-text" rows="9" cols="50"  value={this.state['mensagem']} placeholder="Mensagem..." onChange={(a)=>this.mensagemChange(a.target.value)} ></textarea><br/>
                    </div>
                </div>
                <div className="envia-contato" onClick={()=>this.enviaEmail()}>
                    ENVIAR
                </div>
            </div>
        )
    }

    enviaEmail(){
        let date = new Date().getTime();
        let msg = this.state;
    
        const rootRef = firebase.database().ref();
        if(!this._saving){
            this._saving = true;
            rootRef.child('Emails').update({
                [date]:{
                    nome: msg['nome'],
                    email: msg['email'],
                    assunto: msg['assunto'],
                    mensagem: msg['mensagem']   
                }
            }, ()=>this.succesSave());
        }
    }

    succesSave(){
        this.setState({
            nome: '',
            email: '',
            assunto: '',
            mensagem: ''
        });
        this._saving = false;
        alert('Mensagem enviada com sucesso!');
    }

    nomeChange(text){
        this.setState({
            nome:text
        })
    }

    assuntoChange(text){
        this.setState({
            assunto:text
        })
    }

    mensagemChange(text){
        this.setState({
            mensagem:text
        })
    }

    emailChange(text){
        this.setState({
            email:text
        })
    }
}

export default Contato;