import React from 'react';
import { orange_cats_background, orange_top_wave} from "../../assets/index.js";
import { shopCategories } from "../../constants/index.js";

const ShopHero = () => {
    return (
        <div className="hero-container overflow-hidden relative">
            <img src={orange_cats_background} alt="" className="absolute-behind w-full bottom-0" style={{zIndex: -1}}/>
            <div className="hero-content">
                <h1 className="hero-title1">Shop Collection</h1>
            </div>

            <div className="shop-categories">
                {shopCategories.map((category) => (
                    <div key={category.id} className="shop-category-card">
                        <img src={category.img} alt={category.title} className="shop-category-image"/>
                        <h2 className="shop-category-title">{category.title}</h2>
                        <p className="shop-category-description hero-title3">{category.desc}</p>
                        <a href={`/${category.title.toLowerCase()}`} className="shop-category-link">See all ⮞</a>
                    </div>
                ))}
            </div>

            <img src={orange_top_wave} alt="" className="absolute-behind w-full bottom-0"/>
        </div>
    );
};

export default ShopHero;