import React from 'react';
import './Cart.css';

const Cart = ({cart, handleremoveFromCart}) => {
    return (
        <div>
            <h4>Cart: {cart.length}</h4>
            <div className='cart-container'>
                {
                    cart.map(bottle => <div>
                        <img src={bottle.img}></img>
                        <button onClick={()=>handleremoveFromCart(bottle.id)}>Remove</button>
                    </div> )
                }
            </div>
        </div>
    );
};

export default Cart;