import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Livros from './components/Livros';
import logo from './LOGO.png';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Modal } from './Modal';

class App extends Component {
  
  _allBooks = [];

  constructor(){
    super();
    this.state = {
      livros:[],
      pesquisa:""
    }
  }

  componentDidMount(){
    const rootRef = firebase.database().ref();
    const bookRef = rootRef.child('Livros');
    bookRef.on('value', snap =>{
      let livros = snap.val();
      let livrosArray = [];
      for(let livro in livros){
        if(livro){
          livrosArray.push(livros[livro]);        
        }
      } 
      this._allBooks = livrosArray; 
      this.setState({
        livros: livrosArray
      })
    });
    
  }


  render() {

    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <div>Olá, eu sou um modal!</div>
          <button onClick={this.escondeModal}>Hide modal</button>
        </div>
      </Modal>
    ) : null;

    return (
      <div className="App">
        <header className="App-header">
          <span><img src={logo} height='72px' width='72px' /></span>
          <span className='pesquisa'>
            <input type="text" name="firstname" value={this.state['pesquisa']} placeholder="Pesquisar..." onChange={(a)=>this.pesquisaChange(a.target.value)}/>
          </span>
          <span>
            <NavLink to="/adiciona" className={"App-link"}>ADICIONAR LIVROS</NavLink>
          </span>

        </header>
        <div className="App-body">
          <Livros livros={this.state['livros']}/>
        </div>
      </div>
    );
  }

  
  pesquisaChange(text){

    let foundBooks = this._allBooks.filter(
      (t) => this.removeAcento(t['titulo'].toLowerCase())
      .includes(this.removeAcento(text.toLowerCase())) //||
      // this.removeAcento(t['autor'].toLowerCase())
      // .includes(this.removeAcento(text.toLowerCase()))
    );

    this.setState({
      pesquisa:text,
      livros: foundBooks
    });
  }

  removeAcento(text){       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
  }
}

export default App;
