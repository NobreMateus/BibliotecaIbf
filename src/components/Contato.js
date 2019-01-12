import React, { Component } from 'react';
import './css/add-style.css';
import { NavLink } from 'react-router-dom';

class Contato extends Component {
    
    sgMail = require('@sendgrid/mail');    
    
    constructor(){
        super();
        this.state = {
            nome: '',
            email: '',
            assunto: '',
            mensagem: ''
        }
        
        this.sgMail.setApiKey('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');
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
        console.log("ENVIANDO");
        const msg = {
            to: 'mateusnobref@gmail.com',
            from: this.state['email'],
            subject: this.state['assunto'],
            text: this.state['mensagem'],
            html: this.state['mensagem']+'<br /><strong>'+ this.state['nome']+'</strong>',
          };
         this.sgMail.send(msg).then(()=>{
            this.setState({
                nome: '',
                email: '',
                assunto: '',
                mensagem: '' 
            })
            alert('E-mail enviado com sucesso!');
         }).catch(a=>alert('Falha ao enviar E-mail'));

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