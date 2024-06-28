import React from 'react';
import HTMLFlipBook from "react-pageflip"; //библиотека за създаване на flipbooks в React.
import {paws_left, paws_right, red_top_wave} from "../../assets/index.js";
import { Cafe_Menu } from '../../../db.json';


const CafeMenuFlipBook = () => {
    return (
        <div>

        <div className="cafe-menu-container">

            <HTMLFlipBook width={500} height={700}>

                {Cafe_Menu.map((page) => (

                    // Създаваме контейнер за всяка страница от менюто
                    <div key={page['page-id']} className="demoPage">

                        <img src={page.imgSrc} alt={`Page ${page['page-id']}`}
                             style={{width: '100%', height: '100%'}}
                        />

                    </div>
                ))}
            </HTMLFlipBook>

            <img src={paws_left} className="paws-left" alt="Paws Left"/>
            <img src={paws_right} className="paws-right" alt="Paws Right"/>
        </div>


        </div>
    );
};

export default CafeMenuFlipBook;