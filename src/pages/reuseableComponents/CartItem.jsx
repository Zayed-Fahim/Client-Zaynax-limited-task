import React, { useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import CommonContext from "../../contexts/CommonContext";

const CartItem = ({ item, handleDeleteItem }) => {
  const { cart, setSubTotal, setItems, setShippingCharge } =
    useContext(CommonContext);

  const increaseQuantity = () => {
    const updatedCart = [...cart];
    updatedCart.forEach((cartItem) => {
      if (cartItem?._id === item?._id) {
        cartItem.quantity += 1;
      }
    });
    updateCartAndTotals(updatedCart);
  };

  const decreaseQuantity = () => {
    if (item?.quantity > 1) {
      const updatedCart = [...cart];
      updatedCart.forEach((cartItem) => {
        if (cartItem?._id === item?._id) {
          cartItem.quantity -= 1;
        }
      });
      updateCartAndTotals(updatedCart);
    }
  };

  const updateCartAndTotals = async (updatedCart) => {
    try {
      const updatedSubTotal = calculateSubTotal(updatedCart);
      const updatedShippingTotalCharge =
        calculateShippingTotalCharge(updatedCart);

      const [subTotal, shippingTotal, itemsCount] = await Promise.all([
        updatedSubTotal,
        updatedShippingTotalCharge,
        updatedCart.length,
      ]);

      await setSubTotal(subTotal);
      await setShippingCharge(shippingTotal);
      await setItems(itemsCount);

      updateLocalStorage(updatedCart);
    } catch (error) {
      console.error("Error updating cart and totals:", error);
    }
  };

  const calculateSubTotal = (cartItems) => {
    return cartItems.reduce((acc, cartItem) => {
      const discountedPrice =
        cartItem?.productPriceBeforeDiscount *
        (1 - cartItem?.discountRate / 100);
      return acc + discountedPrice * cartItem?.quantity;
    }, 0);
  };
  const calculateShippingTotalCharge = async (cartItems) => {
    return cartItems.reduce((acc, item) => {
      const shippingTotal = item?.shippingCharge * item?.quantity;
      return acc + shippingTotal;
    }, 0);
  };

  const updateLocalStorage = (updatedCart) => {
    const updatedCartString = JSON.stringify(updatedCart);
    localStorage.setItem("cart", updatedCartString);
  };

  const handleDelete = () => {
    handleDeleteItem(item?._id);
  };

  return (
    <div className="flex justify-start items-center gap-4 p-5 border-b w-full">
      <img height={100} width={100} src={item?.productImage} alt="" />
      <div className="w-full flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <h1 className="text-[18px] font-semibold">{item?.productName}</h1>
          <RiDeleteBinLine
            className="hover:text-red-500 hover:scale-110 w-6 h-6 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
        <div className="flex items-center justify-start gap-28 font-semibold">
          <div className="flex flex-col gap-2 w-1/5">
            <div className="flex items-center gap-8">
              <p>Color: {item?.color}</p>
              <p>Size: {item?.size}</p>
            </div>
            <p>
              Product Price: BDT.{" "}
              {item?.productPriceBeforeDiscount *
                (1 - item?.discountRate / 100) *
                item?.quantity}
            </p>
          </div>

          <div className="flex flex-col gap-2 w-1/5">
            <p>Shipping Method: EMS</p>
            <p>Shipping Charge: BDT. {item?.shippingCharge * item?.quantity}</p>
          </div>

          <div className="flex flex-col gap-2 w-1/5">
            <div className="flex justify-start items-center gap-1">
              <p>Quantity:</p>
              <div className="flex">
                <button
                  className="bg-white border px-3 cursor-pointer rounded-l-3xl"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <div className="bg-white border px-3">{item?.quantity}</div>
                <button
                  className="bg-white border px-3 rounded-r-3xl cursor-pointer"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
            <p>
              Total Price: BDT.{" "}
              {item?.productPriceBeforeDiscount *
                (1 - item?.discountRate / 100) *
                item?.quantity +
                item?.shippingCharge * item?.quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
