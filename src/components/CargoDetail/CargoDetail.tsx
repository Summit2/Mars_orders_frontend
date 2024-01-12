import {FC, useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {CargoItem, mock_data} from '../../models/data.js';
import './CargoCard.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {fetchExactCargo} from "../../store/reducers/Actions.tsx";
import './CargoDetail.css'


interface CargoDetailProps {
    setPage: (name: string, id: number) => void
}

const CargoDetail: FC<CargoDetailProps> = ({setPage}) => {
    const params = useParams();

    const dispatch = useAppDispatch()
    const {cargo} = useAppSelector(state => state.cargoReducer)
    console.log('cargo in get cargo', cargo)
    const navigate = useNavigate();


  // @ts-ignore
    const BackHandler = () => {
        navigate('/cargo');
    }

    useEffect(() => {

        dispatch(fetchExactCargo(`${params.id}`, setPage))
    }, [params.id]);


    return (
        <>
         {cargo ? (
        <div className='font'>
         <b> {cargo.title}</b>
          <div className="img">
          <img className = "img-detail" src={`data:image/jpeg;base64,${cargo.image_binary.toString()}`} 
          />
          </div>
          
          <div>
          
          <br></br>
            Вес: {cargo.weight} г.
          </div>
          <br></br>
          
          <div>
            Описание: {cargo.description}
          </div>
          </div>
         ) : <p>Loading...</p>
         }
        </>
      );
};

export default CargoDetail;
