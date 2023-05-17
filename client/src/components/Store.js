import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Store.css";

const Store = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);

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

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{store.name}</h2>
      <p>{store.description}</p>
      <h3>Products:</h3>
      <div className="product-table">
        {store.products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
