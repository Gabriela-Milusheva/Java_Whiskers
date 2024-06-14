import React from 'react';
import HTMLFlipBook from "react-pageflip";
import {paws_left, paws_right} from "../../assets/index.js";
import { Cafe_Menu } from '../../../db.json';


const CafeMenuFlipBook = () => {
    return (
            <div className="cafe-menu-container">

                <HTMLFlipBook width={500} height={700}>
                    {Cafe_Menu.map((page) => (
                        <div key={page['page-id']} className="demoPage">
                            <img src={page.imgSrc} alt={`Page ${page['page-id']}`}
                                 style={{width: '100%', height: '100%'}}/>
                        </div>
                    ))}
                </HTMLFlipBook>

                <img src={paws_left} className="paws-left" alt="Paws Left"/>
                <img src={paws_right} className="paws-right" alt="Paws Right"/>
            </div>
    );
};

export default CafeMenuFlipBook;