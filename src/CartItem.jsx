
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
} from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const changeQuantity = (item, quantity) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: quantity,
      })
    );
  };

  return (
    <div className="cart-page">
      <nav className="navbar">
        <a href="/">Paradise Nursery</a>
        <div>
          <a href="/">Home</a>
          <a href="/plants">Plants</a>
          <a href="/cart">Cart ({cartItems.reduce(
            (sum, item) => sum + item.quantity, 0
          )})</a>
        </div>
      </nav>

      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty!</h2>
          <p>Discover beautiful plants for your home.</p>
          <a href="/plants">Continue Shopping</a>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="plant-image"
                />

                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>Unit price: ${item.price.toFixed(2)}</p>
                  <p>
                    Item total: $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        changeQuantity(item, item.quantity - 1)
                      }
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        changeQuantity(item, item.quantity + 1)
                      }
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="delete-button"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ${totalAmount.toFixed(2)}</h2>

            <button
              onClick={() => window.alert("Coming Soon")}
            >
              Checkout
            </button>

            <p>
              <a href="/plants">Continue Shopping</a>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
