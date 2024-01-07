import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from "./components/NavigationBar.tsx";
import CargoList from "./components/CargoList/CargoList.tsx";
import CargoDetail from "./components/CargoDetail/CargoDetail.tsx";
import { useState } from "react";
import BreadCrumbs, { IBreadCrumb } from "./components/BreadCrumbs/BreadCrumbs.tsx";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import RegisterPage from "./components/RegisterPage/RegisterPage.tsx";
import OrdersList from "./components/Orders/OrdersList.tsx";
import OrderDraft from "./components/OrderDraft/OrderDraft.tsx";
import CargoTable from "./components/CargoChange/CargoTable.tsx";
import CargoNew from "./components/CargoNew/CargoNew.tsx";
import Menu from './menu.tsx'; 


function App() {
  const homePage = { name: 'Menu', to: 'menu' };
  const cargoPage = { name: 'Грузы', to: 'cargo' };
  const ordersPage = { name: 'Заказы', to: 'orders' };
  const orderDraftPage = { name: 'Заказ', to: 'order' };
  const cargoTablePage = { name: 'Таблица', to: 'cargoTable' };
  const cargoNewPage = { name: 'Новый груз', to: 'cargoNew' };
  const [searchValue, setSearchValue] = useState('');
  const [pages, setPage] = useState<IBreadCrumb[]>([homePage]);
  const addPage = (newPage: IBreadCrumb[]) => {
    setPage(newPage);
  };
  const resetSearchValue = () => {
    setSearchValue('');
  };

  return (
    <>
      <NavigationBar handleSearchValue={(value) => setSearchValue(value)} />
      <BreadCrumbs pages={pages} />
      <>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/cargo" />}
          />
          <Route
            path="/menu"
            element=
            {
              <Menu
              setPage={() => addPage([homePage])}
              />
            }
          />
          <Route
            path="/cargo"
            element={
              <CargoList
                setPage={() => addPage([homePage, cargoPage])}
                searchValue={searchValue}
                resetSearchValue={resetSearchValue}
              />
            }
          />
          <Route
            path="/cargo/:id"
            element={
              <CargoDetail
                setPage={(name, id) => addPage([
                  homePage, cargoPage, { name: `${name}`, to: `cargo/${id}` }
                ])}
              />}
          />
          <Route
            path="/login"
            element={
              <LoginPage />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterPage />
            }
          />
          <Route
            path="/orders"
            element={
              <OrdersList
                setPage={() => addPage([homePage, ordersPage])}
              />
            }
          />
          <Route
            path="/order/:id" 
            element={
              <OrderDraft
                setPage={() => addPage([homePage, ordersPage, orderDraftPage])}
              />
            }
          />
          <Route
            path="/cargoTable" 
            element={
              <CargoTable
                setPage={() => addPage([homePage,cargoPage, cargoTablePage ])}
              />
            }
          />
          <Route
            path="/cargoNew" 
            element={
              <CargoNew
                setPage={() => addPage([homePage,cargoPage, cargoNewPage ])}
              />
            }
          />
        </Routes>
      </>
    </>
  );
}

export default App;
