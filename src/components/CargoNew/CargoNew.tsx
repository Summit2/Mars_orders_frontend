import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { fetchCargo } from '../../store/reducers/Actions.tsx';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { registerLocale } from 'react-datepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

interface CargoTableProps {
  setPage: () => void;
}

const CargoNew: FC<CargoTableProps> = ({ setPage }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.userReducer);

  const [cargoName, setCargoName] = useState('');
  const [cargoDescription, setCargoDescription] = useState('');
  const [cargoImage, setCargoImage] = useState<File | null>(null);
  const [cargoWeight, setCargoWeight] = useState<number>(0);


  useEffect(() => {
    setPage();
    dispatch(fetchCargo());
  }, []);
  const handleCreateCargo = () => {

    if (!cargoName || !cargoWeight ) {
                alert('Обязательные поля не заполнены!');
        return;
      }

      
    const fileInput = document.getElementById('cargoImage') as HTMLInputElement;
  
    if (fileInput?.files?.length) {
      const file = fileInput.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const encodedImage = reader.result as string;
        // Use encodedImage as needed
        console.log('Encoded Image:', encodedImage);
      };

    }
  
    // Add logic to send cargo data to the server or perform other actions
    console.log('Creating cargo with the following details:');
    console.log('Cargo Name:', cargoName);
    console.log('Cargo Description:', cargoWeight);
  };
  
  return (
    <>
      <Container>
        {isAuth ? (
          <Row className="justify-content-center">
            <Col md={5}>
              <div className="bg-dark p-4 rounded">
                <h2 className="text-center mb-4" style={{ color: 'white' }}>
                  Создание груза
                </h2>

                <Form.Group controlId="cargoName">
                  <Form.Label className="font-weight-bold text-left">Название груза:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите название груза"
                    value={cargoName}
                    onChange={(e) => setCargoName(e.target.value)}
                    required
                  />
                </Form.Group>

                 <Form.Group controlId="cargoWeight" className="mt-3">
                <Form.Label className="font-weight-bold text-left">Вес груза</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Введите вес груза"
                    value={cargoWeight} // Use cargoWeight instead of cargoName
                    onChange={(e) => setCargoWeight(Number(e.target.value))} // Parse the value to a number
                    required
                />
                </Form.Group>

                <Form.Group controlId="cargoDescription" className="mt-3">
                  <Form.Label className="font-weight-bold text-left">Описание груза:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Введите описание груза"
                    value={cargoDescription}
                    onChange={(e) => setCargoDescription(e.target.value)}
                    
                  />
                </Form.Group>
                

                <Form.Group controlId="cargoImage" className="mt-3">
                  <Form.Label className="font-weight-bold text-left">Изображение груза:</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={(e) => setCargoImage(e.target.files?.[0] || null)} />
                </Form.Group>

                <Button
                  variant="primary"
                  type="button"
                  className="w-100 mt-4"
                  onClick={handleCreateCargo}
                  style={{ borderRadius: '10px' }}
                >
                  Создать груз
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <div>Error</div>
        )}
      </Container>
    </>
  );
};

export default CargoNew;
