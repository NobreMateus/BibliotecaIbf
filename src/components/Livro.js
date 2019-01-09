import React, { Component } from 'react';
import './css/livro-style.css';

export default class Livro extends Component{

    render(){
        return (
                <div className='containerLivro'>
                        <div className='capa'>
                            <img src={this.props.imgURL} alt="capa" height='218px' width= '160px'/>
                        </div>
                    <div>
                        <div className='title'>{this.props.title}</div>
                        <div className='autor'>{this.props.autor[0]}</div>
                    </div>
                </div>
        );
    }

}
