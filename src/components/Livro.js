import React, { Component } from 'react';
import './css/livro-style.css';
import Dialog from './Dialog';

export default class Livro extends Component{

    constructor(){
        super();
        this.state ={
            isOpen: false
        }
    }

    closeModal(){
        this.setState({isOpen:false})
        console.log(this.state['isOpen']+"teste");
    }

    render(){

        let livro = this.props.livro;

        let modal=(
            <Dialog props={livro} isOpen={true} onClose={()=>this.closeModal()} />
        )

        return (
            <div>
                {this.state['isOpen']?modal:null}                    
                <div className='containerLivro' onClick={(e) =>this.setState({isOpen:true})}>
                    <div className='capa'>
                        <img src={livro.imgURL} alt="capa" height='218px' width= '160px'/>
                    </div>
                    <div>
                        <div className='title'>{livro.titulo}</div>
                    </div>
                </div>
            </div>
        );
    }

}
