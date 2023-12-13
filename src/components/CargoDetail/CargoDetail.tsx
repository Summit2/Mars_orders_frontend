import {FC, useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {CargoItem, mock_data} from '../../models/data.js';
import './CargoCard.css'
// import '../my_style.css'

interface CargoDetailProps {
    setPage: (name: string, id: number) => void
}

const CargoDetail: FC<CargoDetailProps> = ({setPage}) => {
    const params = useParams();
    const [cargo, setCargo] = useState<CargoItem | null>(null);
    const navigate = useNavigate();

  // @ts-ignore
    const handleDelete = () => {
        navigate('/cargo');
        DeleteData()
            .then(() => {
                console.log(`Cargo with ID ${cargo?.pk} successfully deleted.`);
            })
            .catch(error => {
                console.error(`Failed to delete cargo with ID ${cargo?.pk}: ${error}`);
                navigate('/cargo');
            });
    }

    const DeleteData = async () => {
        try {
            const response = await fetch('http://localhost:8000/cargo/' + cargo?.pk, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                window.location.reload();
            } 

        } catch (error) {
            console.error('Произошла ошибка сети', error);
        }
    }
  // @ts-ignore
    const BackHandler = () => {
        navigate('/cargo');
    }

    useEffect(() => {
        fetchCargo()
            .catch((err) => {
                console.error(err);
                const previewID = params.id !== undefined ? parseInt(params.id, 10) - 1 : 0;
                const mockCargo = mock_data[previewID]
                setPage(mockCargo.title ?? "Без названия", mockCargo.pk)
                setCargo(mockCargo);
            });

    }, [params.id]);

    async function fetchCargo() {
        try {
            const response = await fetch(`http://localhost:8000/cargo/${params.id}/`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data)
            setPage(data?.title ?? "Без названия", data.id_cargo)
            setCargo(data);
        } catch (error) {
            console.error('Error fetching cargo data', error);
            throw error;
        }
    }


    if (!cargo) {
        return <div>Loading...</div>;
    }

    return (
        <>
          {cargo.title}
          <div className="current-image">
          <img src={`data:image/jpeg;base64,${cargo.image_binary.toString()}`} style={{ height: '300px', width: '400px' }} />
    
          </div>
          <div className='font'>
          <div>
          
          <br></br>
            Вес: {cargo.weight} г.
          </div>
          <br></br>
          
          <div>
            Описание: {cargo.description}
          </div>
          </div>
        </>
      );
};

export default CargoDetail;
