import React, { useState } from "react";
import CommonContext from "../contexts/CommonContext";

const CommonProvider = ({ children }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [text, setText] = useState(null);
  const [status, setStatus] = useState(null);
  const [buttonText, setButtonText] = useState(null);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [items, setItems] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [walletDebit, setWalletDebit] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPayAble, setTotalPayAble] = useState(total);
  const [discount, setDiscount] = useState(0);
  const [isPromoCodeEditing, setIsPromoCodeEditing] = useState(false);
  const [isProductEditing, setIsProductEditing] = useState(false);
  const [promoCodeData, setPromoCodeData] = useState(null);
  const [productData, setProductData] = useState(null);

  const setPromoCode = (data) => {
    setPromoCodeData(data);
  };
  const setProduct = (data) => {
    setProductData(data);
  };
  const values = {
    cart,
    text,
    total,
    items,
    status,
    subTotal,
    discount,
    isSuccess,
    buttonText,
    productData,
    walletDebit,
    totalPayAble,
    promoCodeData,
    shippingCharge,
    isProductEditing,
    isPromoCodeEditing,

    setCart,
    setText,
    setTotal,
    setItems,
    setStatus,
    setProduct,
    setSubTotal,
    setDiscount,
    setPromoCode,
    setIsSuccess,
    setButtonText,
    setWalletDebit,
    setTotalPayAble,
    setShippingCharge,
    setIsProductEditing,
    setIsPromoCodeEditing,
  };
  return (
    <CommonContext.Provider value={values}>{children}</CommonContext.Provider>
  );
};

export default CommonProvider;
