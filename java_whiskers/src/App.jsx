// here we are going to create the structure and the layout
//in this App we are going to import all the other components and then we are going them one by one
import React from 'react';

import styles from './style.js';
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import {wave} from "./assets/index.js";

const App = () =>  (
        //to start creating the layout
        //we are creating a div that is going to wrap our intire application
    <div className="bg-red w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar/>
            </div>
        </div>

        <img src={wave} alt="wave" className="absolute-behind w-full"/>

        <div className={`bg-red ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
                <Hero/>
            </div>
        </div>

        <div className={`bg-red ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Stats/>
                <Business/>
                <Billing/>
                <CardDeal/>
                <Testimonials/>
                <Clients/>
                <CTA/>
                <Footer/>
            </div>
        </div>

    </div>
);

export default App;