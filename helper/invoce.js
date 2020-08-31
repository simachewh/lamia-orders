const config = require('config');
module.exports = {
    calculateInvoce: (orderInfo) => {
        let products = orderInfo.products;
        let country = orderInfo.country;
        let tax = config.get("countries").get(country).tax;
        let price;
        let taxableTotal;
        let invoice = {};
        //console.log('tax', tax);
        //console.log('prodcuts ', products);

        const totalPrice = products.reduce((accumulator, item) => {
            price = config.get("products").get(item.name).price;
            item.price = price;
            taxableTotal = item.quantity * price;
            item.total = item.quantity * price;
            item.totalWithTax = item.total + (item.total * tax);
            accumulator = item.totalWithTax;
            return accumulator;
        }, 0);
        //console.log('total price is', totalPrice);
        invoice.products = products;
        invoice.total = totalPrice;
        //console.log('invoce ', invoice);
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