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

function App() {
  const homePage = { name: 'Home', to: 'cargo' };
  const cargoPage = { name: 'Грузы', to: 'cargo' };
  const ordersPage = { name: 'Заказы', to: 'orders' };
  const orderDraftPage = { name: 'Оформление заказа', to: 'order' };
  const [searchValue, setSearchValue] = useState('');
  const [pages, setPage] = useState<IBreadCrumb[]>([homePage, cargoPage]);
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
        </Routes>
      </>
    </>
  );
}

export default App;
