import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import React, {FC} from "react";

import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {logoutSession} from "../store/reducers/Actions.tsx";


interface NavigationBarProps {
    handleSearchValue: (value: string) => void
}


const NavigationBar: FC<NavigationBarProps> = ({handleSearchValue}) => {

    // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const inputValue = (e.currentTarget.elements.namedItem('search') as HTMLInputElement)?.value;
    //     handleSearchValue(inputValue);
    // };
    const dispatch = useAppDispatch()
    const {isLoading, success, error, isAuth} = useAppSelector(state => state.userReducer)

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = (e.currentTarget.elements.namedItem('search') as HTMLInputElement)?.value;
        handleSearchValue(inputValue);
    };

    const handleLogout = () => {
        dispatch(logoutSession())
    };

    return (
        <Navbar expand="sm" className='bg-black' data-bs-theme="dark">
            <div className='container-xl px-2 px-sm-3'>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Link to="/cargo/" className="nav-link ps-0">Список грузов</Link>
                        </Nav.Item>
                        <Nav.Item>
                                <Link to="/request" className="nav-link">
                                    Заявка на заказ
                                </Link>
                            </Nav.Item>
                    </Nav>
                    <Form onSubmit={handleSearch} className="d-flex mb-1">
                        <FormControl
                            id={'search-text-field'}
                            type="text"
                            name="search"
                            placeholder="Введите название груза"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button type="submit" variant="outline-light">Поиск</Button>
                    </Form>
                    {isAuth ? (
                            <Nav className="ms-2 mb-1">
                                <Nav.Item>
                                    <Button variant="outline-light" onClick={handleLogout}>
                                        Выйти
                                    </Button>
                                </Nav.Item>
                            </Nav>
                        ) : (
                            <>
                                <Nav className="ms-2 mb-1">
                                    <Nav.Item>
                                        <Link to="/login" className="btn btn-outline-light">
                                            Войти
                                        </Link>
                                    </Nav.Item>
                                </Nav>
                                <Nav className="ms-2 mb-1">
                                    <Nav.Item>
                                        <Link to="/register" className="btn btn-outline-primary">
                                            Регистрация
                                        </Link>
                                    </Nav.Item>
                                </Nav>
                            </>
                        )}
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavigationBar;
