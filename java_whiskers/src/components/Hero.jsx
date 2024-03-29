import React from 'react';
import { useState } from "react";
import {orange_top_wave} from "../assets/index.js";
import "../index.css";

const Hero = () => {
    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);

    return (
        <div className="hero_container overflow-hidden">

            <h1 className="absolute-behind w-full  hero_content">
                <h2 className="hero_title1">
                    Welcome to
                </h2>
                <h3 className="hero_title2">
                    Java Whiskers Café
                </h3>
                <h4 className="hero_title3">
                    Cute cats, good food, happy people!
                </h4>
                <p className="hero_desc">
                    The Java Whiskers Café is designed with felines in mind, with wide open spaces and lots of
                    kitty toys - but that is not to say that humans are left out! Each table has comfortable sofas and
                    armchairs to maximise your experience and relaxation! <br/> Come and say hello!
                </p>
            </h1>

            <img src={orange_top_wave} alt="" className="absolute-behind w-full bottom-0" style={{zIndex: 10}}/>


        </div>
    );
};

export default Hero;