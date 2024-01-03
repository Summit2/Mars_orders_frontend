import {FC, useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {loginSession} from "../../store/reducers/Actions.tsx";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
interface LoginPageProps {

}

const LoginPage: FC<LoginPageProps> = () => {
    const dispatch = useAppDispatch()
    const {error, isAuth} = useAppSelector(state => state.userReducer)
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleSubmit = () => {
        if (!login || !password) {
            alert('Введите логин и пароль');
            return;
        }
        dispatch(loginSession(login, password))
    };

    const handleLogin = async () => {
        await handleSubmit()
        navigate("/cargo")
    }


    return (
        <>
            <Container>
                <label className="link-danger text-wrong-password">
                    {error}
                </label>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <div className="bg-dark p-4 rounded">
                            <h2 className="text-center mb-4" style={{ color: 'white' }}>Авторизация</h2>
                            <Form.Label className="font-weight-bold text-left"></Form.Label>
                            <Form.Control
                                onChange={(e) => setLogin(e.target.value)}
                                type="login"
                                placeholder="Введите почту"
                                required
                            />

                            <Form.Label className="mt-3"></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <Button variant="primary" type="submit" className="w-100 mt-4" onClick={handleLogin}
                                    style={{borderRadius: '10px'}}>
                                Войти
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;