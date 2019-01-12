import React, { Component } from 'react';
import './css/modal.css';


class Dialog extends Component {
    
    
    render() {

        let livro = this.props.props;
        let dialog = (
            <div className='modal-container'>
                <div className='dialog'>
                    <button className="close-button" onClick={this.props.onClose}>x</button>
                        {/* <div><img width='500px' src={livro.imgURL} /></div>
                        <div>
                            {livro.titulo}<br />
                            {livro.descricao}<br />
                            {livro.autor}<br />
                        </div> */}
                    <div className='content-dialog'>
                        <span><img width='200px' src={livro.imgURL} /></span>
                        <span>
                            {livro.titulo} <br />
                            {livro.autor} <br /><br />
                            {livro.descricao} <br />
                        </span>
                    </div>
                </div>
            </div>
        );

        if (! this.props.isOpen) {
            dialog = null;
        }
        return (
            <div>
                {dialog}
            </div>
        );
    }
}

export default Dialog;