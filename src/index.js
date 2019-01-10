import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AddBook from './AddBook';
import Contato from './components/Contato';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
// import {Router, Switch, Route} from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';



var config = {
    apiKey: "AIzaSyCrScdVYTLzwnprFc8C6-JYeq70PCBqbVQ",
    authDomain: "biblioteca-ibf.firebaseapp.com",
    databaseURL: "https://biblioteca-ibf.firebaseio.com",
    projectId: "biblioteca-ibf",
    storageBucket: "biblioteca-ibf.appspot.com",
    messagingSenderId: "156517160632"
};

firebase.initializeApp(config);

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/adiciona" component={AddBook}/>
            <Route path="/contato" component={Contato}/>
            {/* <Route component={App}/> */}
        </div>
    </ Router>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
