/**
 * @description A route handler for api/orders
 */
const express = require('express');
const {
    check,
    validationResult,
    oneOf
} = require('express-validator');
const invoiceMaker = require('../../helper/invoce');
const Orders = require('../../models/Orders');

const router = express.Router();
/**
 * @route GET api/orders
 * @description Gets available orders
 * @access Public
 * Todo: could use a pager and count per page
 */
router.get('/', async (req, res) => {
    try {
        const orders = await Orders.find().sort({
            date: -1
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error:', error);
        res.send('An internal server error happened');
    }
});
/**
 * @route POST api/orders
 * @description Places a new order
 * @access Public
 */
router.post('/', [
    check('country', 'Country is required').not().isEmpty(),
    check('products', 'Products is required').isArray(),
    check('invoiceFormat').isIn(['json', 'html', 'other']),
    check('emailInvoice', 'EmailInvoice is required').isBoolean()
], async (req, res) => {
    let emailInvoice = req.body.emailInvoice;
    if (emailInvoice === true) {
        await check('email', 'Email is required').isEmail().run(req)
    } else {
        emailInvoice = false;
    }
    const errors = validationResult(req);
    // check if there are validation errors and respond with error message.
    if (!errors.isEmpty()) {
        return res.status(400).json({
            "errors": errors.array()
        });
    }
    const products = req.body.products;
    const country = req.body.country;
    const invoiceFormat = req.body.invoiceFormat;
    const orderInfo = {
        products: products,
        country: country,
        emailInvoice: emailInvoice,
        invoiceFormat: invoiceFormat
    }
    try {
        // TODO: invoice could also have it's own model
        const invoice = invoiceMaker(orderInfo);

        const newOrder = new Orders(orderInfo);
        // TODO : add email based on emailInvoice prop

        const order = await newOrder.save();
        if (!order) {
            console.error('Error: faild to save Order.');
            return res.status(500).send('The server encountered an internal error');
        }
        res.status(200).json(invoice);
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).send('An internal serer error occured');
    }
});

module.exports = router;