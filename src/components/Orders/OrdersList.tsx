import { useNavigate, Link } from 'react-router-dom';
import { FC, useEffect, useState, useRef } from 'react';
import { CargoItem, mock_data } from '../../models/data.js';
import { orderSlice } from '../../store/reducers/OrderSlice.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { ApproveOrder, CancelOrder, fetchOrders } from '../../store/reducers/Actions.tsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { Form, Row, Col, Button, Dropdown } from 'react-bootstrap';
import OrderSlice from '../../store/reducers/OrderSlice.tsx';

registerLocale('ru', ru);

interface OrdersListProps {
  setPage: () => void;
}

const OrdersList: FC<OrdersListProps> = ({ setPage }) => {
  const dispatch = useAppDispatch();
  const { orders, isLoading } = useAppSelector((state) => state.orderReducer);
  const { isAuth, is_moderator } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();


  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterLogin, setFilterLogin] = useState<string>('');
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);
  

  useEffect(() => {
    setPage();
    dispatch(fetchOrders(filterStatus, formatDateToDDMMYYYY(startDate), formatDateToDDMMYYYY(endDate)));
  
    pollingInterval.current = setInterval(() => {
      dispatch(fetchOrders(filterStatus, formatDateToDDMMYYYY(startDate), formatDateToDDMMYYYY(endDate)));
      // After fetching the orders, apply the login filter
      if (filterLogin) {
        handleFilterLogin();
      }
    }, 3000);
  
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, [filterStatus, filterLogin, startDate, endDate]);
 
  const handleCancelOrder = (id_order :number) => {
    dispatch(CancelOrder(id_order))
  }
  const handleApproveOrder = (id_order :number) => {
    dispatch(ApproveOrder(id_order))
  }

  //date filter
   const handleFilterDates = () => {

    dispatch(fetchOrders(filterStatus,formatDateToDDMMYYYY(startDate),formatDateToDDMMYYYY(endDate)));
  }
  const handleClearFilterDate = () => {
    setStartDate(null);
    setEndDate(null);
    

    dispatch(fetchOrders(filterStatus));
  }
  const formatDateToDDMMYYYY = (date: Date | null) => {
    return date ? format(date, 'dd.MM.yyyy', { locale: ru }) : '';
  };


  //status filter
  const handleFilterStatus= (new_status:string ) => {
    setFilterStatus(new_status)
    dispatch(fetchOrders(new_status));
  }



  //login filter
  const handleFilterLogin = () => {
    const filteredOrders = [];
    console.log(orders)
  for (let i = 0; i < orders.orders.length; i++) {
    if (orders.orders[i].user_email.includes(filterLogin)) {

      filteredOrders.push(orders.orders[i]);
    }
  }

  dispatch(orderSlice.actions.ordersFetched({"orders" : filteredOrders}))
  }
  const handleClearFilterLogin= () => {
    setFilterLogin('')
    // dispatch(fetchOrders(''))
  }
  return (
    <div>
      <h2>Список заказов</h2>
      {/* {isLoading && <p>Loading...</p>} */}

      {is_moderator &&
      <div>
      <Row>
        <Col md={4}>
          <Form.Group controlId="startDate">
            <Form.Label>Начальная дата:</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              
              startDate={startDate}
              endDate={endDate}
              locale="ru"
              dateFormat="dd.MM.yyyy"  
              className="form-control"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="endDate">
            <Form.Label>Конечная дата:</Form.Label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              locale="ru"
              dateFormat="dd.MM.yyyy" 
              className="form-control"
            />
          </Form.Group>
        </Col>
      </Row>
       
       
      <Button className="btn btn-primary" onClick={handleFilterDates}>
        Отфильтровать по дате
      </Button>
      <Button className="btn btn-primary" onClick={handleClearFilterDate}>
        Сбросить фильтр
      </Button>

      <Form.Group controlId="login">
    <Form.Label>Логин:</Form.Label>
    <Form.Control
      type="text"
      value={filterLogin ?? ''}
      onChange={(e) => setFilterLogin(e.target.value)}
    />
  </Form.Group>
  <Button className="btn btn-primary" onClick={handleFilterLogin}>
    Отфильтровать по логину
  </Button>
  <Button className="btn btn-primary" onClick={handleClearFilterLogin}>
        Сбросить фильтр
      </Button>
    </div>
}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID заказа</th>
            {is_moderator && <th>Пользователь</th>}
            {is_moderator ? (
              
              <Form.Group controlId="orderStatus">
                
                <Dropdown onSelect={(eventKey) => handleFilterStatus(eventKey)}>
                  <Dropdown.Toggle variant="#10060" id="orderStatusDropdown">
                    <b>Статус</b>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="">Все</Dropdown.Item>
                    <Dropdown.Item eventKey="в работе">В работе</Dropdown.Item>
                    <Dropdown.Item eventKey="завершён">Завершён</Dropdown.Item>
                    <Dropdown.Item eventKey="отменён">Отменён</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            
            ):( <th>Статус заказа</th> ) }
            <th>Грузы в заказе</th>
            <th>Менеджер</th>
            <th>Создано</th>
            <th>Cформировано</th>
            <th>Завершено</th>
            <th>Результат доставки</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders.length > 0 &&
            (() => {
              const rows = [];
              for (let i = 0; i < orders.orders.length; i++) {
                const order = orders.orders[i];
                rows.push(
                  <tr key={order.pk}>
                    <td>{i + 1}</td>
                    {is_moderator && <td>{order.user_email}</td>}
                    <td>{order.order_status}</td>
                    <td>
                    
                      <Link to={`/order/${order.pk}`}>Подробности</Link>
                    </td>
                    <td>{order.moderator_email ?? "-"}</td>
                    <td>{formatDate(order.date_create)!='01.01.1970' ? formatDate(order.date_create) : "-" }</td>
                    <td>{formatDate(order.date_accept)!='01.01.1970' ? formatDate(order.date_accept) : "-" }</td>
                    <td>{formatDate(order.date_finish)!='01.01.1970' ? formatDate(order.date_finish) : "-" }</td>
                    <td>{order.is_delivered == null ? "-" : (order.is_delivered ? "Успешно" : "Неуспешно")}</td>
                    {(is_moderator && order.order_status === 'в работе') ? (<td className="buttons-wrapper">
                     
                         <button
                           className="del-from-order-button"
                           onClick={() => handleCancelOrder(order.pk)}>
                           Отклонить
                         </button>
                         или
                         <button
                           className="del-from-order-button"
                           onClick={() => handleApproveOrder(order.pk)}>
                           Одобрить
                         </button>
                       </td>) : (<td></td>)}
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

export default OrdersList;

function formatDate(jsonDate) {
  const dateObject = new Date(jsonDate);
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();

  return `${day}.${month}.${year}`;
}
