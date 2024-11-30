import React, { useEffect, useState } from 'react';
import { addLS, getStoredCart, removeFromLS } from '../../utilities/localstorage';
import Bottle from '../Bottle/Bottle';
import Cart from '../Cart/Cart';
import './Bottles.css';

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('bottles.json')
            .then(res => res.json())
            .then(data => setBottles(data))
    }, [])

    //load cart from local
    useEffect(() => {
        if(bottles.length){
            const storedCart = getStoredCart();
            console.log(storedCart,bottles);
            const savedCart = [];
            for(const id of storedCart){
                const bottle = bottles.find(bottle => bottle.id === id)
                if(bottle){
                    savedCart.push(bottle);
                }
            }
            console.log('found: ', savedCart)
            setCart(savedCart);
        }
        
    },[bottles])

    const handleAddToCart = bottle => {
        const newCart = [...cart, bottle];
        setCart(newCart);
        addLS(bottle.id);
    }

    const handleremoveFromCart = id =>{
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        removeFromLS(id);
    }

    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <Cart cart = {cart} handleremoveFromCart={handleremoveFromCart}></Cart>
            <div className='bottle-container'>
                {
                    bottles.map(bottle => <Bottle 
                        key={bottle.id} 
                        bottle={bottle}
                        handleAddToCart={handleAddToCart}
                        ></Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;