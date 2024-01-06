import { useNavigate, Link } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { CargoItem, mock_data } from '../../models/data.js';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { fetchOrders } from '../../store/reducers/Actions.tsx';

interface OrdersListProps {
  setPage: () => void;
}

const OrdersList: FC<OrdersListProps> = ({ setPage }) => {
  const dispatch = useAppDispatch();
  const { orders, isLoading } = useAppSelector((state) => state.orderReducer);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  if (isAuth == false) {
    return (
      <div>Error</div>
    );
  }

  useEffect(() => {
    setPage();
    dispatch(fetchOrders());
  }, []);

  return (
    <div>
      <h2>Список заказов</h2>
      {isLoading && <p>Loading...</p>}

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID заказа</th>
            <th>Статус заказа</th>
            <th>Грузы в заказе</th>
            <th>Менеджер</th>
            <th>Дата формирования</th>
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
                    <td>{order.order_status}</td>
                    <td>
                      {/* Use Link component to navigate to /order/:id */}
                      <Link to={`/order/${order.pk}`}>Подробности</Link>
                    </td>
                    <td>{order.moderator_email ?? "-"}</td>
                    <td>{formatDate(order.date_create) ?? "-"}</td>
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
