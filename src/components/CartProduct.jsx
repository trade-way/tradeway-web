import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from '@/context/CartContext';

const CartProductList = ({ cartItems: propCartItems }) => {
  const { updateQuantity, removeItem } = useCart();
  const [localCartItems, setLocalCartItems] = useState(propCartItems);

    useEffect(() => {
    setLocalCartItems(propCartItems);
  }, [propCartItems]);

  const toggleSelect = (id) => {
    setLocalCartItems(localCartItems.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
    // TODO: Implement backend update if needed.  For now, selection is client-side
  };

  const toggleSelectAll = () => {
      const allSelected = localCartItems.every(item => item.selected);
      setLocalCartItems(localCartItems.map(item => ({ ...item, selected: !allSelected })));
  };


  const handleQuantityChange = (id, amount) => {
    const currentQuantity = localCartItems.find(item => item.id === id)?.quantity || 0;
    const newQuantity = Math.max(1, currentQuantity + amount); // Prevent negative quantities.

    setLocalCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const subtotal = localCartItems.reduce((total, item) => item.selected ? total + (item.product.current_price * item.quantity) : total, 0);

  return (
    <section className="mx-auto px-8 md:px-10 py-10">
      <div className="flex flex-row justify-between flex-wrap items-start gap-4 w-full">
        <div className="cart-container  ">
          <div className="flex flex-wrap gap-2 text-xl">
            <input
              type="checkbox"
              checked={localCartItems.every((item) => item.selected)}
              onChange={toggleSelectAll}
            />
            <label>Select all</label>
            <h2>Cart ({localCartItems.length})</h2>
          </div>
          <div className="cart-items">
            {localCartItems.map((item) => (
              <div key={item.id} className="cart-item border mt-4 flex flex-wrap justify-between">
                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelect(item.id)}
                    className="ml-2"
                  />
                  <div className="flex flex-wrap">
                    <img src={item.product.image} alt={item.product.name} width={"150px"} className="p-2" />
                    <div className="mt-3  flex-col">
                      <span className=" text-base font-[400px]">{item.product.name}</span>
                      <br />
                      <span>
                        {item.product.variation
                          ? `Variation: ${item.product.variation}`
                          : item.product.size
                          ? `Size: ${item.product.size}`
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex mt-3 items-end gap-2 flex-col flex-wrap justify-between p-2">
                  <div className="items-center flex">
                    <span>₦{(item.product.current_price * item.quantity).toLocaleString()}</span>
                    <button className="ml-2 text-red-600" onClick={() => handleRemoveItem(item.id)}>
                      <Trash2 />
                    </button>
                  </div>

                  <div className="">
                    <button
                      className="px-2 -py-1 bg-blue-400 text-[#022EB7] text-md"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold p-2">{item.quantity}</span>
                    <button
                      className="px-2 -py-1 bg-blue-400 text-[#022EB7] text-base font-[700px]  mb-3"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CART SUMMARY */}
        <div className="cart-summary border mt-11 p-3 grow rounded">
          <h3 className="text-2xl font-[400px] p-2">CART SUMMARY</h3>
          <div className="flex justify-between items-center">
            <p className="text-base p-2 ">Subtotal:</p>
            <p className="p-2">₦{subtotal.toLocaleString()}</p>
          </div>
          <div className="p-3">
            <Link to="">
              <button className="bg-blue-800 text-white p-3 rounded w-full">
                Checkout (₦{subtotal.toLocaleString()})
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartProductList;