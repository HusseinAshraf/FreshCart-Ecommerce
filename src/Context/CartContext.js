import axios from "axios";

import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  function getCartItem() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }
  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }
  function deleteAllCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }
  function updateCartItems(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  ///Check out
  function checkOutSession(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }
  function CashOrder(cartId, shippingAddress) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/orders/${cartId}`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then(({ data }) => data)
      .catch((err) => err);
  }

  function getUserOrder(id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((response) => response)
      .catch((err) => err);
  }

  // count

  let [counter, setCounter] = useState(0);

  return (
    <>
      <CartContext.Provider
        value={{
          addToCart,
          getCartItem,
          deleteCartItem,
          updateCartItems,
          deleteAllCart,
          checkOutSession,
          counter,
          setCounter,
          CashOrder,
          getUserOrder,
        }}
      >
        {props.children}
      </CartContext.Provider>
    </>
  );
}
