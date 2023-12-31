import {useNavigate} from 'react-router-dom';
import {FC, useEffect, useState} from 'react';
import {CargoItem, mock_data} from "../../models/data.js";
import List from "../List.js";
import CityItem from "../CargoItem/CargoItem.tsx";
import './CargoList.css'
import '../my_style.css'

interface CargoListProps {
    setPage: () => void
    searchValue?: string
    resetSearchValue: () => void;
}

const CargoList: FC<CargoListProps> = ({setPage, searchValue, resetSearchValue}) => {
    const [cargo, setCargo] = useState<CargoItem[]>([]);
    const [serverIsWork, setServerStatus] = useState<boolean>(false);
    const [reloadPage, setReloadPage] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setPage()
        fetchCargo()
            .catch((err) => {
                console.log(err)
                filterMockData()
            });
    }, [searchValue, reloadPage]);

    const fetchCargo = async () => {
        const search_url = `?search=${searchValue ?? ''}`;
        const url = 'http://localhost:8000/cargo/' + search_url

        const response = await fetch(url, {
            method: "GET",
            signal: AbortSignal.timeout(1000)
        })

        if (!response.ok) {
            setServerStatus(false)
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setServerStatus(true)
        if (data.data == null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.getElementById('search-text-field').value = ""
            alert("Ничего не найдено")
            resetSearchValue()
        }
        setCargo(data.data ?? []);
    }

    const filterMockData = () => {
        if (searchValue) {
            const filteredCargo = mock_data.filter(cargo =>
                cargo.title?.toLowerCase().includes((searchValue ?? '').toLowerCase())
            );
            if (filteredCargo.length === 0) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                document.getElementById('search-text-field').value = ""
                alert("Ничего не найдено")
                resetSearchValue()
            }
            setCargo(filteredCargo);
        } else {
            setCargo(mock_data);
        }
    }

    return (
        <List items={cargo} renderItem={(cargo: CargoItem) =>
            <CityItem
                key={cargo.pk}
                cargo={cargo}
                isServer={serverIsWork}
                onClick={(num) => navigate(`/cargo/${num}`)}
                reloadPage={() => {
                    setReloadPage(true)
                }}
            />
        }
        />
    );
    
};

export default CargoList;