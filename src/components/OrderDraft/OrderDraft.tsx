import { useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { CargoItem, mock_data } from '../../models/data.js';
// import List from "../List.js";
// import CItem from "../CargoItem/CargoItem.tsx";
// import './CargoList.css'
// import '../my_style.css'
import List from "../List.js";
import CItem from "../CargoItem/CargoItem.tsx";
//redux imports
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { fetchDraftOrder} from '../../store/reducers/Actions.tsx';

interface OrdersListProps {
  // setPage: () => void
}

const OrderDraft: FC<OrdersListProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { id_order_draft, order_draft_data} = useAppSelector((state) => state.orderReducer);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

 if (isAuth==false || id_order_draft==null)
 {
    return ( <div>Error
    </div>)
 }

console.log(order_draft_data?.Cargo_in_Order)

  useEffect(() => {
    // setPage()
    dispatch(fetchDraftOrder(id_order_draft));
    
     
  }, []);
  
  //@ts-ignore
  const cards = order_draft_data.Cargo_in_Order.map(cargo  => (
    <CItem key={cargo.pk}
    cargo={cargo}/>
))
  const handleAdd = async () => {
    // await sendBreach()
    navigate("/orders")
}
const handleDelete = async () => {
    // await deleteBreach()
    
    navigate("/cargo")
}

return(
    <div className="breach-page-wrapper">
    <div className="fines-wrapper">
        <div className="top">
            <h3>Оформление заказа</h3>
        </div>

        <div className="bottom">
            {cards}
        </div>
    </div>

    <div className="buttons-wrapper">
        <button className="send-button" onClick={handleAdd}>Отправить</button>
        <button className="delete-button" onClick={handleDelete}>Удалить</button>
    </div>
    </div>
)
};

export default OrderDraft;




