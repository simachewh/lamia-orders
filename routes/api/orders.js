const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const invoiceMaker = require('../../helper/invoce');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Orders:')
});
/**
 * @route POST api/orders
 * @description Places a new order
 * @access Public
 */
router.post('/', [
    check('country', 'Country is required').not().isEmpty(),
    check('products', 'Products is required').not().isEmpty(),
    check('invoiceFormat', 'InvoceFormat is required.').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    // check if there are validation errors and respond with error message.
    if (!errors.isEmpty()) {
        return res.status(400).json({
            "errors": errors.array()
        })
    }
    const products = req.body.products;
    const country = req.body.country;
    const invoceFormat = req.body.invoceFormat;
    const emailInvoice = req.body.emailInvoice;
    const orderInfo = {
        products: products,
        country: country
    }
    console.log('orderInfo', orderInfo);

    const total = await invoiceMaker(orderInfo);

    await res.json({
        total: total
    });
});

module.exports = router;