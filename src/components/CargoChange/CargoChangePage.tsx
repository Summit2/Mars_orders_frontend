import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { UpdateCargo, fetchCargo } from '../../store/reducers/Actions.tsx';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';



interface CargoTableProps {
  setPage: () => void;
  
}

const CargoChange: React.FC<CargoTableProps> = ({ setPage}) => {
    
 
    
    
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { all_cargo, CargoToChange } = useAppSelector((state) => state.cargoReducer);

  if (CargoToChange==null || CargoToChange==undefined)
  {
    return <div>Error</div>
  }

  const [cargoName, setCargoName] = useState<string>(CargoToChange.title);
  const [cargoDescription, setCargoDescription] = useState<string>(CargoToChange.description);
  const [cargoImage, setCargoImage] = useState<File | null >(null);
  const [cargoWeight, setCargoWeight] = useState<number | null>(CargoToChange?.weight);

  // State variables for field validation
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isWeightValid, setIsWeightValid] = useState<boolean>(true);

  useEffect(() => {


    console.log(CargoToChange)
    setPage();
    setCargoName(CargoToChange.title)
    setCargoDescription(CargoToChange.description)
    setCargoWeight(CargoToChange.weight)

  }, []);

  const handleChangeCargo = () => {
    

    setIsNameValid(!!cargoName);
    setIsWeightValid(!!cargoWeight);

    if (!cargoName || !cargoWeight) {
      return;
    }

    const formData = new FormData();
    formData.append('image', cargoImage || '');
    console.log(cargoImage)
    console.log(formData)

    dispatch(UpdateCargo(CargoToChange.pk,cargoName,cargoWeight, cargoDescription, cargoImage)); 
    alert(" Груз отредактирован")
    navigate('/cargoTable')
  };

  return (
    <>
   
      <Container>
        {isAuth ? (
          <Row className="justify-content-center">
            <Col md={5}>
              <div className="bg-dark p-4 rounded">
                <h2 className="text-center mb-4" style={{ color: 'white' }}>
                  Редактирование груза
                </h2>

                <Form.Group controlId="cargoName">
                  <Form.Label className="font-weight-bold text-left " style={{ color: 'white' }}>Название груза:</Form.Label>
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
                  <Form.Label className="font-weight-bold text-left" style={{ color: 'white' }}>Вес груза:</Form.Label>
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
                  <Form.Label className="font-weight-bold text-left" style={{ color: 'white' }}>Описание груза:</Form.Label>
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
                  <Form.Label className="font-weight-bold text-left " style={{ color: 'white' }}>Старое изображение :</Form.Label>
                  <div className="img">
              <img src={`data:image/jpeg;base64,${CargoToChange.image_binary.toString()}`} 
              style={{ height: '70px', width: '70px', objectFit: 'cover' }}/>
              </div>
                  <Form.Control type="file" accept="image/*" onChange={(e) => setCargoImage(e.target.files?.[0] || null)} />
                </Form.Group>
                
                
                <Button
                  variant="primary"
                  type="button"
                  className="w-100 mt-4"
                  onClick={handleChangeCargo}
                  style={{ borderRadius: '10px' }}
                >
                  Сохранить изменения
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

export default CargoChange;
