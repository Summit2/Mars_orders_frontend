import { useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
// import { CargoItem, mock_data } from '../../models/data.js';
// import List from "../List.js";
// import CItem from "../CargoItem/CargoItem.tsx";
// import './CargoList.css'
// import '../my_style.css'

import CItem from "../CargoItem/CargoItem.tsx";
//redux imports
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { DeleteCargoFromOrder, deleteOrderById, fetchDraftOrder, makeOrder} from '../../store/reducers/Actions.tsx';
import './buttonStyles.css';

interface OrdersListProps {
  // setPage: () => void
}

const OrderDraft: FC<OrdersListProps> = () => {
  const dispatch = useAppDispatch();
  const { id_order_draft, order_draft_data} = useAppSelector((state) => state.orderReducer);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

 if (isAuth==false || isAuth==undefined || id_order_draft==null || id_order_draft==undefined )//|| order_draft_data == null ||order_draft_data == undefined)
 {
    // alert('empty')
    return ( <div>Пусто
    </div>)
 }

console.log(order_draft_data)

 
useEffect(() => {
    // setPage()
    
    dispatch(fetchDraftOrder(id_order_draft));
    // console.log(order_draft_data)
     
  }, [dispatch, id_order_draft]);



  const handleMakeOrder = async () => {
    
    dispatch(makeOrder(id_order_draft))
    navigate("/orders")
}
const handleDeleteOrder = async () => {
   
    dispatch(deleteOrderById(id_order_draft))
    
    navigate("/cargo")
}

 const handleDeleteFromOrder = async (id_cargo:number) => {
    dispatch(DeleteCargoFromOrder(id_cargo));
    dispatch(fetchDraftOrder(id_order_draft));
 }
  return (
    <div>
      <div>
        <h3>Оформление заказа</h3>
      </div>
  
      <div className="bottom">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
            <th></th>
              <th>Название</th>
              <th></th> {/* Add more columns as needed */}
              
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {order_draft_data?.Cargo_in_Order.map((cargo) => (
              <tr key={cargo.pk}>
                <td>{cargo.pk}</td>
                <td>{cargo.title}</td>
                
                <td>
                <div className="buttons-wrapper">
                    <button className="del-from-order-button" onClick={() => handleDeleteFromOrder(cargo.pk)}>Убрать</button>
                    </div>
                    </td>
            
              </tr>
            ))}
            
        
          </tbody>
        </table>
      </div>
  
      <div className="buttons-wrapper">
        <button className="send-button" onClick={handleMakeOrder}>
          Отправить
        </button>
        <button className="del-button" onClick={handleDeleteOrder}>
          Удалить
        </button>
      </div>
    </div>
  );
  
};

export default OrderDraft;




