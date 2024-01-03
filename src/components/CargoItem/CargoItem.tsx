import {FC} from 'react';
import {CargoItem} from '../../models/data.js';
import {addCargoIntoOrder, registerSession} from '../../store/reducers/Actions.tsx';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import './CardItem.css'


interface CargoItemProps {
    cargo: CargoItem;
    onClick: (num: number) => void,
    isServer: boolean
    reloadPage: () => void
    is_draft: boolean
}

const CItem: FC<CargoItemProps> = ({cargo, onClick, isServer, reloadPage, is_draft}) => {
    const dispatch = useAppDispatch();
    const {success, isAuth} = useAppSelector(state => state.userReducer)


    const handleAddToOrder = (cargoID : number) => {
        
        dispatch(addCargoIntoOrder(cargoID))


    }
    const deleteClickHandler = () => {
        DeleteData()
            
            .catch(error => {
                alert(`Cannot delete cargo : ${cargo.pk}: ${error}`)
            });
    }

    const DeleteData = async () => {
        const response = await fetch('http://localhost:8000/cargo/' + `${cargo.pk}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            reloadPage()
            return
        }
        throw new Error(`status code = ${response.status}`);
    }







    return (
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
            {isAuth && (
                //  onClick={() => onClick(cargo.pk)}
                
                <button className="info-button" onClick={() => handleAddToOrder(cargo.pk)} >
                    Добавить
                </button>
            )}

            
                <button className="info-button" onClick={() => onClick(cargo.pk)}>
                    Подробнее...
                </button>
            </div>
            <div className="container-card" onClick={() => onClick(cargo.pk)}>{cargo.title}</div>
        </div>
    );
};

export default CItem;
