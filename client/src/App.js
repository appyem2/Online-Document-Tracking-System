import React, { Component } from 'react';
import './App.css';
import {Container} from 'reactstrap';

class  App extends Component {
        render(){
                return(
                        <Container className="text-center">
                                <h1>Online Document Tracking System</h1>
                                <p>Developed by: Souradip Nath, Soumili Bera, Aparajita Biswas</p>
                        </Container>
                );
        }
}

export default App;
