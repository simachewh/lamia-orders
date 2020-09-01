const config = require('config');
module.exports = {
    /**
     * @description Calculates an the taxable total for each procuct, the total with tax 
     * for each product and the grand total for all the products.
     * @returns Object
     */
    calculateInvoce: (orderInfo) => {
        let products = orderInfo.products;
        let country = orderInfo.country;
        let tax = config.get("countries").get(country).tax;
        let price;
        let taxableTotal;
        let invoice = {};

        const totalPrice = products.reduce((accumulator, item) => {
            price = config.get("products").get(item.name).price;
            item.price = price;
            taxableTotal = item.quantity * price;
            item.total = item.quantity * price;
            item.totalWithTax = Math.round((item.total + (item.total * tax) + Number.EPSILON) * 100) / 100;
            accumulator = item.totalWithTax;
            return Math.round((accumulator + Number.EPSILON) * 100) / 100;
        }, 0);
        invoice.products = products;
        invoice.total = totalPrice;
        invoice.tax = tax
        return invoice;
    },
    /**
     * @description Do your pre calculation here.
     * @argument orderInfo - object representing orders {products: Array, country: String, invoiceFormat: String, emailInvoice: Boolean, email: String}
     * @returns Object
     */
    begninigPriceExtension: (orderInfo) => {
        // TODO : do you initial price calculation before invoice is calculated by .calculateInvoice 
        // update orderInfo.total and return orderInfo
        return orderInfo;
    },
    /**
     * @description Do your price calculation at the end of calculating invocie.
     * @returns Object
     */
    endPriceExtension: (invoice) => {
        // TODO : write here your price calculation, update invoice.total and 
        // return the updated invoice
        return invoice;
    }
}