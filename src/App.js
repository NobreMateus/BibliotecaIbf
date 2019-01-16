import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Livros from './components/Livros';
import logo from './LOGO.png';
import { NavLink } from 'react-router-dom';

class App extends Component {
  
  _allBooks = [];

  constructor(){
    super();
    this.state = {
      livros:[],
      pesquisa:"",
      qLivros:15
    }
    document.addEventListener('scroll', ()=>{
      if(window.scrollY + window.innerHeight >= document.body.clientHeight - 200){
        this.carregaMais();
      }
    })
    
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
        livros: this._allBooks//.slice(0,this.state['qLivros'])
      })
    
    });
    
  }
  

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <span><img src={logo} alt="logo" height='72px' width='72px' /></span>
          <span className='pesquisa'>
            <input type="text" name="firstname" value={this.state['pesquisa']} placeholder="Pesquisar..." onChange={(a)=>this.pesquisaChange(a.target.value)}/>
          </span>
          <span>
            <NavLink to="/contato/" className={"App-link"}>CONTATO</NavLink>
          </span>

        </header>
        <div className="App-body">
          <Livros livros={this.state['livros'].slice(0,this.state['qLivros'])}/>
        </div>
      </div>
    );
  }

  carregaMais(){
    if(this.state['qLivros']<this._allBooks.length)
      this.setState({
        qLivros: this.state['qLivros'] + 10
      })
  }
  
  pesquisaChange(text){
    let foundBooks = this._allBooks.filter(
      (t) => 
        this.removeAcento(t['titulo'])
        .includes(this.removeAcento(text))
      ||
      this.removeAcento(t['autor'].toLowerCase())
      .includes(this.removeAcento(text.toLowerCase()))
    );

    this.setState({
      pesquisa:text,
      livros: foundBooks,
      qLivros:15
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
