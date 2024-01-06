import { useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { CargoItem } from "../../models/data.js";
import List from "../List.js";
import CItem from "../CargoItem/CargoItem.tsx";
import './CargoList.css';
import '../my_style.css';
import Cookies from 'js-cookie';
//redux imports
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { fetchCargo } from "../../store/reducers/Actions.tsx";

interface CargoListProps {
    setPage: () => void;
    searchValue?: string;
    resetSearchValue: () => void;
}

const CargoList: FC<CargoListProps> = ({ setPage, searchValue, resetSearchValue }) => {
    const dispatch = useAppDispatch();
    const { all_cargo, isLoading} = useAppSelector(state => state.cargoReducer);
    const { id_order_draft } = useAppSelector((state) => state.orderReducer);
    // const { isAuth , is_moderator} = useAppSelector(state => state.userReducer);
    const navigate = useNavigate();


    useEffect(() => {
        setPage();
        dispatch(fetchCargo(searchValue));
    }, [searchValue, id_order_draft]);

    return (
        <>
             
                <div className="add-button-container">
                    {id_order_draft!=null ? (
                        
                        
                    // <div className='button_empty'>
                    <button
                        className="cart-button"  
                        onClick={() => navigate(`/order/${id_order_draft}`)}>  
                    </button>

                    ) : (
                        
                    <button className="add-button_not_auth"  ></button> 
                    )}

                </div>
            
            
            

            <List items={all_cargo} renderItem={(cargo: CargoItem) =>
                <CItem
                    key={cargo.pk}
                    cargo={cargo}
                    isServer={true}
                    onClick={(num) => navigate(`/cargo/${num}`)}
                    // reloadPage={() => {
                    //     setReloadPage(true)
                    // }}
                />
            } />
        </>
    );
};

export default CargoList;
