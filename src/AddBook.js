import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import axios from 'axios';
import './components/css/add-style.css';

class AddBook extends Component {
  _found = true;
  _btnActive=true;
  _showInfo=false;

  constructor(){
    super();
    this.state = {
      livro:undefined,
      isbn:'',
      title:'',
      description:'',
      authors:'',
      editora:'',
      paginas:0,
      quantidade:1,
      imgURL:'',

      info:''
    }
  }


  getData(isbn){
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`).then(l=>{
      if(l['data']['totalItems']>0){
        this._found=true;
        let livroInfo = l.data.items[0].volumeInfo;
        let imgCapa = livroInfo['imageLinks']?livroInfo['imageLinks']['thumbnail']:"https://firebasestorage.googleapis.com/v0/b/biblioteca-ibf.appspot.com/o/capas%2Fsem-capa.jpg?alt=media&token=824f09d0-39fa-4ac3-9b2c-fd69d864457b";
        this.setState({
            isbn:isbn,
            title: livroInfo['title'],
            description: livroInfo['description'],
            authors:livroInfo['authors'].join(", "),
            editora:livroInfo['publisher'],
            imgURL: imgCapa
        })
        }else{
            console.log('Não Encontrado');
            this.setState({
                isbn:isbn,
                title:'',
                description:'',
                authors:'',
                paginas:0,
                imgURL: '',
                info: "ISBN não encontrado!"
            })
            this._showInfo=true;
        }
    }).catch(()=>{
      console.log('Não Encontrado');
      this.setState({
          isbn:'',
          title:'',
          description:'',
          authors:'',
          paginas:0,
          imgURL: '',
          info: "ISBN não encontrado!"
      })
      this._showInfo=true;
    });
  }

  render() {
    return(
    <div className={"add-container"}>
      <div className="form-container">
        
        {this._showInfo?
        <div className="info-box">{this.state['info']}</div>
        :<div></div>}

        <span className="input-label2">ISBN:</span>
        <input className="input-text2" type="text" name="firstname" value={this.state['isbn']} placeholder="Pesquisar..." onChange={(a)=>this.isbnChange(a.target.value)}/>
        <button className="botao" onClick={a=>this.getData(this.state['isbn'].replace(/-/g,''))} >CLICK TO DATA</button>
        <span className="input-label2">Título:</span>
        <input className="input-text2" type="text" value={this.state['title']} onChange={(a)=>this.titleChange(a.target.value)}/>
        <span className="input-label2">Autores:</span>
        <input className="input-tex2" type="text" value={this.state['authors']} onChange={(a)=>this.authorsChange(a.target.value)}/>
        <span className="input-labe2">Descrição:</span>
        <textarea className="textarea-text2" rows="5" cols="70" value={this.state['description']} onChange={(a)=>this.descriptionChange(a.target.value)}></textarea><br/>
        <span className="input-label2">Editora:</span>
        <input className="input-text2" type="text" value={this.state['editora']} onChange={(a)=>this.editoraChange(a.target.value)}/>
        <span className="input-label2">Quantidade:</span>
        <input className="input-text2" type="number" value={this.state['quantidade']} onChange={(a)=>this.quantidadeChange(a.target.value)}/>
        <span className="input-label2">Páginas:</span>
        <input className="input-text2" type="number" value={this.state['paginas']} onChange={(a)=>this.paginasChange(a.target.value)}/>
        <span className="input-label2">URL Imagem:</span>
        <input className="input-text2" type="text" value={this.state['imgURL']} onChange={(a)=>this.imgURLChange(a.target.value)}/>
        <img className="img-capa" alt="capa" src={this.state['imgURL']} /> 
        
        {!this._found?<span>Não Encontrado!</span>:<span></span>}

        <button disabled={!this._btnActive} className="botao" onClick={a=>this.saveFirebase()} >ADICIONAR AO FIREBASE</button>
      </div>
    </div>

    )
  }

  succesSave(){
    this._showInfo=true;
    this._btnActive=true;
    this.setState({
      isbn:'',
      title:'',
      description:'',
      authors:'',
      paginas:0,
      imgURL: '',
      info:"Livro adicionado com sucesso!"
    })
  }

  saveFirebase(){
    this._btnActive=false;
    let livro = this.state;
    console.log(livro);
    
    const rootRef = firebase.database().ref();
    rootRef.child('Livros').update({
         [livro['isbn']]:{
            titulo:livro['title']?livro['title']:'',
            autor: livro['authors']?livro['authors']:'',
            descricao: livro['description']?livro['description']:'',
            editora: livro['editora']?livro['editora']:'',
            imgURL: livro['imgURL']?livro['imgURL']:'',
            paginas: livro['paginas']?livro['paginas']:0,
            quantidade: livro['quantidade']?livro['quantidade']:1
        }
    }, ()=>this.succesSave());
  }
  
  isbnChange(text){
    this.setState({
        isbn:text
    });
  }

  titleChange(text){
    this.setState({
        title:text.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })
    });  
  }

  authorsChange(text){
    console.log(text);
    this.setState({
        authors:text.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })
    });  
  }

  editoraChange(text){
    this.setState({
        editora:text
    });  
  }

  quantidadeChange(text){
    this.setState({
        quantidade:text
    });  
  }

  descriptionChange(text){
    this.setState({
        description:text
    });  
  }

  paginasChange(text){
    this.setState({
        paginas:text
    });  
  }

  imgURLChange(text){
    this.setState({
        imgURL:text
    });  
  }

}

export default AddBook;