import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Livros from './components/Livros';
import axios from 'axios';
import Livro from './Livro';

class AddBook extends Component {
  _found = true;
  constructor(){
    super();
    this.state = {
      livro:undefined,
      isbn:'',
      title:'',
      description:'',
      authors:'',
      imgURL:''
    }
  }

  getData(isbn){
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`).then(l=>{
      if(l['data']['totalItems']>0){
        this._found=true;
        let livroInfo = l.data.items[0].volumeInfo;
        let imgCapa = livroInfo['imageLinks']?livroInfo['imageLinks']['thumbnail']:"https://firebasestorage.googleapis.com/v0/b/biblioteca-ibf.appspot.com/o/capas%2Fsem-capa.jpg?alt=media&token=824f09d0-39fa-4ac3-9b2c-fd69d864457b";
        let livro = new Livro(isbn, livroInfo['title'], livroInfo['authors'], livroInfo['description'], imgCapa);
        console.log(livro);
        this.setState({
            isbn:isbn,
            title: livroInfo['title'],
            description: livroInfo['description'],
            authors:livroInfo['authors'],
            imgURL: imgCapa
        })
        }else{
            console.log('Não Encontrado');
            this.setState({
                isbn:isbn,
                title:'',
                description:'',
                authors:''
            })
            this._found=false;
        }
    });
  }

  render() {
    let livroInfo = this.state['livro'];
    return(
    <div>

      ISBN: <input type="text" name="firstname" value={this.state['isbn']} placeholder="Pesquisar..." onChange={(a)=>this.isbnChange(a.target.value)}/>
      <button onClick={a=>this.getData(this.state['isbn'].replace(/-/g,''))} >CLICK TO DATA</button><br />
      Título: <input type="text" value={this.state['title']} onChange={(a)=>this.titleChange(a.target.value)}/><br />
      Autores: <input type="text" value={this.state['authors']} onChange={(a)=>this.authorsChange(a.target.value)}/><br />
      Descrição: <input type="text" value={this.state['description']} onChange={(a)=>this.titleChange(a.target.value)}/><br />
      URL Imagem: <input type="text" value={this.state['imgURL']} onChange={(a)=>this.imgURLChange(a.target.value)}/><br />
      <img src={this.state['imgURL']} /> 
      {!this._found?<span>Não Encontrado!</span>:<span></span>}<br />

      <button onClick={a=>this.saveFirebase()} >ADICIONAR AO FIREBASE</button><br />
    </div>

    )
  }


  saveFirebase(){
    let livro = this.state;
    const rootRef = firebase.database().ref();
    const bookRef = rootRef. child('Livros').update({
         [livro['isbn']]:{
            titulo:livro['title'],
            autor: livro['authors'],
            descricao: livro['description'],
            imgURL: livro['imgURL'],
            quantidade: 1
        }
    }, ()=>console.log('Funcionou'))
    .then(t=>console.log(t));
  }
  
  isbnChange(text){
    this.setState({
        isbn:text
    });
  }

  titleChange(text){
    this.setState({
        title:text
    });  
  }

  authorChange(text){
    this.setState({
        author:text
    });  
  }

  descriptionChange(text){
    this.setState({
        description:text
    });  
  }

  imgURLChange(text){
    this.setState({
        imgURL:text
    });  
  }

}

export default AddBook;