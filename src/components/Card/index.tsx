import React, { useState } from "react";
import rose from "../../assets/blue_rose.jpg";

import "./index.scss";
interface Icard {
  product: IProduct;
  cartItems: Array<IProduct>;
  onAddToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
  onStarSelectionUpdate: (product: IProduct) => void;
}

interface IProduct {
  name: string;
  id: number;
  price: number;
  rating: number;
  assertName: string;
}
const Card = (props: Icard) => {
  const [hover, setHover] = useState(false);
  const { product } = props;
  const cartItem = props.cartItems.find((e) => e.id === product.id);
  return (
    <div className="card" key={product.id}>
      <div
        style={{ padding: "5%", width: "90%", position: "relative" }}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={rose}
          alt="Avatar"
          style={{ width: "100%", opacity: hover ? 0.5 : 1 }}
        />
        {cartItem && (
          <div
            style={{
              position: "absolute",
              top: 1,
              left: 1,
              width: "50px",
              height: "50px",
              borderRadius: 25,
              textAlign: "center",
              background: "orange",
            }}
          >
            <div style={{ marginTop: 10 }}>In cart</div>
          </div>
        )}
        {hover && (
          <div
            style={{
              position: "absolute",
              top: 1,
              left: 1,
              width: "100%",
              height: "100%",
              textAlign: "center",
              marginTop: "45%",
            }}
          >
            {!cartItem ? (
              <button onClick={() => props.onAddToCart(product)}>
                Add to Cart
              </button>
            ) : (
              <button onClick={() => props.removeFromCart(product)}>
                Remove from cart
              </button>
            )}
          </div>
        )}
      </div>
      <div className="card-container">
        <h2>{product.name}</h2>
        <h5> ${product.price}</h5>
        <div>
          <StarRating
            {...product}
            onStarSelectionUpdate={props.onStarSelectionUpdate}
          />
        </div>
      </div>
    </div>
  );
};

interface IStarRating extends IProduct {
  onStarSelectionUpdate: (product: IProduct) => void;
}
const StarRating = (props: IStarRating) => {
  const [rating, setRating] = useState(props.rating);
  const [hover, setHover] = useState(0);
  const handlerStarChange = (rating: number) => {
    setRating(rating);
    props.onStarSelectionUpdate({
      name: props.name,
      id: props.id,
      price: props.price,
      rating: rating,
      assertName: props.assertName,
    });
  };
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => handlerStarChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default Card;
