import React from 'react';
import { useNavigate } from 'react-router-dom';
import { orange_cats_background, orange_top_wave } from "../../assets/index.js";
import { shopCategories } from "../../constants/index.js";

const ShopHero = () => {
    const navigate = useNavigate(); //дефиниране на React hook за навигация

    //ф-я за обработка на кликването върху See All от дадена категория
    const handleCategoryClick = (category) => {
        navigate(`/shop?category=${category.toLowerCase()}`);

        //ОПРАВИ!!!
        //изместване на скролбара надолу до ShopProductsGallery
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="hero-container overflow-hidden relative">

            <img src={orange_cats_background} alt="" className="absolute-behind w-full bottom-0" style={{zIndex: -1}}/>

            <div className="hero-content">
                <p className="hero-title1">Shop Collection</p>
            </div>


            <div className="shop-categories">

                {shopCategories.map((category) => (
                    <div key={category.id} className="shop-category-card">

                        <img src={category.img} alt={category.title} className="shop-category-image"/>
                        <h2 className="shop-category-title">{category.title}</h2>

                        <p className="shop-category-description hero-title3">{category.desc}</p>

                        <button
                            onClick={() => handleCategoryClick(category.title)}
                            className="shop-category-link"
                        >
                            See all ⮞
                        </button>
                    </div>
                ))}
            </div>

            <img src={orange_top_wave} alt="" className="absolute-behind w-full bottom-0"/>
        </div>
    );
};

export default ShopHero;