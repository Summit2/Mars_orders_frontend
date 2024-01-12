import { useNavigate,Link , useParams} from 'react-router-dom';
import { FC, useEffect } from 'react';
// import { CargoItem, mock_data } from '../../models/data.js';
// import List from "../List.js";
// import CItem from "../CargoItem/CargoItem.tsx";
// import './CargoList.css'
// import '../my_style.css'

import CItem from "../CargoItem/CargoItem.tsx";
//redux imports
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { DeleteCargoFromOrder, deleteOrderById, fetchDraftOrder, makeOrder, updateCargoAmount} from '../../store/reducers/Actions.tsx';
import './buttonStyles.css';

interface OrderProps {
  setPage: () => void

}

const OrderDraft: FC<OrderProps> = ({setPage}) => {
  const { id } = useParams();
  const id_order = parseInt( id, 10)
  const dispatch = useAppDispatch();
  const { id_order_draft, order_draft_data, isLoading} = useAppSelector((state) => state.orderReducer);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();





 if (isAuth==false || isAuth==undefined || (id_order_draft==null && id_order==id_order_draft))//|| order_draft_data == null ||order_draft_data == undefined)
 {
    // alert('empty')
    return ( <div>Пусто
    </div>)
 }

// console.log(order_draft_data)

 
useEffect(() => {
  setPage();
    dispatch(fetchDraftOrder(id_order));

    // console.log("useEffect in OrderDraft")
    
}, []);



  const handleMakeOrder =  () => {
    
    dispatch(makeOrder(id_order_draft))
    navigate("/orders")
}
const handleDeleteOrder =  () => {
   
    dispatch(deleteOrderById(id_order_draft))
    
    navigate("/cargo")
}

 const handleDeleteFromOrder = (id_cargo:number ) => {
    // console.log("handleDeleteFromOrder start")
    dispatch(DeleteCargoFromOrder(id_cargo, id_order_draft));

 }
 const handleUpdateQuantity = (cargoId: number, newAmount: number) => {

  dispatch(updateCargoAmount(id_order_draft,cargoId, newAmount));
};

 return (
  <div>
    <div>
    {id_order==id_order_draft ? (<h3>Оформление заказа</h3>) : (<h3>Просмотр заказа</h3>)}
    </div>

    <div className="bottom">
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Название</th>
             <th>Количество</th> 
              {id_order==id_order_draft && ( <th></th> )}
            
          </tr>
        </thead>
        <tbody>
          {order_draft_data &&
            order_draft_data.Cargo_in_Order &&
            order_draft_data.Cargo_in_Order.length > 0 &&
            (() => {
              const rows = [];
              const cargoInOrder = order_draft_data.Cargo_in_Order;

              for (let i = 0; i < cargoInOrder.length; i++) {
                const cargo = cargoInOrder[i];

                rows.push(
                  <tr key={cargo.pk}>
                    <td>{i+1}</td>
                    <td><Link to={`/cargo/${cargo.pk}`}>{cargo.title}</Link></td>
                    <td>
            <div className="quantity-buttons-wrapper">
            {id_order==id_order_draft && (
              <button
                className="quantity-button"
                onClick={() => handleUpdateQuantity(cargo.pk, cargo.amount - 1)}>
                -
              </button> )}
              <span>{cargo.amount}</span>
              {id_order==id_order_draft && (<button
                className="quantity-button"
                onClick={() => handleUpdateQuantity(cargo.pk, cargo.amount + 1)}>
                +
              </button>)}
            </div>
          </td>
                    {id_order==id_order_draft && (
                       <td>
                       <div className="buttons-wrapper">
                         <button
                           className="del-from-order-button"
                           onClick={() => handleDeleteFromOrder(cargo.pk)}>
                           Убрать
                         </button>
                       </div>
                     </td>

                    )}
                   
                  </tr>
                );
              }

              return rows;
            })()}
        </tbody>
      </table>
    </div>
    {id_order==id_order_draft && (
    <div className="buttons-wrapper">
      <button className="send-button" onClick={handleMakeOrder}>
        Отправить
      </button>
      <button className="del-button" onClick={handleDeleteOrder}>
        Удалить
      </button>
    </div>
    )}
  </div>
);

  
};

export default OrderDraft;




