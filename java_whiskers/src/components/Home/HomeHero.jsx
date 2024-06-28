import React from 'react';
import { pink_top_wave, hero_cat1, hero_cat2} from "../../assets/index.js";
import "../../index.css";

const HomeHero = () => {
    return (
        <div className="hero-container">

            <img src={hero_cat1} alt="" className="hidden-on-smaller absolute h-auto "
                 style={{zIndex: -1, top: '200px', right: '-40px', height: '440px'}}/>

            <img src={hero_cat2} alt="" className="hidden-on-smaller absolute h-auto "
                 style={{zIndex: -1, top: '170px', left: '-10px', height: '500px'}}/>


            <div className=" hero-content">

                <p className="hero-title1">Welcome to</p>

                <p className="hero-title2">Java Whiskers Café</p>

                <p className="hero-title3">Cute cats, good food, happy people!</p>

                <p className="hero-desc">
                    The Java Whiskers Café is designed with felines in mind, with wide open spaces and lots of
                    kitty toys - but that is not to say that humans are left out! Each table has comfortable sofas and
                    armchairs to maximise your experience and relaxation! <br/> Come and say hello!
                </p>

                <p className="hero-title3">❀ Sofia, Bulgaria ❀</p>
            </div>


            <img src={pink_top_wave} alt="" className="absolute-behind w-full bottom-0" style={{zIndex: 10}}/>
        </div>
    );
};

export default HomeHero;