import React from 'react';
import "../../index.css";
import {cat1, cat5, pink_top_wave} from "../../assets/index.js";

const OurCatsHero = () => {
    return (
        <div className="hero-container overflow-hidden relative">
            <img src={cat1} alt="" className="hidden-on-smaller absolute h-auto"
                 style={{zIndex: -1, top: '90px', left: '-10px', height: '300px'}}/>
            <img src={cat5} alt="" className="hidden-on-smaller absolute h-auto"
                 style={{zIndex: -1, top: '160px', right: '-40px', height: '300px'}}/>
            <div className="hero-content">
                <h2 className="hero-title1">Meet the cats</h2>
                <p className="hero-desc">
                    Java Whiskers Café is a re-homing and care facility for cats and kittens from a range of
                    backgrounds.
                    From rescue cats, to strays, to cats which have had medical issues -<br/>
                    we take them in and look after them until they find their forever home.
                </p>
            </div>
            <img src={pink_top_wave} alt="" className="absolute-behind w-full bottom-0" style={{zIndex: 10}}/>
        </div>
    );
};

export default OurCatsHero;