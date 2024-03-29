import React from 'react';
import styles from '../style.js';
import { Navbar, Hero, AtmosphereSection, PricesSection, KidsZoneSection, RulesSection, Footer} from "../components/index.js";


const Home = () => {
    return (
            <div className={`bg-red ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar/>
                    <Hero/>
                    <AtmosphereSection/>
                    <PricesSection/>
                    <KidsZoneSection/>
                    <RulesSection/>
                    <Footer/>
                </div>
            </div>

    );
};

export default Home;