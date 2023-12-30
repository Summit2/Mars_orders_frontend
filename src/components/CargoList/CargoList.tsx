import { useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { CargoItem } from "../../models/data.js";
import List from "../List.js";
import CItem from "../CargoItem/CargoItem.tsx";
import './CargoList.css';
import '../my_style.css';

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
    const { isAuth } = useAppSelector(state => state.userReducer);
    const navigate = useNavigate();

    useEffect(() => {
        setPage();
        dispatch(fetchCargo(searchValue));
    }, [searchValue]);

    return (
        <>
            
                <div className="add-button-container">
                    {isAuth ? (<button
                        className="add-button_auth"  
                    >
                        {/* Заявка (пусто) */}
                    </button>) :
                    <button
                        className="add-button_not_auth"  
                    >
                        {/* Заявка */}
                    </button> }

                </div>
            
            {isLoading}
            

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
