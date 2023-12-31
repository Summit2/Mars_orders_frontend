import React from 'react';
import './CargoList/CargoList.css'
interface ListProps<T> {
    items: T[],
    renderItem: (item: T) => React.ReactNode
}

export default function List<T>(props: ListProps<T>) {
    return (
        <div className="card-grid">
            {props.items.map(props.renderItem)}
        </div>
    )
}
