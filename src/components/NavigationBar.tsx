import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import React, {FC, useEffect, useState} from "react";
import {useParams, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {logoutSession} from "../store/reducers/Actions.tsx";


interface NavigationBarProps {
    handleSearchValue: (value: string) => void
}


const NavigationBar: FC<NavigationBarProps> = ({handleSearchValue}) => {


    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const {isAuth, is_moderator,user} = useAppSelector(state => state.userReducer)
    
    const [userState, setUserState] = useState<string | null>('');
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = (e.currentTarget.elements.namedItem('search') as HTMLInputElement)?.value;
        handleSearchValue(inputValue);
    };
    // userState!=null ? userState : ''

    const handleLogout = () => {
        dispatch(logoutSession())
        navigate('/cargo');
    };
    useEffect(() => {
        // dispatch()
        //@ts-ignore
   setUserState(user?.first_name)
    },[user])

    return (
        <Navbar expand="sm" className='bg-black' data-bs-theme="dark">
            <div className='container-xl px-2 px-sm-3'>
                {/* creates a bg icon */}
                <Navbar.Toggle aria-controls="basic-navbar-nav"/> 
                {/* activates this icon */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Link to="/cargo/" className="nav-link ps-0">Список грузов</Link>
                        </Nav.Item>
                        {isAuth && (
                        <Nav.Item>
                                <Link to="/orders" className="nav-link">
                                    Заказы
                                </Link>
                            </Nav.Item>) }
                         {isAuth && is_moderator== true && (
                        <Nav.Item>
                                <Link to="/cargoTable" className="nav-link">
                                Таблица грузов 
                                </Link>
                                
                            </Nav.Item>
                    
                   

                            ) }
                            {isAuth && is_moderator== true && (  <Nav.Item>
                    <Link to="/cargoNew" className="nav-link">
                    Создать груз
                    </Link>
                    
                </Nav.Item> )}
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
                            <>
                            <div className="ms-4 mb-1" style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="text-light me-2">{ userState!=null ? userState : ''}</span>
                               
                            </div>
                            <Nav className="ms-2 mb-1">
                                <Nav.Item>
                                    <Button variant="btn btn-outline-primary" onClick={handleLogout}>
                                        Выйти
                                    </Button>
                                </Nav.Item>
                            </Nav>
                            
                            
                        </>
                        ) : (
                            <>
                                <Nav className="ms-2 mb-1">
                                    <Nav.Item>
                                        <Link to="/login" className="btn btn-outline-primary">
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
