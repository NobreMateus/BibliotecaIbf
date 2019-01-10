import React, { Component } from 'react';
import './css/modal.css';


class Dialog extends Component {
    
    
    render() {

        let livro = this.props.props;
        console.log(livro);
        let dialog = (
            <div className='dialog'>
                <button className="close-button" onClick={this.props.onClose}>x</button>
                <div>
                    <img src={livro.imgURL} /><br/>
                    {livro.title}
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