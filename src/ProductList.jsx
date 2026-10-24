
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const products = [
  { id: 1, name: "Snake Plant", price: 15, category: "Air Purifying", image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?w=400" },
  { id: 2, name: "Peace Lily", price: 18, category: "Air Purifying", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400" },
  { id: 3, name: "Spider Plant", price: 12, category: "Air Purifying", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400" },
  { id: 4, name: "Areca Palm", price: 25, category: "Air Purifying", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400" },
  { id: 5, name: "Rubber Plant", price: 22, category: "Air Purifying", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" },
  { id: 6, name: "Boston Fern", price: 16, category: "Air Purifying", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400" },

  { id: 7, name: "Aloe Vera", price: 10, category: "Succulents", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" },
  { id: 8, name: "Echeveria", price: 9, category: "Succulents", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400" },
  { id: 9, name: "Jade Plant", price: 14, category: "Succulents", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" },
  { id: 10, name: "Haworthia", price: 11, category: "Succulents", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400" },
  { id: 11, name: "String of Pearls", price: 17, category: "Succulents", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400" },
  { id: 12, name: "Zebra Plant", price: 13, category: "Succulents", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400" },

  { id: 13, name: "Monstera", price: 28, category: "Decorative Plants", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400" },
  { id: 14, name: "Pothos", price: 16, category: "Decorative Plants", image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400" },
  { id: 15, name: "Fiddle Leaf Fig", price: 35, category: "Decorative Plants", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" },
  { id: 16, name: "Calathea", price: 24, category: "Decorative Plants", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400" },
  { id: 17, name: "ZZ Plant", price: 20, category: "Decorative Plants", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400" },
  { id: 18, name: "Chinese Evergreen", price: 19, category: "Decorative Plants", image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400" },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="product-page">
      <nav className="navbar">
        <a href="/">Paradise Nursery</a>
        <div>
          <a href="/">Home</a>
          <a href="/plants">Plants</a>
          <a href="/cart">Cart ({cartCount})</a>
        </div>
      </nav>

      <header className="product-heading" id="plants">
        <h1>Our Houseplants</h1>
        <p>Bring nature home with our beautiful plant collection.</p>
      </header>

      {categories.map((category) => (
        <section key={category} className="plant-category">
          <h2>{category}</h2>

          <div className="product-grid">
            {products
              .filter((product) => product.category === category)
              .map((product) => {
                const isAdded = cartItems.some(
                  (item) => item.id === product.id
                );

                return (
                  <article className="product-card" key={product.id}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="plant-image"
                    />

                    <h3>{product.name}</h3>
                    <p>Price: ${product.price.toFixed(2)}</p>

                    <button
                      disabled={isAdded}
                      onClick={() => dispatch(addItem(product))}
                    >
                      {isAdded ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </article>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
