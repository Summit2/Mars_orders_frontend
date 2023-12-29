import {useNavigate} from 'react-router-dom';
import {FC, useEffect, useState} from 'react';
import {CargoItem, mock_data} from "../../models/data.js";
import List from "../List.js";
import CItem from "../CargoItem/CargoItem.tsx";
import './CargoList.css'
import '../my_style.css'

//redux imports
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {fetchCargo} from "../../store/reducers/Actions.tsx";

interface OrdersListProps {
    setPage: () => void
}


const OrdersList: FC<OrdersListProps> = ({}) => {
    



    // const [cargo, setCargo] = useState<CargoItem[]>([]);
    // const [serverIsWork, setServerStatus] = useState<boolean>(false);
    // const [reloadPage, setReloadPage] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const {all_orders, isLoading, error, success} = useAppSelector(state => state.orderReducer)
    const navigate = useNavigate();

    
    useEffect(() => {
        setPage()
        dispatch(fetchCargo(searchValue))
    }, [searchValue]);


    return (
        <>
            {isLoading}
            {/* {error != "" && <MyComponent isError={true} message={error}/>}
            {success != "" && <MyComponent isError={false} message={success}/>} */}
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
        }
        />
        </>
    )
};

export default OrdersList;