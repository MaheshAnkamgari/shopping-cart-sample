import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from "axios";
import "./App.scss";

interface IProduct {
  name: string;
  id: number;
  price: number;
  rating: number;
  assertName: string;
}
function App() {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [cartItems, setCartItems] = useState<Array<IProduct>>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then(({ data }) => setProducts(data));

    axios
      .get("http://localhost:3001/cart")
      .then(({ data }) => setCartItems(data));
  }, []);
  const onAddToCart = (product: IProduct) => {
    const newCartItems = [...cartItems];
    newCartItems.push(product);
    setCartItems(newCartItems);
    axios.post("http://localhost:3001/cart", product);
  };

  const removeFromCart = (product: IProduct) => {
    const newCartItems = [...cartItems].filter((e) => e.id !== product.id);
    setCartItems(newCartItems);
    axios.delete(`http://localhost:3001/cart/${product.id}`);
  };

  const onStarSelectionUpdate = (product: IProduct) => {
    const newProduct = [...products];
    newProduct.push(product);
    setProducts(newProduct);
    axios.patch(`http://localhost:3001/products/${product.id}`, product);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="items">
          {products.map((data) => (
            <Card
              product={{ ...data }}
              cartItems={cartItems}
              key={data.id + "star"}
              onAddToCart={onAddToCart}
              removeFromCart={removeFromCart}
              onStarSelectionUpdate={onStarSelectionUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
