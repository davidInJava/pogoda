import React, {useEffect, useState} from 'react';
import './Array.css'

const Array = ({array, select}) => {
    const [selectedDay, setSelectedDay] = useState(null);

    const handleDayClick = (index) => {
        select(index);
    };





    let data = array;
    return (
        <div className="card-container">
            {data.map((item, index) => {
                const isActive = selectedDay === index; // Проверка на активность
                return (
                    <div
                        className={`card ${isActive ? 'active' : ''}`} // Добавляем класс 'active' при активности
                        key={index}
                        onClick={() => handleDayClick(index)}
                    >
                        <div>{item.avgtemp_c + "°C"}</div>
                        <img src={item.icon}></img>
                        <div>{item.condition}</div>
                        <h6>{item.date}</h6>
                    </div>
                );
            })}
        </div>
    );
}
export default Array;