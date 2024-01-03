import { useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { CargoItem, mock_data } from '../../models/data.js';
// import List from "../List.js";
// import CItem from "../CargoItem/CargoItem.tsx";
// import './CargoList.css'
// import '../my_style.css'

//redux imports
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { fetchOrders} from '../../store/reducers/Actions.tsx';

interface OrdersListProps {
  // setPage: () => void
}

const OrdersList: FC<OrdersListProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { orders, isLoading } = useAppSelector((state) => state.orderReducer);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

//   console.log('in orders list', orders?.orders);

  useEffect(() => {
    // setPage()
    dispatch(fetchOrders());

  }, []);

  

  return (
    <div>
      <h2>Список заказов</h2>
      {isLoading && <p>Loading...</p>}
      {isAuth ? (
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
                         <td>{i+1}</td>
                      <td>{order.order_status}</td>
                      <td>\грузы\</td>
                      <td>{order.moderator_email ?? "-"}</td>
                      <td>{convertInputFormatToServerDate(order.date_accept) ?? "-"}</td>
                    </tr>
                  );
                }
                return rows;
              })()}
          </tbody>
        </table>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};

export default OrdersList;
function convertInputFormatToServerDate(dateString: string): string {
    const dateRegex = /^4-2-2T2:2:2Z2:2/;
    
    if (dateRegex.test(dateString)) {
        return dateString;
    } else {
        const date = new Date(dateString);
        const isoDate = date.toISOString().split('T')[0];
        
        return isoDate;
    }
}
