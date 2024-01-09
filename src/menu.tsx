// menu.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { useAppSelector } from './hooks/redux.ts';

interface OrdersListProps {
  setPage: () => void;
}

const Menu: FC<OrdersListProps> = ({setPage}) => {
  const { isAuth, is_moderator } = useAppSelector((state) => state.userReducer);
  useEffect(()=>{

    setPage()
  },[])
  return (
    <div className="container mt-3">
      {isAuth ? (
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/cargo">Грузы</Link>
          </li>
          <li className="list-group-item">
            <Link to="/orders">Список заказов</Link>
          </li>
          {is_moderator && (
            <li className="list-group-item">
              <Link to="/cargoTable">Таблица грузов</Link>
            </li>
          )}
          {is_moderator && (
            <li className="list-group-item">
              <Link to="/cargoNew">Новый груз</Link>
            </li>
          )}
        </ul>
      ) : (
        <div className="card">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link to="/login">Войти</Link>
            </li>
            <li className="list-group-item">
              <Link to="/register">Зарегистрироваться</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
