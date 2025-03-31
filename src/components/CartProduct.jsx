import React, { useState } from "react";
import ProductImage1 from "../assets/ProductImage1.png"
import ProductImage2 from "../assets/ProductImage2.png"
import ProductImage3 from "../assets/ProductImage3.png"
import ProductImage4 from "../assets/ProductImage4.png"
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const CartProduct = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Triomphe Metal Celine sunglasses", variation: "Rose Gold",image: ProductImage1, price: 24200, quantity: 1, selected: true },
    { id: 2, name: "Gucci Designer bag", variation: "White",image: ProductImage3, price: 24200, quantity: 1, selected: true, outOfStock: true },
    { id: 3, name: "Blue baseball shirt", size: "EU 36",image: ProductImage2, price: 24200, quantity: 1, selected: true },
    { id: 4, name: "Nike Air Jordans", size: "EU 36",image: ProductImage4, price: 24200, quantity: 1, selected: true },
  ]);

  // Handle selecting/unselecting an item
  const toggleSelect = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  // Handle select all
  const toggleSelectAll = () => {
    const allSelected = cart.every(item => item.selected);
    setCart(cart.map(item => ({ ...item, selected: !allSelected })));
  };

  // Handle quantity change
  const changeQuantity = (id, amount) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    ));
  };

  // Handle remove item
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => item.selected ? total + (item.price * item.quantity) : total, 0);

  return (
    <section className="mx-auto px-8 md:px-10 py-10">
    <div className="flex flex-row justify-between flex-wrap items-start gap-4 w-full">
        <div className="cart-container  ">
        
        <div className="flex flex-wrap gap-2 text-xl">
            <input type="checkbox" checked={cart.every(item => item.selected)} onChange={toggleSelectAll} />
            <label>Select all</label>
        <h2>Cart ({cart.length})</h2>

        </div>
        <div className="cart-items">
            {cart.map(item => (
            <div key={item.id} className="cart-item border mt-4 flex flex-wrap justify-between">
                <div className="flex gap-1">
                    <input type="checkbox" checked={item.selected} onChange={() => toggleSelect(item.id)} className="ml-2"/>
                    <div className="flex flex-wrap">
                        <img src={item.image} alt="" width={"150px"} className="p-2"/>
                        <div className="mt-3  flex-col">
                            <span className=" text-base font-[400px]">{item.name}</span><br />  
                            <span>
                                {item.variation ? `Variation: ${item.variation}` : `Size: ${item.size}`}
                            </span>
                        </div>  
                    </div>          
                </div>

                <div className="flex mt-3 items-end gap-2 flex-col flex-wrap justify-between p-2">
                    <div className="items-center flex">
                        <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                        <button className="ml-2 text-red-600" onClick={() => removeItem(item.id)}><Trash2 /></button>                       
                    </div>
                
                    <div className="">
                        <button className="px-2 -py-1 bg-blue-400 text-[#022EB7] text-md" onClick={() => changeQuantity(item.id, -1)}>-</button>
                        <span className="text-xl font-semibold p-2">{item.quantity}</span>
                        <button className="px-2 -py-1 bg-blue-400 text-[#022EB7] text-base font-[700px]  mb-3" onClick={() => changeQuantity(item.id, 1)}>+</button>
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
        <Link to=""><button className="bg-blue-800 text-white p-3 rounded w-full">Checkout (₦{subtotal.toLocaleString()})</button></Link>
        </div>

      </div>
      </div>
    </section>
  );
};

export default CartProduct;
