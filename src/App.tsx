import {Routes, Route, Navigate} from 'react-router-dom';
import NavigationBar from "./components/NavigationBar.tsx";
import CargoList from "./components/CargoList/CargoList.tsx";
import CityDetail from "./components/CargoDetail/CargoDetail.tsx";
import {useState} from "react";
import BreadCrumbs, {IBreadCrumb} from "./components/BreadCrumbs/BreadCrumbs.tsx";


function App() {
    const cargoPage = {name: 'Грузы', to: 'cargo'};
    const [searchValue, setSearchValue] = useState('')
    const [pages, setPage] = useState<IBreadCrumb[]>([cargoPage])
    const addPage = (newPage: IBreadCrumb[]) => {
        setPage(newPage);
    };
    const resetSearchValue = () => {
        setSearchValue('');
    };

    return (
        <>
            <NavigationBar handleSearchValue={(value) => setSearchValue(value)}/>
            <BreadCrumbs pages={pages}/>
            <>
                <Routes>
                    <Route path="/" element={<Navigate to="cargo"/>}/>
                    <Route path="/cargo"
                           element={
                               <CargoList
                                   setPage={() => addPage([cargoPage])}
                                   searchValue={searchValue}
                                   resetSearchValue={resetSearchValue}
                               />
                           }
                    />
                    <Route path="/cargo/:id" element={
                        <CityDetail
                            setPage={(name, id) => addPage([
                                cargoPage, {name: `${name}`, to: `cargo/${id}`}
                            ])}
                        />}
                    />
                </Routes>
            </>
        </>
    )
}


export default App
