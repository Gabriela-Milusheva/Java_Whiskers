import React from 'react';
import { useState } from "react";
import { pink_top_wave, hero_cat1, hero_cat2} from "../assets/index.js";
import "../index.css";

const Hero = () => {
    return (
        <div className="hero-container overflow-hidden relative">
            <img src={hero_cat1} alt="" className="hidden-on-smaller absolute h-auto "
                 style={{zIndex: -1, top: '200px', right: '-40px', height: '440px'}}/>
            <img src={hero_cat2} alt="" className="hidden-on-smaller absolute h-auto "
                 style={{zIndex: -1, top: '170px', left: '-10px', height: '500px'}}/>
            <h1 className=" hero-content">
                <h2 className="hero-title1">Welcome to</h2>
                <h3 className="hero-title2">Java Whiskers Café</h3>
                <h4 className="hero-title3">Cute cats, good food, happy people!</h4>
                <p className="hero-desc">
                    The Java Whiskers Café is designed with felines in mind, with wide open spaces and lots of
                    kitty toys - but that is not to say that humans are left out! Each table has comfortable sofas and
                    armchairs to maximise your experience and relaxation! <br/> Come and say hello!
                </p>
                <h5 className="hero-title3">❀ Sofia, Bulgaria ❀</h5>
            </h1>
            <img src={pink_top_wave} alt="" className="absolute-behind w-full bottom-0" style={{zIndex: 10}}/>
        </div>
    );
};

export default Hero;