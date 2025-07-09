import React, {useState, useEffect} from 'react';
import { API_BASE_URL } from '../config';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        item: "",
        quantity: 1,
        payment: "",
    });

    const userId = localStorage.getItem('userId');

    // Fetch existing orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/order/${userId}`);
                const data = await res.json();
                setOrders(data.orders);
                }
            catch (err) {
                console.log('Error fetching orders:', err);
            }
        };
        if (userId) fetchOrders();
    },[userId]);

    // Handle new order submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch(`${API_BASE_URL}/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newOrder, userId }),
            });

            const data = await res.json();
            if (data.success) {
                alert(`Order placed! ${userId}`);
                setOrders((prev) => [data.order, ...prev]); // Optimistically update UI
                setNewOrder({ item: "", quantity: 1, payment: "" });
            } else {
                alert("Failed to place order.");
            }
        } catch (err) {
            console.error('Error creating order:', err);
        }
    }
    return (
        <div style ={Styles.container}>
            <h1>Order Page</h1>

            <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item"
          value={newOrder.item}
          onChange={(e) => setNewOrder({ ...newOrder, item: e.target.value })}
          required
        />
        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={newOrder.quantity}
          onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
          required
        />
        <button type="submit">Place Order</button>
      </form>

        <h2>📦 My Order</h2>
                <ul style={Styles.orderList}>
                    {orders.map((order) => (
                        <li key={order.id} style={Styles.orderCard}>
                            {order.item} — {order.quantity} pcs — {new Date(order.createdAt).toLocaleString()}
                        </li>
                    ))}
                </ul>
        </div>
    );
};

const Styles = {
    container: {
        padding: "2rem",
        maxWidth: "600px",
        margin: "auto",
        fontFamily: "Poppins, sans-serif",
    },
    orderList: {
        listStyle: "none",
        padding: 0,
    },
    orderCard: {
        background: "#fafafa",
        marginBottom: "1rem",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    },
};

export default OrderPage;