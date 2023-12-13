import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import React, {FC} from "react";

interface NavigationBarProps {
    handleSearchValue: (value: string) => void
}


const NavigationBar: FC<NavigationBarProps> = ({handleSearchValue}) => {

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = (e.currentTarget.elements.namedItem('search') as HTMLInputElement)?.value;
        handleSearchValue(inputValue);
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
                        {/* <Nav.Item>
                            <Link to="/cargo" className="nav-link"></Link>
                        </Nav.Item> */}
                        {/* <NavDropdown title="Фильтрация" id="basic-nav-dropdown"> */}
                    {/* <NavDropdown.Item as={Link} to="/cargo/12">Обеденный набор 1</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/cargo/14">Запасная одежда</NavDropdown.Item> */}
                    {/* <NavDropdown.Item onClick={() => handleFilter('weight')}>По весу</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleFilter('name')}>По названию</NavDropdown.Item> */}
                    {/* <NavDropdown.Item onClick={() => handleFilter('weight')}>По весу</NavDropdown.Item> */}
                    
                  {/* </NavDropdown> */}
                    </Nav>
                    <Form onSubmit={handleSearch} className="d-flex">
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
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavigationBar;
