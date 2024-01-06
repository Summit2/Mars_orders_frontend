import { useNavigate, Link } from 'react-router-dom';
import { FC, useEffect ,useState} from 'react';
import { CargoItem, mock_data } from '../../models/data.js';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { ApproveOrder, CancelOrder, DeleteCargo, fetchCargo, fetchOrders } from '../../store/reducers/Actions.tsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale} from 'react-datepicker';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { Form, Row, Col, Button, Dropdown  } from 'react-bootstrap';
import './buttons.css'

registerLocale('ru', ru);

interface CargoTableProps {
  setPage: () => void;
}

const CargoTable: FC<CargoTableProps> = ({ setPage }) => {
  const dispatch = useAppDispatch();
  const { all_cargo } = useAppSelector((state) => state.cargoReducer);

  const { isAuth , is_moderator} = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();


  if (isAuth == false) {
    return (
      <div>Error</div>
    );
  }
  console.log(all_cargo)

  useEffect(() => {
    setPage();
    dispatch(fetchCargo());
  }, []);
 
  const handleChangeCargo= (id_cargo :number) => {
    dispatch(UpdateCargo(id_cargo))
  }
  const handleDeleteCargo = (id_cargo :number) => {
    dispatch(DeleteCargo(id_cargo))
  }



  return (
    <div>
      <h2>Список грузов</h2>
      {/* {isLoading && <p>Loading...</p>} */}

      
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID груза</th>
            <th>Изображение</th>
            <th>Название</th>
            <th>Вес</th>
            <th>Описание</th>
            <th></th>
            <th></th>
            {/* <th>Статус</th> */}
          </tr>
        </thead>
        <tbody>
          {all_cargo?.length > 0 &&
            (() => {
              const rows = [];
              for (let i = 0; i < all_cargo?.length; i++) {
                const cargo = all_cargo[i];
                rows.push(
                  <tr key={cargo.pk}>
                    <td>{i + 1}</td>
                    <td><div className="img">
              <img src={`data:image/jpeg;base64,${cargo.image_binary.toString()}`} 
              style={{ height: '50px', width: '50px', objectFit: 'cover' }}/>
              </div></td>
                    
              <td>{cargo.title}</td>
                    <td>{cargo.weight}</td>
                    <td>{cargo.description.slice(0,40)+'...'}</td>
                    {/* <td>{cargo.is_deleted==="true" ? ("Доступен") : ( "Удалён")}</td> */}
                    <td>
                      <div className='del-from-order-button'><button
                           className="change_cargo_btn"
                           onClick={() => handleChangeCargo(cargo.pk)}>
                           Изменить
                         </button>
                         </div>
                    </td>
                    <td><div className='del-from-order-button'>
                      <button
                           className="del_cargo_btn"

                           onClick={() => handleDeleteCargo(cargo.pk)}>
                           Удалить
                         </button>
                         </div>
                         </td>
                  </tr>

                );
              }
              return rows;
            })()}
        </tbody>
      </table>
    </div>
  );
};

export default CargoTable;

function formatDate(jsonDate) {
  const dateObject = new Date(jsonDate);
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();

  return `${day}.${month}.${year}`;
}
