import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Store.css";
import PayPalButton from "./PayPalButton";

const Store = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/stores/${id}/products`);
        setStore(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStore();
  }, [id]);

  useEffect(() => {
    // Calculate total price when cart items change
    const calculateTotalPrice = () => {
      const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
      setTotalPrice(totalPrice);
    };
    calculateTotalPrice();
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
  };

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* PayPal Button at the top of the page */}
    

      <h2>{store.name}</h2>
      <p>{store.description}</p>
      <h3>Products:</h3>
      <div className="product-table">
        {store.products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <h3>Shopping Cart:</h3>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <div className="cart-item">
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="total-price">
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
      )}
        <PayPalButton amount={totalPrice} />
    </div>
  );
};

export default Store;
