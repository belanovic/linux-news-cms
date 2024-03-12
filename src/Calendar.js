import React, { useState, useEffect, useContext } from 'react';
import ReactCalendar from 'react-calendar';
import dateFormat from './dateFormat';
import {context} from './newsContext';
import 'react-calendar/dist/Calendar.css';
import './style/calendar.css';

export default function Calendar({setSelectedDate}) {

    const {showCalendar, setShowCalendar} = useContext(context);

    const [value, handleChange] = useState(null);
    const [checkValue, setCheckValue] = useState(false);

    const handleCheck = (e)  => {
        setCheckValue(prev => !prev);
    }

    useEffect(() => {
        if(checkValue == false) {
            setSelectedDate(null)
        } else {
            setSelectedDate(value)
        }
    }, [checkValue])

    useEffect(() => {setSelectedDate(value)}, [value])

    return (
        <div
            className="calendar-wrapper"
        >
            <input 
                type = "checkbox"
                checked = {checkValue}
                onChange = {handleCheck}
            ></input>
            <div
                className= {`calendar-container ${checkValue && 'active'}`}
                /* onClick={() => setShowCalendar(prev => !prev)} */
            >
                <div
                    className="calendar-select"
                    onClick={() => setShowCalendar(prev => !prev)}
                >
                    <span>{dateFormat(value, 'month', 'dayMonth', 'year')}</span>
                    <i
                        className={`far fa-calendar-alt ${showCalendar && 'show'}`}
                    ></i>
                </div>
                <ReactCalendar
                    onChange={handleChange}
                    value={value}
                    className={showCalendar && checkValue? 'show' : ''}
                    onClickDay = {() => setShowCalendar(prev => !prev)}
                />

            </div>
        </div>
    );
}