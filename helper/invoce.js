const config = require('config');

const calculateInvoce = (orderInfo) => {
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
}

module.exports = calculateInvoce;