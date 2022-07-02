import React from 'react';  
import { useLocation, useNavigate } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { orgData } from '../../data/formInfo';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
 
const orgData_ = orgData();

const nombreSistema = orgData_[1];


const NavbarUsers = ({ auth: { isAuthenticated }, logout, user }) => {
    const location = useLocation();
    let navigate = useNavigate();
    const changePswd = () =>{
        let redirect = '';
        if(user){
            redirect = '/' + user.baseURL + "/rstpsw";
            navigate(redirect);
        } 
    }
    const userLinks = (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#">{nombreSistema}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" activeKey={location.pathname}>
                        <Nav.Link
                            href={user ? "/" +  user.baseURL + "/numeralia" : ""}
                            className="nav-item nav-link"
                            exact='true'
                        >
                            NUMERALIA
                        </Nav.Link>
                        <Nav.Link
                            href={user ? "/" +  user.baseURL + "/query" : ""}
                            className="nav-item nav-link"
                            exact='true'
                        >
                            CONSULTAS
                        </Nav.Link>
                        {
                            (Number(user.Nivel) < 3)?  <Nav.Link
                            href={user ? "/" +  user.baseURL + "/goals" : ""}
                            className="nav-item nav-link"
                            exact='true'
                        >
                            METAS
                        </Nav.Link>
                        : ''
                        }
                        {
                            (Number(user.Nivel) === 1)?  <Nav.Link
                            href={user ? "/" +  user.baseURL + "/edit" : ""}
                            className="nav-item nav-link"
                            exact='true'
                        >
                            EDITAR
                        </Nav.Link>
                        : ''
                        }
                        <Nav.Link
                            href={user ? "/" +  user.baseURL + "/agreggate" : ""}
                            className="nav-item nav-link"
                            exact='true'
                        >
                            EXPLOTACIÓN
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={user ? user.username : ""} id="nav-dropdown">
                            <NavDropdown.Item onClick={changePswd}>Configuración</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>Salir</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>        
    );
    
    const adminLinks = (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#">{nombreSistema}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto" activeKey={location.pathname}>
                    <NavDropdown title="NUMERALIA" id="navbarScrollingDropdown">
                        <NavDropdown.Item 
                                href={user ? "/" +  user.baseURL + "/numeralia" : ""}
                                exact='true'
                        >
                            Hoy
                        </NavDropdown.Item>
                        <NavDropdown.Item 
                                href={user ? "/" +  user.baseURL + "/classify" : ""}
                                exact='true'
                        >
                            Clasificación
                        </NavDropdown.Item>
                        <NavDropdown.Item 
                                href={user ? "/" +  user.baseURL + "/goals" : ""}
                                exact='true'
                        >
                            Metas
                        </NavDropdown.Item>
                        <NavDropdown.Item 
                                href={user ? "/" +  user.baseURL + "/edit" : ""}
                                exact='true'
                        >
                            Editar
                        </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="CONSULTAS" id="navbarScrollingDropdown">
                        <NavDropdown.Item 
                                href={user ? "/" +  user.baseURL + "/query" : ""}
                                exact='true'
                        >
                            Consulta de datos
                        </NavDropdown.Item>
                        <NavDropdown.Item 
                                href={user ? "/" +  user.baseURL + "/agreggate" : ""}
                                exact='true'
                        >
                            Explotación
                        </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="ADMINISTRACIÓN" id="navbarScrollingDropdown">
                        <NavDropdown.Item 
                                href={user ? "/" +  user.baseURL + "/users" : ""}
                                exact='true'
                        >
                            Usuarios
                        </NavDropdown.Item>
                        <NavDropdown.Item 
                                href={user ? "/" +  user.baseURL + "/consecutive" : ""}
                                exact='true'
                        >
                            Consecutivos
                        </NavDropdown.Item>
                    </NavDropdown>
                                                
                    </Nav>
                    <Nav>
                        <NavDropdown title={user ? user.username : ""} id="nav-dropdown">
                            <NavDropdown.Item onClick={changePswd}>Configuración</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>Salir</NavDropdown.Item>
                        </NavDropdown>                       

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
    let Links;

    if(user){
        switch (user.baseURL) {
            case 'user':
                Links = userLinks;
                break;
            case 'jud':
                Links = userLinks;
                break;
            case 'sub':
                Links = userLinks;
                break;
            case 'dir':
                Links = userLinks;
                break;
            case 'admin':
                Links = adminLinks;
                break;
            default:
                break;
        }
    }
    return (
        <>
            {isAuthenticated ? Links : <></>}
        </>
    )
}

NavbarUsers.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavbarUsers);
