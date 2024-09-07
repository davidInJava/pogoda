import React from "react";
import "./SA.css";

const SelectedArray = ({ array }) => {
    const getTemperatureColor = (temp) => {
        if (temp < 10) return "blue"; // Cold
        if (temp >= 10 && temp <= 25) return "green"; // Comfortable
        return "red"; // Hot
    };

    return (
        <div className="selected-array">



            {array.map((item, index) => {
                const time = new Date(item.time).getHours();
                const tempColor = getTemperatureColor(item.temp_c); // Determine the color based on temperature

                return (
                    <div key={index} className="selected-item">
                        <div className="time-label">{time}:00</div>
                        <div className="weather-info">
                            <div className="condition-text">{item.condition.text}</div>

                        </div>
                        <img src={item.condition.icon} alt={item.condition.text} className="weather-icon"/>
                        <div className="temperature" style={{color: tempColor}}>
                            {item.temp_c} °C
                        </div>
                        <div className="additional-info">
                            <div>
                                <strong>Влажность:</strong> {item.humidity}%
                            </div>
                            <div>
                                <strong>Ветер:</strong> {item.wind_kph} км/ч
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SelectedArray;