import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { logo1 } from "../assets/index.js";

const BookNowDialog = ({ isOpen, handleClose }) => {
    const [date, setDate] = useState(new Date());
    const [people, setPeople] = useState(1);
    const [time, setTime] = useState('');

    if (!isOpen) return null;

    return (
        <div className="book-now-modal">
            <div className="book-now-content-wrapper">
                <button onClick={handleClose} className="close-button">×</button>
                <div className="left-side">
                    <img src={logo1} alt="Cafe Logo" className="cafe-logo" />
                    <h2>SELECT A DATE AND TIME</h2>
                    <div className="booking-options">
                        <label>
                            Number of People:
                            <input
                                type="number"
                                min="1"
                                value={people}
                                onChange={(e) => setPeople(e.target.value)}
                            />
                        </label>
                        <Calendar
                            onChange={setDate}
                            value={date}
                        />
                        <label>
                            Time:
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="right-side">
                    <h2>Café Information</h2>
                    <p><strong>ADDRESS:</strong> 123 Café Street, Coffee Town</p>
                    <p><strong>OPENING HOURS:</strong> Mon-Sun 8:00 AM - 10:00 PM</p>
                    <p><strong>CONTACT:</strong> +123-456-7890</p>
                </div>
            </div>
        </div>
    );
};

export default BookNowDialog;