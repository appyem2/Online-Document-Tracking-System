import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/header';
import MenuBar from './components/MenuBar/menubar';

class  App extends Component {
        render(){
                return(
                        <div>
                                <Header/>
                                <div class="container">
                                        <div class="row">
                                                <MenuBar />
                                        </div>
                                </div>
                        </div>
                );
        }
}

export default App;
