import react from 'react';

const OrderPage = () => {
    const orders = [
        // Sample order data
        { userId: 1, item: 'Espresso', quantity: 2, price: 5.00, payment: 'cash', createdAt: '2023-10-01T12:00:00Z' },
        { userId: 2, item: 'Latte', quantity: 1, price: 4.50, payment: 'Gpay', createdAt: '2023-10-02T14:30:00Z' },
        { userId: 3, item: 'Cappuccino', quantity: 3, price: 6.00, payment: 'card', createdAt: '2023-10-03T16:45:00Z' },
    ];
    return (
        <div style ={Styles.container}>
            <h1>Order Page</h1>
            <div style={Styles.orderList}>
                {orders.map((order) => (
                    <div key={order.id} style={Styles.ordercard}>
                        <p><strong>item:</strong>{order.item}</p>
                        <p><strong>item:</strong>${order.price}</p>
                        <p><strong>item:</strong>{order.quantity}</p>
                        <p><strong>item:</strong>{order.payment}</p>
                        <p><strong>item:</strong>{(order.createdAt)}</p>
                    </div>
                ))};
            </div>
        </div>
    );
};

const Styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#333',
        padding: '20px',
    },
    orderList: {
        marginTop: "1.5rem",
        display: "grid",
        gap: "1rem",
    },
    orderCard: {
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#fefefe",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
};

export default OrderPage;