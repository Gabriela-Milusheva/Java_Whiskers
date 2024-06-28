import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import productsData from '../../../db.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const ShopProductsGallery = () => {
    const [sortOption, setSortOption] = useState(''); // съхранява избраната опция за сортиране на продуктите

    //!! при всяка промяна на стойността на filterCategory чрез setFilterCategory, React повторно ще презареди артикулите в ShopProductsGallery
    const [filterCategory, setFilterCategory] = useState(''); //съхранява избраната опция за филтриране на продуктите

    const [likedProducts, setLikedProducts] = useState({}); //променливи за съхранение на състояние за харесани продукти
    const [hoveredHeart, setHoveredHeart] = useState(null);

    const [hoveredImageIndex, setHoveredImageIndex] = useState({}); //променливи за съхранение на текущ индекс на артикул при навлизане на product card
    const [hoveredProductIntervals, setHoveredProductIntervals] = useState({});

    const navigate = useNavigate(); //за промяна на маршрута (URL)
    const location = useLocation(); //връща текущия маршрут (URL)


    // използване на useEffect за обработка на промяна на филтъра за продукти
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        const categoryParam = searchParams.get('category'); //сетва се категорията

        if (categoryParam) {
            setFilterCategory(categoryParam);
        } else {
            setFilterCategory('');
        }
    }, [location.search]);

    //ф-я за обработка на промяна на опцията за сортиране
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };


    // ф-я за промяна на харесването на артикула
    const toggleLike = (productId) => {
        setLikedProducts(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));
    };

    // изчисляване на среден рейтинг за всеки продукт
    const calculateAverageRating = (productId) => {
        const product = productsData.Shop_Products.find(product => product.id === productId);
        if (!product || !product.reviews || product.reviews.length === 0) return 0;

        const sumRatings = product.reviews.reduce((total, review) => total + parseInt(review.starRating), 0);
        const averageRating = sumRatings / product.reviews.length;
        return averageRating;
    };


    //продуктите от productsData.Shop_Products се филтрират според избраната категория (filterCategory)
    // и се сортират в масив според избраната опция (sortOption)
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
            } else if (sortOption === 'rating-asc') {
                return calculateAverageRating(a.id) - calculateAverageRating(b.id);
            } else if (sortOption === 'rating-desc') {
                return calculateAverageRating(b.id) - calculateAverageRating(a.id);
            }
            return 0;
        });

    // ???  ф-я за навлизане на мишка върху даден product card (смяна на снимките)
    const handleProductMouseEnter = (productId) => {
        const product = productsData.Shop_Products.find(product => product.id === productId);
        const numImages = product.numImgs;

        const intervalId = setInterval(() => {
            setHoveredImageIndex(prevState => ({
                ...prevState,
                [productId]: (prevState[productId]) % numImages + 1
            }));
        }, 1000);

        setHoveredProductInterval(productId, intervalId);
    };

    // ??? ф-я за задаване на интервал за смяна на изображенията при hover върху product card
    const setHoveredProductInterval = (productId, intervalId) => {
        setHoveredProductIntervals(prevState => ({
            ...prevState,
            [productId]: intervalId
        }));
    };

    // ??? ф-я за напускане на мишка от product card
    const handleProductMouseLeave = (productId) => {
        clearInterval(hoveredProductIntervals[productId]);
        setHoveredImageIndex(prevState => ({
            ...prevState,
            [productId]: 1
        }));
    };



    // async ф-я за добавяне на продукт в Cart в БД
    const toggleCart = async (product, quantity) => {

        // създаване на обект item с данни за артикула (productId и количество), който ще бъде добавен в Cart в БД
        const item = {
            productId: product.id,
            quantity
        };

        // Изпращане на POST заявка към сървъра на адрес 'http://localhost:3003/Cart'
        const response = await fetch('http://localhost:3003/Cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', //указва, че данните, които изпращаме към сървъра, са в JSON формат
            },
            body: JSON.stringify(item), //преобразува JavaScript обекта item в JSON формат и го задава като тяло на заявката
        });

    };


    // ф-я за обработка на клик върху product card (пренасочване към ShopProductDetails за дадения продукт)
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`); //навигация към страницата за детайли на продукта със зададения productId
    };


    return (
        <div>
            <div className="filters">
                <div className="left-filters">
                    <label>
                        Filter by Category: &nbsp;

                        <select className="sort-filter-options" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                            <option value="">All</option>
                            <option value="bags">Bags</option>
                            <option value="mugs">Mugs</option>
                            <option value="necklaces">Necklace</option>
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
                            <option value="rating-asc">Rating (Low to High)</option>
                            <option value="rating-desc">Rating (High to Low)</option>
                        </select>
                    </label>
                </div>
            </div>

            <div className="shop-gallery">

                {sortedFilteredProducts.map(product => {
                    const averageRating = calculateAverageRating(product.id);
                    const filledStars = Array.from({length: 5}, (_, index) => index < averageRating ? '★' : '☆').join('');

                    return (
                        <div
                            key={product.id}
                            className="product-card"
                            onMouseEnter={() => handleProductMouseEnter(product.id)}
                            onMouseLeave={() => handleProductMouseLeave(product.id)}
                        >
                            <div className="image-container"
                                 onClick={() => handleProductClick(product.id)}>

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

                            <button className="add-to-cart" onClick={() => toggleCart(product, 1)}>
                                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon"/>
                                Add to cart
                            </button>

                            <div className="product-info"
                                 onClick={() => handleProductClick(product.id)}>
                                <div className="product-card-rating">{filledStars}</div>
                                <h2 className="product-title">{product.title}</h2>
                                <p className="product-price">{product.price.toFixed(2)} BGN</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ShopProductsGallery;