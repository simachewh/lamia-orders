const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    country: {
        type: String,
        required: true
    },
    invoiceFormat: {
        type: String,
        required: true
    },
    emailInvoice: {
        type: Boolean,
        default: false
    },
    email: {
        type: String
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Orders = mongoose.model('orders', OrdersSchema);