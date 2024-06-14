import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from '../../../db.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const ShopProductsGallery = () => {
    const [sortOption, setSortOption] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [likedProducts, setLikedProducts] = useState({});
    const [hoveredHeart, setHoveredHeart] = useState(null);
    const [hoveredImageIndex, setHoveredImageIndex] = useState({});
    const [hoveredProductIntervals, setHoveredProductIntervals] = useState({});
    const navigate = useNavigate();

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
    };

    const toggleLike = (productId) => {
        setLikedProducts(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));
    };

    const handleProductMouseEnter = (productId) => {
        const product = productsData.Shop_Products.find(product => product.id === productId);
        const numImages = product.numImgs || 1;

        const intervalId = setInterval(() => {
            setHoveredImageIndex(prevState => ({
                ...prevState,
                [productId]: (prevState[productId] || 1) % numImages + 1
            }));
        }, 1000);

        setHoveredProductInterval(productId, intervalId);
    };

    const handleProductMouseLeave = (productId) => {
        clearInterval(hoveredProductIntervals[productId]);
        setHoveredImageIndex(prevState => ({
            ...prevState,
            [productId]: 1
        }));
    };

    const setHoveredProductInterval = (productId, intervalId) => {
        setHoveredProductIntervals(prevState => ({
            ...prevState,
            [productId]: intervalId
        }));
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const sortedFilteredProducts = [...productsData.Shop_Products]
        .filter(product => !filterCategory || product.category === filterCategory)
        .sort((a, b) => {
            if (sortOption === 'price-asc') {
                return a.price - b.price;
            } else if (sortOption === 'price-desc') {
                return b.price - a.price;
            } else if (sortOption === 'title-asc') {
                return a.title.localeCompare(b.title);
            } else if (sortOption === 'title-desc') {
                return b.title.localeCompare(a.title);
            }
            return 0;
        });

    return (
        <div>
            <div className="filters">
                <div className="left-filters">
                    <label>
                        Filter by Category: &nbsp;
                        <select className="sort-filter-options" value={filterCategory} onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="bags">Bags</option>
                            <option value="mugs">Mugs</option>
                            <option value="necklaces">Necklaces</option>
                            <option value="pins">Pins</option>
                        </select>
                    </label>
                </div>

                <div className="right-filters">
                    <label>
                        Sort by: &nbsp;
                        <select className="sort-filter-options" value={sortOption} onChange={handleSortChange}>
                            <option value="">Select</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                            <option value="title-asc">Name (A-Z)</option>
                            <option value="title-desc">Name (Z-A)</option>
                        </select>
                    </label>
                </div>
            </div>

            <div className="shop-gallery">
                {sortedFilteredProducts.map(product => (
                    <div
                        key={product.id}
                        className="product-card"
                        onMouseEnter={() => handleProductMouseEnter(product.id)}
                        onMouseLeave={() => handleProductMouseLeave(product.id)}
                        onClick={() => handleProductClick(product.id)}
                    >
                        <div className="image-container">
                            <img
                                src={`${product.imgs}-${hoveredImageIndex[product.id] || 1}.jpg`}
                                alt={product.title}
                                className="product-image"
                            />
                            <FontAwesomeIcon
                                icon={(likedProducts[product.id] || hoveredHeart === product.id) ? solidHeart : regularHeart}
                                className={`heart-icon ${likedProducts[product.id] ? 'liked' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLike(product.id);
                                }}
                                onMouseEnter={() => setHoveredHeart(product.id)}
                                onMouseLeave={() => setHoveredHeart(null)}
                            />
                        </div>
                        <div className="add-to-cart">
                            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon"/>
                            Add to cart
                        </div>
                        <div className="product-info">
                            <h2 className="product-title">{product.title}</h2>
                            <p className="product-price">{product.price.toFixed(2)} BGN</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopProductsGallery;