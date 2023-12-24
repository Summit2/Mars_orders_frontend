// CargoItem.tsx
import React, { FC } from 'react';
import { CargoItem } from '../../models/data.js';
import './CardItem.css';

interface CargoItemProps {
  cargo: CargoItem;
  onClick: (num: number) => void;
  isServer: boolean;
  reloadPage: () => void;
}

const CItem: FC<CargoItemProps> = ({ cargo, onClick, isServer, reloadPage }) => {
  const deleteClickHandler = () => {
    DeleteData().catch((error) => {
      alert(`Cannot delete cargo : ${cargo.pk}: ${error}`);
    });
  };

  const DeleteData = async () => {
    const response = await fetch('http://localhost:8000/cargo/' + `${cargo.pk}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      reloadPage();
      return;
    }
    throw new Error(`status code = ${response.status}`);
  };

  const newButtonClickHandler = () => {
    // Add your logic for the new button click here
  };

  return (
    <div className="card-city-item" data-city-id={cargo.pk}>
      <div className="title-container" onClick={() => onClick(cargo.pk)}>
        {cargo.title}
      </div>
      <img
        src={`data:image/jpeg;base64,${cargo.image_binary.toString()}`}
        className="photo"
        alt={cargo.title}
        onClick={() => onClick(cargo.pk)}
        id={`photo-${cargo.pk}`}
      />
      {isServer && (
        <div className="circle" onClick={deleteClickHandler}>
          <button type="submit" name="del_btn">
            &#10060;
          </button>
        </div>
      )}
      {/* New button at the bottom */}
      <div className="new-button-container">
        <button className="new-button" onClick={() => onClick(cargo.pk)}>
          Подробнее...
        </button>
      </div>
    </div>
  );
};

export default CItem;
