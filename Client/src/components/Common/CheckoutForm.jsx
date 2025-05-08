"use client";
import { useState } from "react";

export default function CheckoutForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You would normally send this to your backend
    console.log("Submitting order:", form);
    alert("Order submitted!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        name="address"
        placeholder="Shipping Address"
        value={form.address}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        name="cardNumber"
        placeholder="Card Number"
        value={form.cardNumber}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <div className="flex gap-4">
        <input
          name="expiry"
          placeholder="MM/YY"
          value={form.expiry}
          onChange={handleChange}
          className="w-1/2 mb-3 p-2 border rounded"
          required
        />
        <input
          name="cvc"
          placeholder="CVC"
          value={form.cvc}
          onChange={handleChange}
          className="w-1/2 mb-3 p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Place Order
      </button>
    </form>
  );
}
