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
        qunantity: {
            type: Number,
            required: true
        }
    }]

});

module.exports = Orders = mongoose.model('orders', OrdersSchema);