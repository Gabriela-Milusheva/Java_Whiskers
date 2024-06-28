import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { logo1 } from "../assets/index.js";

const CartSlideSide = ({ handleCartClick, isOpen }) => {

    const [cartItems, setCartItems] = useState([]); //->  React hook, съхраняващ текущия списък от артикули в количката

    const [products, setProducts] = useState([]); //-> ..., съхраняващ списък от всички налични продукти в магазина

    const [isOrderInfoModalOpen, setIsOrderInfoModalOpen] = useState(false); //-> .. определящ дали модалният прозорец за въвеждане на инфо за поръчка е отворен или затворен

    const [showSuccessModal, setShowSuccessModal] = useState(false); //-> ... определящ видимостта на модалния прозорец за успешна поръчка

    const [orderDetails, setOrderDetails] = useState({
        name: '',
        phone: '',
        address: ''
    }); //-> ..., съхраняващ детайлите за поръчката като име, телефонен номер и адрес, които в последствие да бъдат добавени в БД

    //Извикване на данни при зареждане на количката
    useEffect(() => {
        fetch('../../db.json')//изпълнява GET заявка към db.json
            .then(response => response.json())//преобразува получения отг в JSON формат
            .then(data => {
                setCartItems(data.Cart); //зарежда списъка от артикули в количката (cartItems) от БД
                setProducts(data.Shop_Products); //зарежда списъка с вс артикули (products) от БД
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    //намиране на продукт в products(вс продукти) по productId
    const findProductById = productId => {
        return products.find(product => product.id === productId);
    };


    //извличане на новото количество от input полето
    const handleChangeQuantityInput = (productId, event) => {
        const newQuantity = parseInt(event.target.value, 10); //извличане и преобразуване на новото количество от текст в число

        handleQuantityChange(productId, newQuantity);
    };

    //промяна на количеството на артикул в количката
    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        //намира в cartItems подадения продукт по productId и го актуализира с подаденото ново колечиство (newQuantity)
        const updatedCartItems = cartItems.map(item => {
            if (item.productId === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        setCartItems(updatedCartItems); //обновяване ва cartItems с updatedCartItems

        const updatedItem = updatedCartItems.find(item => item.productId === productId); //намиране на обновения артикул

        await updateCartItemInDatabase(updatedItem); //обновяване на артикула в БД
    };


    //**?? актуализиране на артикул в количката в БД
    const updateCartItemInDatabase = async (updatedItem) => { //приема updatedItem който трябва да бъдат актуализиран в БД

        //изпраща PATCH заявка (за частично актуализиране) към сървъра на адрес `http://localhost:3003/Cart/${updatedItem.id}`
        const response = await fetch(`http://localhost:3003/Cart/${updatedItem.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json' //указва, че данните, които изпращаме към сървъра, са в JSON формат
            },
            body: JSON.stringify({
                quantity: updatedItem.quantity //обновяваме quantity
            }) //преобразува JavaScript обекта updatedItem.quantity в JSON формат и го изпраща като тяло на заявката
        });

    };

    //обработка на клик за изтриване на артикул
    const handleDeleteClick = async (itemId) => {
        await deleteCartItemInDatabase(itemId);

        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    //изтриване на артикул от БД
    const deleteCartItemInDatabase = async (itemId) => {

        //изпраща HTTP DELETE заявка към сървъра на адрес `http://localhost:3003/Cart/${itemId}`
        const response = await fetch(`http://localhost:3003/Cart/${itemId}`, {
            method: 'DELETE' //изтрива от Cart продукта, чието itemId e посочено в URL-а
        });

    };

    //изчисляване на общата сума
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const product = findProductById(item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0).toFixed(2);
    };

    //обработка на клик за поръчка -> отваря прозорец за въвеждане на инфо за поръчка
    const handleOrderClick = () => {
        setIsOrderInfoModalOpen(true);
    };

    //обработка на промяна в полетата за поръчка -> данните от полетата се записват в orderDetails
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setOrderDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    //затваряне на прозореца за въвеждане на инфо за поръчка
    const handleOrderModalClose = () => {
        setIsOrderInfoModalOpen(false);
    };

    //затваряне на модалния прозорец със съобщение за успешна поръчка
    const handleSuccessOrderModalClose = () => {
        setShowSuccessModal(false);
    };


    //изпращане на поръчка
    const handleOrderSubmit = async () => {

        //създаване на обект order, който съдържа данните за клиента и списъка с артикулите в количката му
        const order = {
            name: orderDetails.name,
            phone: orderDetails.phone,
            address: orderDetails.address,
            products: cartItems.map(item => {
                const product = findProductById(item.productId);
                return {
                    productId: item.productId,
                    productTitle: product.title,
                    quantity: item.quantity
                };
            })
        };

        //изпраща HTTP POST заявка към сървъра на адрес 'http://localhost:3003/Orders'
        const response = await fetch('http://localhost:3003/Orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' //указва, че данните, които изпращаме към сървъра, са в JSON формат
            },
            body: JSON.stringify(order) //преобразува JavaScript обекта order в JSON формат и го задава като тяло на заявката
        });

        //изчистване на артикулите от БД за количката
        for (let item of cartItems) {
            await deleteCartItemInDatabase(item.id);
        }

        //изчистване на артикулите от списъка cartItems
        setCartItems([]);

        setIsOrderInfoModalOpen(false); //затваряне на прозореца за въвеждане на инфо за поръчка
        setShowSuccessModal(true); //отваряне на прозореца със съобщението за успешна поръчка

    };

    return (
        <div className={`cart-slide-side-container ${isOpen ? 'open' : 'closed'}`}>

            {/* CART заглавие */}
            <div className="cart-slide-side-title-part">
                <h1>Cart</h1>
                <button onClick={handleCartClick} className="cart-close-button" style={{zIndex:'20'}}>×</button>
            </div>

            {/* АРТИКУЛИ в количката */}
            <div className="cart-slide-side-items-part">

                {cartItems.length === 0 ? (
                    <p className="cart-empty-text">Cart is empty</p>
                ) : (
                    <div className="cart-items-container">

                        {cartItems.map(item => {
                            const product = findProductById(item.productId);

                            return (
                                <div key={item.id} className="cart-item">

                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteClick(item.id)}>
                                        <FaTrash/>
                                    </button>

                                    <img src={`${product.imgs}-1.jpg`} alt={product.title} className="cart-item-image" />

                                    <div className="cart-item-details">
                                        <p className="cart-item-title">{product.title}</p>
                                        <p className="cart-item-price">{product.price.toFixed(2)} BGN</p>

                                        <input
                                            className="quantity-input"
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleChangeQuantityInput(item.productId, e)}
                                            min="1"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ОБЩА СУМА и FINISH ORDER бутон*/}
            <div className="cart-slide-side-order-part">

                <div className="cart-total-container">
                    <h1 className="cart-total-txt">Subtotal:</h1>
                    <h2 className="cart-total-price">{calculateTotal()} BGN</h2>
                </div>

                <button onClick={handleOrderClick} className="order-button">Finish Order</button>
            </div>

            {/* Модален прозорец за въвеждане на инфо за поръчка */}
            {isOrderInfoModalOpen && (
                <div className="order-modal">
                    <div className="order-modal-content">

                        <button onClick={handleOrderModalClose} className="cart-close-button" style={{zIndex:'20'}}>×</button>

                        <img src={logo1} alt="Cafe Logo" className="order-modal-cafe-logo" />

                        <h1>Order Details</h1>

                        <form>
                            <label className="order-info-label">
                                Name:
                                <input
                                    className="order-info-input"
                                    type="text"
                                    name="name"
                                    value={orderDetails.name}
                                    onChange={handleInputChange}
                                />
                            </label>

                            <label className="order-info-label">
                                Phone:
                                <input
                                    className="order-info-input"
                                    type="text"
                                    name="phone"
                                    value={orderDetails.phone}
                                    onChange={handleInputChange}
                                />
                            </label>

                            <label className="order-info-label">
                                Address:
                                <input
                                    className="order-info-input"
                                    type="text"
                                    name="address"
                                    value={orderDetails.address}
                                    onChange={handleInputChange}
                                />
                            </label>

                            <button className="submit-order-button" type="button" onClick={handleOrderSubmit}>Submit Order 🎁︎</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Модален прозорец за съобщение за успешна поръчка */}
            {showSuccessModal && (
                <div className="order-modal">
                    <div className="success-message">

                        <button onClick={handleSuccessOrderModalClose} className="cart-close-button" style={{zIndex:'20'}}>×</button>

                        <img src={logo1} alt="Cafe Logo" className="order-modal-cafe-logo"/>

                        <p>
                            <span style={{
                                fontSize: '40px',
                                fontFamily: 'Smooch'
                            }}> {orderDetails.name} </span>, <br/> thank you for your order!
                            <br/>
                            Our kittens will prepare your paw-kage. 🐾︎
                        </p>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CartSlideSide;