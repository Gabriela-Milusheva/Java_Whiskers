import React from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { logo1, pink_top_wave, red_top_wave } from "../assets";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate(); // Инициализиране на navigate функцията за пренасочване към др страница

    // Функция за пренасочване към страницата за резервации (TO DO!!!)
    const handleBookNowClick = () => {
        navigate('/book');
    };

    return (
        <div style={{ zIndex: 15 }}>

            <img src={red_top_wave} alt="" className="absolute left-0 w-full" style={{ zIndex: 15, marginTop: '-145px' }} />

            <div className="footer-info">

                <div className="footer-columns">


                    {/* Колона с инфо за кафенето*/}
                    <div className="footer-column cafe-info">

                        <h1 className="left-align">Java Whiskers Café</h1>

                        <div className="footer-item">
                            <FiPhone className="footer-icon" />
                            <p>+359 12 345 6789</p>
                        </div>

                        <div className="footer-item">
                            <FiMapPin className="footer-icon" />
                            <p>Sofia, Bulgaria</p>
                        </div>

                        <div className="footer-item">
                            <FiMail className="footer-icon" />
                            <p><a href="mailto:info@java-whiskers.com">Email Us</a></p>
                        </div>
                    </div>


                    {/* Колона с лого, бутон за резервация и социални икони */}
                    <div className="footer-column">

                        <div className="logo-wrapper">
                            <img src={logo1} alt="Cafe Logo" className="cafe-logo" />
                        </div>

                        <button className="book_now_button" onClick={handleBookNowClick}>
                            Book now!
                        </button>

                        <div className="social-icons">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook className="social-icon" /></a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram className="social-icon" /></a>
                        </div>
                    </div>


                    {/* Колона с бързи линкове*/}
                    <div className="footer-column quick-links">

                        <h1>Quick Links</h1>

                        <ul>
                            <li><a href="/"> Home </a></li>
                            <li><a href="/our_cats"> Our Cats </a></li>
                            <li><a href="/cafe_menu"> Menu </a></li>
                            <li><a href="/shop"> Shop </a></li>
                        </ul>
                    </div>
                </div>



                <div className="footer-copyright">
                    <div className="copyright">
                        Copyright © Gabriela Milusheva
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;