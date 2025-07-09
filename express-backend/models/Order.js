const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
    {
        userId: String,
        item: String,
        quantity: Number,
        price: Number,
        payment: String,
        status: {
            type: String,
            default: "Pending", // or "Paid"
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model("Order", orderSchema)