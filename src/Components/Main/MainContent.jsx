import axios from 'axios';
import {useEffect, useState} from "react";
import './Main.css'
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import Array from '../Array/Array';
import SelectedArray from "../SelectedArray/SelectedArray";

const MainContent = () => {
        const keyAPI = '046c3a53a7834bb599c132109240509';
        const cities = {
            'Москва': 'Moscow', 'Ростов-на-Дону': 'Rostov-on-Don',
            'Санкт-Петербург': 'Saint-Petersburg',
            'Лондон': 'London', 'Париж': 'Paris', 'Токио': 'Tokyo',
            'Ереван': 'Yerevan', 'Астана': 'Astana'
        };
        const [localTime, setLocalTime] = useState('');
        const cityList = Object.keys(cities);
        const [selectedCity, setSelectedCity] = useState('Москва');
        const [cityUrl, setCityUrl] = useState('Moscow');
        const [selectedDays, setSelectedDays] = useState(2); // Новая переменная для дней
        const [selectedIndex, setSelectedIndex] = useState(null);

        const [getCityText, setCityText] = useState('');
        const [getCountryText, setCountryText] = useState('');
        const [isFetching, setIsFetching] = useState(false);
        const [tempArray, setTempArray] = useState([]);
        const [conditionNow, setConditionNow] = useState('');
        const [iconNow, setIconNow] = useState('');
        const [tempNow, setTempNow] = useState('');


        useEffect(() => {
            setCityUrl(cities[selectedCity]);
        }, [selectedCity]);
        useEffect(() => {
            console.log(selectedIndex)
        }, [selectedIndex]);

        function getData() {
            setSelectedIndex(null)
            let url = "https://api.weatherapi.com/v1/forecast.json?key=" + keyAPI + "&q=" + cityUrl + "&days=" + selectedDays + "&aqi=no&lang=ru";
            axios.get(url).then(response => {
                    if (response.data) {
                        console.log(response.data)

                        let loc = response.data.location;
                        if (loc) {
                            let city = loc.name;
                            let country = loc.country;
                            if (city) {
                                setCityText("Город: " + city);
                            }
                            if (country) {
                                setCountryText("Страна: " + country)
                            }

                        }

                        let forecast = response.data.forecast;
                        if (forecast) {
                            let array = forecast.forecastday;
                            let newArray = [];
                            if (array) {
                                array.forEach(item => {
                                    let date = item.date;
                                    let avgtemp_c = item.day.avgtemp_c;
                                    let hour = item.hour;
                                    let condition = item.day.condition.text;
                                    let icon = item.day.condition.icon;
                                    newArray.push({
                                        "date": date,
                                        "avgtemp_c": avgtemp_c,
                                        "hour": hour,
                                        "condition": condition,
                                        "icon": icon
                                    });
                                })
                            }


                            setTempArray(newArray);
                        }


                        let now = response.data.current;
                        if (now) {
                            let temp = now.temp_c;
                            let condition = now.condition.text;
                            let icon = now.condition.icon;
                            if (now.last_updated) {
                                setLocalTime(now.last_updated);
                            }
                            if (temp) {
                                setTempNow(temp + "°C");
                            }
                            if (condition) {
                                setConditionNow(condition);
                            }
                            if (icon) {
                                setIconNow(icon);
                            }
                        }
                        setIsFetching(true)
                    }
                }
            ).catch(error => {
                console.log(error);
            });
        } // Зависимость от selectedCity и selectedDays


        const handleCityChange = (event) => {
            setSelectedCity(event.target.value);
        };

        const handleDaysChange = (event) => {
            setSelectedDays(parseInt(event.target.value, 10)); // Парсим значение в число
        };
        console.log(tempArray)
        return (
            <div className="main-content">

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className="content-find">
                        <div style={{marginRight: '10px'}}>
                            <label htmlFor="days-input">Город: </label>
                            <select value={selectedCity} onChange={handleCityChange}>
                                {cityList.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="days-input">Количество дней: </label>
                            <input
                                type="number"
                                id="days-input"
                                min="1"
                                max="10"
                                value={selectedDays}
                                onChange={handleDaysChange}
                            />
                        </div>
                        <button style={{marginTop: '25px'}} onClick={getData}>Погода</button>
                    </div>
                    {isFetching && <div className={"content-weather-main"}>
                        <img className="b1" src={iconNow} width={100}></img>
                        <h1 className="b2">{conditionNow}</h1>
                        <h1 className="b3">{tempNow}</h1>
                        <p className="b4">{localTime}</p>
                    </div>}
                </div>


                {isFetching && <div className={"content-weather"}>
                    <div>
                        <div style={{marginLeft: '10px'}}>
                            <p style={{marginRight: '10px', fontSize: '18px', fontWeight: 'bold'}}>{getCityText}</p>
                            <p>{getCountryText}</p>

                        </div>
                        {selectedIndex != null && <div className={"selected-index"}>
                            <h2>{ tempArray[parseInt(selectedIndex)].date}</h2>

                        </div>}
                    </div>

                    {selectedIndex != null && <SelectedArray array={tempArray[selectedIndex].hour}></SelectedArray>}


                    <div className={"content-array"}>

                        {tempArray && <Array array={tempArray} select={setSelectedIndex}></Array>}
                    </div>

                </div>}


            </div>
        );
    }
;

export default MainContent;