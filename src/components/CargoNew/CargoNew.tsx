import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { fetchCargo } from '../../store/reducers/Actions.tsx';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { default_image } from '../../models/data.ts';
import { CreateCargo } from '../../store/reducers/Actions.tsx';

interface CargoTableProps {
  setPage: () => void;
}

const CargoNew: React.FC<CargoTableProps> = ({ setPage }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.userReducer);

  const [cargoName, setCargoName] = useState('');
  const [cargoDescription, setCargoDescription] = useState('');
  const [cargoImage, setCargoImage] = useState<File | null >(null);
  const [cargoWeight, setCargoWeight] = useState<number | null>(null);

  // State variables for field validation
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isWeightValid, setIsWeightValid] = useState<boolean>(true);

  useEffect(() => {
    setPage();
    dispatch(fetchCargo());
  }, []);

  const handleCreateCargo = () => {
 
    setIsNameValid(!!cargoName);
    setIsWeightValid(!!cargoWeight);

    if (!cargoName || !cargoWeight ) {
      console.log(cargoName, cargoWeight)
      return;
    }

    


    
    // console.log(cargoImage)
   
    dispatch(CreateCargo(cargoName,cargoWeight, cargoDescription!='' ? cargoDescription : '-',  default_image))  //cargoImage!='' ? cargoImage :
    // setCargoName('')
    // setCargoDescription('')
    // setCargoImage('')
    // setCargoWeight(null)
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
                    isInvalid={!isNameValid}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Название груза обязательно</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="cargoWeight" className="mt-3">
                  <Form.Label className="font-weight-bold text-left">Вес груза:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Введите вес груза"
                    value={cargoWeight ?? ''}
                    onChange={(e) => setCargoWeight(Number(e.target.value) || null)}
                    isInvalid={!isWeightValid}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Вес груза обязателен</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="cargoDescription" className="mt-3">
                  <Form.Label className="font-weight-bold text-left">Описание груза:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Введите описание груза"
                    value={cargoDescription}
                    onChange={(e) => setCargoDescription(e.target.value)}
                    required
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
