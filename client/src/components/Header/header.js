import React from 'react';
import './styles.css';
import {Navbar, Container, Button} from 'react-bootstrap';

class Header extends React.Component {
        
        render(){
                return(
                        <Navbar color="light" light className="sticky-top" id="header">
                                <Container>
                                        <Navbar.Brand href="/">Online Document Tracking System</Navbar.Brand>
                                        <Button variant="primary">Create New Document</Button>
                                        
                                        
                                </Container>
                        </Navbar>
                );
        }
}

export default Header;