import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductManagement.css";

function ProductManagement() {
  const { storeId } = useParams();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/stores/${storeId}/products`);
        setProducts(response.data.products);
      } catch (error) {
        setMessage(error.message);
      }
    };
    fetchProducts();
  }, [storeId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/stores/${storeId}/products`, {
        name,
        description,
        image,
        price
      });
      if (response.status === 201) {
        alert("Product created successfully!");
        setProducts([...products, response.data]);
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/stores/${storeId}/products/${productId}`);
      if (response.status === 200) {
        alert("Product deleted successfully!");
        setProducts(products.filter((product) => product._id !== productId));
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="product-management">
      <div className="product-management__form">
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            required
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            step="0.01"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>
      <div className="product-management__list">
        <h2>Product List</h2>
        {message && <p className="product-management__message">{message}</p>}
        {products.length ? (
          <ul className="product-management__product-list">
            {products.map((product) => (
              <li key={product._id} className="product-management__product-item">
                <div className="product-management__product-item-inner">
                  <div className="product-management__product-item-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-management__product-item-details">
                  <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;

