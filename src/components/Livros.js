import React, { Component } from 'react';
import './css/livros-style.css';
import Livro from './Livro';

export default class Livros extends Component {

    render() {
        console.log(this.props.livros)  ;
        return (
            <div className='container'>
                {this.props.livros.map((livro, key) => {
                    return (
                        <div key={key} className='livrosArea'>
                            <Livro livro={livro} />
                        </div>
                    )
                })}
            </div>
        );
    }

}