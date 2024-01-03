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
import { fetchOrders} from '../../store/reducers/Actions.tsx';

interface OrdersListProps {
  // setPage: () => void
}

const OrderDraft: FC<OrdersListProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { id_order_draft , order_draft_data} = useAppSelector((state) => state.orderReducer);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

//   console.log('in orders list', id_order_draft);

  useEffect(() => {
    // setPage()
    dispatch(fetchOrders());
  }, []);

  

return (
    <List items={order_draft_data} renderItem={(cargo: CargoItem) =>
        <div className="card-cargo-item" data-cargo-id={cargo.pk}>
            <b>{cargo.title}</b>
            <img
                src={`data:image/jpeg;base64,${cargo.image_binary.toString()}`} 
                className="images" 
                alt={cargo.title}
                // onClick={() => onClick(cargo.pk)}
                id={`photo-${cargo.pk}`}
            />
            {/* {isServer && (
                <div className="circle" onClick={deleteClickHandler}>
                    <button type="submit" name="del_btn">&#10060;</button>
                </div>
            )} */}
            <div className="info-button-container">
            
                
                
                <button className="info-button" onClick={() => handleDeleteFromOrder(cargo.pk)} >
                    Убрать
                </button>
           
            
                <button className="info-button" onClick={(num) => navigate(`/cargo/${num}`)}>
                    Подробнее...
                </button>
            </div>
            <div className="container-card" onClick={navigate(`/cargo/${cargo.pk}`)}>{cargo.title}</div>
        </div>
    } />
);
};

export default OrderDraft;




