const config = require('config');

const calculateInvoce = (orderInfo) => {
    let products = orderInfo.products;
    let country = orderInfo.country;
    let tax = config.get("countries").get(country).tax;
    let price;
    let taxableTotal;
    console.log('tax', tax);

    const totalPrice = products.reduce((accumulator, item) => {
        price = config.get("products").get(item.name).price;
        console.log('the price is ', price);
        taxableTotal = item.quantity * price;
        accumulator = taxableTotal + (taxableTotal * tax);
        return accumulator;
    }, 0);
    console.log('total price is', totalPrice);

    return totalPrice;
}

module.exports = calculateInvoce;